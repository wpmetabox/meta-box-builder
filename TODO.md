Must:

[ ] Khi label của field quá dài thì sẽ bị chườm sang phần input: https://monosnap.com/direct/M8ZKwXVMk1elu9UQ7lG4KYRsQepWiu
[ ] Không double click để chọn field label để edit cho nhanh
[ ] Merge từ master vào
[ ] Debounce cho Name, Id, format, save_format

Nice to have:

[ ] Làm indicator cho các panel, tức là khi có settings thay đổi so với default thì có indicator để nhận diện
[ ] Column
[ ] Thay đổi field type
[ ] Object field, chuyển chọn field type thành icon
[ ] Switch to field khi có trường required chưa điền

[ ] Update UI for creating settings pages
[ ] Update UI for creating relationships
	[ ] Xoá react tabs
	[ ] Xóa phần collapsible, bao gồm cả CSS

## Settings của field group:

- Settings được lấy từ biến MbbApp.settings và có thể truyền qua URL (trong trường hợp muốn tự setup settings cho 1 post type khi vừa mới tạo xong)
- Các settings lấy và update từ hook `useSettings`. Một số setting được dùng chung trong các component như sau:
	- prefix: để lấy đúng ID (bao gồm cả prefix) của các field text gợi ý. Được dùng trong các component:
		+ `AddressField`
		+ `FieldInserter` (admin columns, conditional logic)
		+ `GroupTitle`
	- `object_type`: để lấy object type dùng trong các component dưới:
		+ `Sidebar`
		+ `Location`
		+ `IncludeExclude`
		+ `ShowHide`
		+ `AdminColumnsPosition`
	- `post_types`: để lấy post types được chọn cho các component dưới:
		+ `Location`
		+ `Post`
		+ `IncludeExclude`
- Các settings sẽ được hiển thị ở sidebar, chia thành các panel. Các extensions khi được cài cũng sẽ tạo ra các panel của riêng chúng.
- Mặc định thì có các panel sau là mở: summary, location, settings (dành cho post), block settings

## Settings của fields

- Phần settings của field sẽ được hiện ở sidebar, trong panel `EditFieldSettingsPanel`. Trong panel này sẽ hiện tất cả các settings của các field (do dùng uncontrolled form nên buộc phải có các input trong DOM).
- Panel này chứa 1 div để làm portal cho các field. Mỗi field sẽ tách làm 2 phần, 1 phần preview ở phần main và 1 phần edit settings nằm trong portal.
- Khi lựa chọn 1 field ở vùng main thì sẽ hiển thị div tương ứng của field settings trong `FieldSettingsPanel`.

## Danh sách fields

- Do sử dụng library SortableJS nên cần phải tạo nhiều list để chứa các field. Mỗi 1 group sẽ là 1 list, và có 1 list là root, chứa các field root.
- Sử dụng `useLists` hook để truy xuất đến các list này ở mọi nơi (globally), khác với cách dùng `useFields` trước đây, chỉ dùng cục bộ.
- Khi cần sử dụng các hàm CRUD cho từng list, gọi qua hàm `getForList`.
- Do lưu tất cả các field vào đây, nên có thể lấy danh sách tất cả các field, thay thế cho hook `useFieldIds` trước đây. Vì có thể lấy đủ thông tin, nên các phần suggestion trong `<FieldInserter>` của group title, address, conditional logic, ... có thể hiện tên field và khi chọn thì điền ID của field.
- Các update về field như name/id/label hoặc icon thông qua các hook cũ `useFieldData` hoặc `useFieldNameId` đều bỏ, thay thế bằng `updateField`.