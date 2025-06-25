## Settings page

- Apply the same layout as the app
- Restyle it
- Check if we need to ssave via ajax
- Add built files when finish
- Check:
	- PHP code generator work properly
	- Parse PHP code for registering to stored in the post meta is correct
	- Registering settings page work properly

## Bugs
- Fix translation is loaded by site language, which should be by user language

## Improvements
- Only output neccessary for `meta-box-field` of fields (as attributes) in `block.json`

- Làm indicator cho các panel, tức là khi có settings thay đổi so với default thì có indicator để nhận diện
- Thay đổi field type
- Object field, chuyển chọn field type thành icon
- Switch to field khi có trường required chưa điền

## Other updates

- Update UI for creating settings pages
- Update UI for creating relationships
	- Xoá react tabs
	- Xóa phần collapsible, bao gồm cả CSS
