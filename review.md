# Review: PR #200 - Add Custom Models with table schema, Local JSON, and field group integration

Đánh giá các thay đổi code (+6200/-1599, 100 files).

---

## Bugs

**1. `sanitize_title()` trả về rỗng cho tiêu đề non-Latin → model được lưu nhưng không bao giờ được đăng ký.**

`Save.php:95` sử dụng `sanitize_title()` để tạo slug. Hàm này trả về chuỗi rỗng cho text tiếng Trung, Hàn, Nhật, Ả Rập, Cyrillic... (không có ký tự accent để strip). Slug rỗng được lưu vào `post_name` (`Save.php:122`), nhưng `Register::query_models()` (`Register.php:168`) bỏ qua các model có tên rỗng. Kết quả: model được tạo thành công trên UI, nhưng không đăng ký với MB Custom Table, không tạo bảng, không hoạt động. JS preview sử dụng `slugify()` (giữ Unicode), nên preview và thực tế luôn khác nhau cho text có dấu hoặc non-Latin.

**2. Đổi tên model để lại file JSON cũ → phantom model.**

`LocalJson::use_database()` (`LocalJson.php:209-233`) viết file mới `{post_name}.json` dựa trên tên hiện tại. Nhưng vòng lặp matching sử dụng `get_json_id()` (`LocalJson.php:225`) so sánh `model.id`/`model.name` trong file JSON cũ với `post_name` mới. Vì tên đã đổi, file cũ không match, không bị xóa, không bị ghi đè. `Register::query_models_from_json()` (`Register.php:186-216`) đọc tất cả các file JSON và đăng ký model cho mỗi file → cả model cũ (từ file cũ) và model mới đều được đăng ký.

**3. `mbb_models` cache bị xóa nhưng không bao giờ được rebuild khi Local JSON bật.**

`clear_cache_on_delete()` (`Register.php:230-233`) xóa option `mbb_models`. Khi Local JSON bật, `register_models()` (`Register.php:78`) luôn đi qua đường dẫn `query_models_from_json()` và không bao giờ rebuild option. Chỉ `persist_model()` (`Save.php:236`) mới gọi `rebuild_cache()`. Kết quả: sau khi trash/delete/untrash model, `Data::get_models()` (`Data.php:152`) đọc option cache cũ/trống → tất cả model báo `post_id = 0`, field group editor hiển thị chúng như model "code" (schema read-only, không lưu được).

**4. Lỗi DDL bị nuốt im lặng và retry trên mỗi request.**

`TableColumns::create()` (`TableColumns.php:35`) và `Register::create_table()` (`Register.php:128`) bỏ qua return value của `API::create()`. Endpoint luôn trả `success: true` ngay cả khi tạo bảng thất bại (SQL type không hợp lệ, index trên BLOB/TEXT...). `Register::register_models()` (`Register.php:94-98`) kiểm tra `SHOW TABLES LIKE` và gọi lại `API::create()` cho mỗi model trên mỗi request → một schema lỗi sẽ retry vô hạn trên mỗi page load, bao gồm cả frontend.

**5. Cột slug/table vẫn hiển thị trong sync view.**

`AdminColumns::add_json_columns()` (`AdminColumns.php:433-434`) unset `mbb-model-slug` và `mbb-model-table` trong sync view. Nhưng `ListTableColumns::columns()` (`ListTableColumns.php:25-51`) chạy sau (đăng ký từ `admin_head-edit.php`, cùng priority) và chèn lại hai cột sau `title`. Kết quả: unset không có hiệu lực.

**6. Local JSON round-trip chuyển tất cả preset column type thành "Custom…".**

`unparse_model_settings_columns()` (`vendor/wpmetabox/mbb-parser/src/Unparsers/MetaBox.php:756-762`) map tất cả column thành `{ type: 'custom', custom_type: '<raw SQL>' }`. preset mapping (VARCHAR(255), TINYINT(1), INT...) bị mất hoàn toàn. Editor hiển thị "Custom: INT" thay vì dropdown preset ban đầu.

**7. Đổi tên table để lại table cũ và dữ liệu cũ không xử lý.**

`Save::save()` (`Save.php:96`) ghi `settings['table']` mới. `TableSchema::create()` và `API::create()` chỉ tạo table mới. Không có logic drop/rename table cũ. Kết hợp với bug #2, đổi tên để lại cả duplicate model và second table với dữ liệu cũ.

---

## Edge Cases

**8. `is_indexable` không đồng bộ giữa PHP và JS.**

- PHP (`TableSchema.php:97-99`): `! str_contains( strtoupper( $type ), 'TEXT' )` — substring match.
- JS (`columnTypes.js:63`): `/^(TINY|MEDIUM|LONG)?TEXT$/i` — exact match.

Ví dụ: `TEXT CHARACTER SET utf8` hoặc `TEXT(100)` là indexable trong JS nhưng không trong PHP. Cả hai đều đánh dấu `BLOB`, `JSON`, spatial types là indexable. MySQL từ chối index trên BLOB không có key length prefix → lỗi bị nuốt im lặng (bug #4).

**9. Cột protected (supports) bị lộ khi model chưa đăng ký.**

`supports_for()` (`TableColumns.php:176-195`) trả về `[]` khi `Factory::get()` không trả về `Model`. Khi model chưa được đăng ký hoặc cache bị xóa (bug #3), `inspect()` (`TableColumns.php:82-87`) chỉ ẩn `ID` — các cột `author`, `published_date`, `modified_date` trở thành ordinary, có thể xóa/sửa trong schema modal.

**10. `_slug_changed`/`_table_changed` là cánh cửa một chiều.**

`useAutofill.js` (trong custom-model app) set flags này thành `true` lần đầu user edit thủ công và không bao giờ reset. Chúng được lưu trong settings meta (`Save.php:144`) và tồn tại vĩnh viễn. Ngay cả khi user đổi lại label, autofill không bao giờ resume. Flags bị strip khi export JSON (`Parser.php:137-138`), nhưng vẫn nằm trong settings meta → Local JSON import sẽ ghi đè slug thủ công khi autofill lại được kích hoạt.

**11. Cột tên `id` bị drop ngầm, `ID` thì không.**

`TableSchema.php:65` filter bỏ cột có tên `'id'` (lowercase) để bảo vệ auto-increment `ID`. Nhưng cột `'ID'` (uppercase) sẽ qua filter và va chạm với cột auto-increment.

---

## Performance

**12. Mỗi request chạy full model query + JSON parse + SHOW TABLES per model.**

Với Local JSON bật, `register_models()` (`Register.php:77-99,186-216`) chạy WP_Query cho tất cả post `mb-model`, đọc và parse MỌI file JSON trong folder (bao gồm cả post type khác), rồi chạy `SHOW TABLES LIKE` cho mỗi model — trên cả frontend, không cache. Kết hợp với bug #4, `API::create()` cũng được gọi trên mỗi request nếu schema chưa đúng.

**13. `show_location` gọi `Data::get_models()` cho mỗi row trong list table.**

`AdminColumns.php:614` gọi `wp_list_pluck( Data::get_models(), 'label', 'name' )` bên trong `show_column()` — nghĩa là mỗi row trong danh sách field group đều trigger một full call gồm Factory::get() + option read.

**14. `useModelSchemaSync` và `ColumnsEditor` fetch cùng endpoint cho cùng model.**

`useModelSchemaSync.js:71-79` fetch `custom-model/table-columns` khi load. `ColumnsEditor.js:257-280` fetch lại cùng endpoint khi mount với `cache: false` → hai request giống nhau cho cùng một model khi mở schema modal.

---

## Code Style

**15. `ColumnsEditor` dùng cả controlled và uncontrolled mode.**

Model editor (`Table.js:60`-region) truyền `defaultValue` + `updateField` (uncontrolled, dùng `localItems` state nội bộ). SchemaModal truyền `value`/`onChange` (controlled). Hai pattern khác nhau cho cùng component, có thể dẫn đến state drift.

**16. REST route `custom-model/columns` không validate/sanitize callback cho `columns`.**

`Save.php:37-45` — arg `columns` không có `validate_callback` hay `sanitize_callback`. Dữ liệu raw từ client được lưu trực tiếp vào post meta. Chỉ admin mới truy cập được, nên rủi ro thấp, nhưng meta có thể bị pollute với dữ liệu bất kỳ.

**17. `API::create()` có thể cần tham số thứ 4.**

`Register.php:128`, `TableColumns.php:35` gọi `API::create( $table, $columns, $keys )` với 3 args. Nếu `mb-custom-table` yêu cầu tham số thứ 4 để tạo auto `ID` PK và các cột supports (author, published_date, modified_date) cho model tables, chúng sẽ bị thiếu. Comment tại `TableColumns.php:29-32` mô tả behavior mà code không thể deliver. Cần xác minh với API signature thực tế.

**18. `.gitignore` thêm `.cursor` và `.pnpm-store`.**

Thư mục tool cá nhân `.cursor` và cache `.pnpm-store` được thêm vào `.gitignore` của repo — không liên quan đến code thay đổi.

---

## Tốiưu

**19. `register_models()` có thể cache kết quả JSON path.**

Hiện tại mỗi request đều đọc + parse toàn bộ JSON files. Có thể cache kết quả `query_models_from_json()` vào option `mbb_models` và invalidate khi file JSON thay đổi (giống pattern existing của path không-Local-JSON).

**20. `Data::format_model()` có thể nhận cache parameter từ caller.**

`show_location()` (`AdminColumns.php:614`) gọi `Data::get_models()` mỗi row. Có thể cache kết quả ở đầu loop và truyền vào để tránh đọc lại.

**21. preset SQL type list bị duplicate giữa JS và PHP.**

`columnTypes.js` (COLUMN_TYPE_GROUPS), `CustomTable.php:247-266`, và `dbTypeToEditorColumn()` đều chứa danh sách preset types riêng. Khi một bên update, bên kia có thể lệch → round-trip không nhất quán.
