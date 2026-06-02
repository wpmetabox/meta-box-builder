# block.json

## Nguyên tắc

- Khi lưu 1 field group, tạo file `block.json`
- Khi đăng ký block, dùng file `block.json`, bypass phần register bằng kiểu cũ trong MB Blocks
- Tự động wrap các render callback, template, code vào tham số `render_callback` cho phù hợp
- Tự động xử lý các tham số attributes khi render block (bằng cách filter vào `block_type_metadata_settings` trong file `Loader.php` của MB Blocks)

## Tạo file block.json

Khi lưu 1 field group, plugin sẽ hook vào `mbb_after_save` trong file `src/Extensions/Blocks/Json/Generator.php` để tạo file `block.json`.

- Các thuộc tính được lấy từ meta box sau khi được parse (đặt trong biến `$settings`)
- Nếu render bằng view thì có thêm thuộc tính `render` với giá trị `view:view_name`
- Nếu render bằng template thì có thêm thuộc tính `render` với giá trị `file:./template.php` (template có thể có path relative tới `block.json`, hoặc có path absolute)

## Register block với block.json

Thực hiện trong file `src/Extensions/Blocks/Register.php`.

- Vẫn phải query tất cả các field group tạo cho block
- Khi block được render qua callback, thì truyền tham số `render_callback` vào hàm `register_block_type()`. Lưu ý: do WordPress expect hàm này trả về string, mà hiện tại mình cho output, nên phải dùng output buffering để capture output để trả về string
- Khi block được render qua template:
	- Nếu template path relative tới file `block.json` (path có bắt đầu bằng `.`) thì việc render block do WordPress xử lý.
	- Ngược lại thì tạo 1 tham số `render_callback` để load file template của block.
- Khi block được render qua code: plugin sẽ tự tạo tham số `render_callback` để gọi Twig để render code. Phần này được xử lý trong file `src/Extensions/Blocks/CodeToCallbackTransformer.php`. Phần xử lý này dùng cả cho block dùng `block.json` hoặc không.
