## Bugs
[ ] Fix when add new field, unique _id is updated/generated from name
[ ] Fix:  I had a group with many fields and then I decided to turn on this feature “Start with no inputs” and it deleted the names of every field in that group. The fields stayed, but without any name.
[ ] 2. Tooltip: Em chọn icon (livepreview có update) nhưng sau đó nếu quay lại sửa/ điền thêm content, thì icon ở live preview từ động về Information (default)
[ ] 3. Lỗi khi publish field group. Tuy nhiên em tạo lại field group khác thì lại không bị. Lỗi số 3 của Lụa "Something went wrong. Please try again!" khi publish field group,  em cũng vừa gặp phải khi tạo field Checkbox list, nếu các option để dạng số và default value cũng để 1 số nào đó thì bị ạ
[ ] 5. Lỗi Group title trong post editor. Group trong hình em set title = {#} {name}  - em không chụp được setting vì field group bị lỗi 3, giờ em không vào được field group đó nữa
[ ] Fix translation is loaded by site language, which should be by user language

## UX
[ ] Double click Cloneable button should close the clone settings dropdown
[ ] 1. Em cảm giác tốc độ update giữa setting và livepreview không còn được mượt mà như bản Alpha: Khi sửa label ở live-preview, khi điền Choices/placeholder,... (không được ngay lập tức thôi nhưng cũng không gây khó chịu cho em, chữ xuất hiện theo cụm giật cục chứ không mượt như mình typing - cái này bản Alpha làm ổn hơn ạ)

- Replace SWR with useFetch, copied from Slim SEO Schema

## Improvements
[ ] Only output neccessary for `meta-box-field` of fields (as attributes) in `block.json`

Nice to have:

[ ] Làm indicator cho các panel, tức là khi có settings thay đổi so với default thì có indicator để nhận diện
[ ] Column khi enable thì sẽ show label ở trên, input ở dưới
[ ] Live preview khi thay đổi số column
[ ] Thay đổi field type
[ ] Object field, chuyển chọn field type thành icon
[ ] Switch to field khi có trường required chưa điền

[ ] Update UI for creating settings pages
[ ] Update UI for creating relationships
	[ ] Xoá react tabs
	[ ] Xóa phần collapsible, bao gồm cả CSS

[ ] Scrollbar issue (firefox on Mac)

https://helpdesk.elightup.com/conversation/11098?folder_id=7

[ ] 1. I don't really like that the wordpress sidebar hides every time I refresh the page, I'd like the plugin to remember my choice, whether to keep it open or closed. => Detect kích cỡ màn hình và tự collapse khi ở màn nhỏ + ghi nhớ state ở local storage.
[ ] 2. I would keep the main central box (.mb-main) to have a max-width because at a certain point on a wide screen that can get huge! I don’t use full screen because everything get really wide in the first place :) but I have tested some CSS and I think around 80 to 100 rem max-width is good enough.
[ ] 3. It would be great if you could include under appearance the option on how many rows I can have { "textarea_rows": 10 }, typing this every time for examples 10 times, takes a lot of time.

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