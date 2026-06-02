# block.json

## Tạo file block.json

Khi lưu 1 field group, plugin sẽ hook vào `mbb_after_save` trong file `src/Extensions/Blocks/Json/Generator.php` để tạo file `block.json`.

- Các thuộc tính được lấy từ meta box sau khi được parse (đặt trong biến `$settings`)
- Nếu render bằng view thì có thêm thuộc tính `render` với giá trị `view:view_name`
- Nếu render bằng template và có path relative tới file `block.json` (path có bắt đầu bằng `.`) thì có thêm thuộc tính `render` với giá trị `file:./template.php`

## Register block với block.json

Thực hiện trong file `src/Extensions/Blocks/Register.php`.

- Vẫn phải query tất cả các field group tạo cho block
- Khi block được render qua callback, thì truyền tham số `render_callback` vào hàm `register_block_type()`. Lưu ý: do WordPress expect hàm này trả về string, mà hiện tại mình cho output, nên phải dùng output buffering để capture output để trả về string
- Khi block được render qua template:
	- Nếu template path relative tới file `block.json` (path có bắt đầu bằng `.`) thì sẽ ghi thuộc tính `render` với giá trị `file:./template.php` vào trong file `block.json` và sẽ register block qua hàm `register_block_type()`. Việc render block lúc đó do WordPress xử lý.
	- Ngược lại thì không register block qua hàm `register_block_type()`, mà để plugin MB Blocks register ở file `mb-blocks/src/Block.php::register_block_type()`. Hàm này sẽ check nếu block không được register trước đó thì mới register, và sẽ tự khai báo phần render thông qua method `render()`, phần đó sẽ load file template của block. Cơ chế này hoạt động giống tham số `render_template` của block không dùng `block.json`.
- Khi block được render qua code: plugin sẽ tự tạo tham số `render_callback` để gọi Twig để render code. Phần này được xử lý trong file `src/Extensions/Blocks/CodeToCallbackTransformer.php`. Phần xử lý này dùng cả cho block dùng `block.json` hoặc không.
