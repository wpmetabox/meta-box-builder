# block.json

## Tạo file block.json

Khi lưu 1 field group, plugin sẽ hook vào `mbb_after_save` trong file `src/Extensions/Blocks/Json/Generator.php` để tạo file `block.json`.

- Các thuộc tính được lấy từ meta box sau khi được parse (đặt trong biến `$settings`)
- Nếu render bằng view thì có thêm thuộc tính `render` với giá trị `view:view_name`

## Register block với block.json

Thực hiện trong file `src/Extensions/Blocks/Register.php`.

- Vẫn phải query tất cả các field group tạo cho block
- Nếu field group lưu block ở dạng `block.json` thì register block với hàm `register_block_type()`
	- Khi block được render qua callback, thì truyền tham số `render_callback` vào hàm `register_block_type()`. Lưu ý: do WordPress expect hàm này trả về string, mà hiện tại mình cho output, nên phải dùng output buffering để capture output để trả về string
