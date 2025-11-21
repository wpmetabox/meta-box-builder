# Ẩn field settings khi nằm trong group

Khi có 1 field nằm trong 1 group, thì giá trị của field đó sẽ không được xử lý khi lưu và khi lấy.

VD: có 1 field dạng `date` và có thuộc tính `save_format` là `Y-m-d`, khác với giá trị khi hiển thị, thì khi field này nằm trong group thì giá trị của field luôn luôn được lưu ở dạng y hệt như khi hiển thị. Có nghĩa là thuộc tính `save_format` này không có hiệu lực.

Vấn đề này mình đã thiết kế trong extension group từ đầu, mục đích là để tránh việc phải xử lý dữ liệu phức tạp khi lưu cũng như khi lấy nếu có các group lồng nhau nhiều cấp. Docs [cũng đã nói](https://docs.metabox.io/extensions/meta-box-group/#data-storage) về vấn đề này.

Trong builder, để giảm thiểu việc người dùng cảm thấy khó hiểu và tưởng là lỗi (có thuộc tính mà không hoạt động) thì mình sẽ ẩn các thuộc tính không có hiệu lực đó đi. Việc ẩn này được thực hiện như sau:

- Trong file `src/Registry.php` sẽ liệt kê tất cả các thuộc tính của các field. Thuộc tính nào có tham số `'hide_in_group' => true` thì sẽ không hiển thị khi nằm trong group.
- Trong file `assets/app/components/Panels/FieldSettings/Panel.js` có 1 phần lọc các controls để kiểm tra chỉ hiển thị các control cần hiển thị khi nằm trong group.

```js
if ( isInGroup( field._id ) ) {
	controls = controls.filter( control => !control?.props?.hide_in_group );
}
```