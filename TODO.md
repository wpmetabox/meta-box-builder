## Bugs
- Fix translation is loaded by site language, which should be by user language
- When dragging a field into a group, and select that field, the settings of the group is shown instead of the settings of the field

## UX
- Double click Cloneable button should close the clone settings dropdown

- It would be great if you could include under appearance the option on how many rows I can have { "textarea_rows": 10 }, typing this every time for examples 10 times, takes a lot of time. https://helpdesk.elightup.com/conversation/11098?folder_id=7

## Improvements
- Only output neccessary for `meta-box-field` of fields (as attributes) in `block.json`
- Remove `custom_table` key in local JSON if not used
- Add `group` and `tab` to the free version, but do not allow to select these field types
- Add floating mode for structure panel
- Click an item in the structure panel to set it active. If the structure panel is in floating mode, then open the field settings panel in the sidebar.

- Làm indicator cho các panel, tức là khi có settings thay đổi so với default thì có indicator để nhận diện
- Thay đổi field type
- Object field, chuyển chọn field type thành icon
- Switch to field khi có trường required chưa điền

## Other updates

- Update UI for creating settings pages
- Update UI for creating relationships
	- Xoá react tabs
	- Xóa phần collapsible, bao gồm cả CSS

## Won't fix
- Scrollbar issue (firefox on Mac)

## Can't replicate
- I had a group with many fields and then I decided to turn on this feature “Start with no inputs” and it deleted the names of every field in that group. The fields stayed, but without any name. https://helpdesk.elightup.com/conversation/11098?folder_id=7

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
- Sử dụng `list-functions` để truy xuất đến các list này ở mọi nơi (globally), khác với cách dùng `useFields` trước đây, chỉ dùng cục bộ. Mỗi list là một store, dùng Zustand, để tránh trường hợp khi update 1 list thì các list khác bị ảnh hưởng và re-render.
- Khi cần sử dụng các hàm CRUD cho từng list, gọi qua hàm `getList`.
- Do lưu tất cả các field vào đây, nên có thể lấy danh sách tất cả các field, thay thế cho hook `useFieldIds` trước đây. Vì có thể lấy đủ thông tin, nên các phần suggestion trong `<FieldInserter>` của group title, address, conditional logic, ... có thể hiện tên field và khi chọn thì điền ID của field.
- Các update về field như name/id/label hoặc icon thông qua các hook cũ `useFieldData` hoặc `useFieldNameId` đều bỏ, thay thế bằng `updateField`.