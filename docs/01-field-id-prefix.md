# Field ID prefix

## Field ID prefix là gì?

Nếu user có nhiều field group, và họ muốn trong mỗi 1 field group thì các field đều có 1 prefix khác nhau, để tránh trùng lặp, thì họ có thể setup prefix cho cả field group.

VD:

User có 2 field group:

- Field group Layout trong đó có sub-field:
	- Field: `image` dùng cho ảnh cover của post
- Field group SEO trong đó có sub-field:
	- Field: `image` dùng cho ảnh khi share lên social

Do 2 field `image` có cùng ID, nên khi lưu dữ liệu sẽ bị ghi đè. Để tránh trường hợp đó, đặt prefix cho field group Layout là `layout_` và cho field group SEO là `seo_`, thì khi đó:

- Field `image` trong field group Layout sẽ có ID là `layout_image`
- Field `image` trong field group SEO sẽ có ID là `seo_image`

và không bị trùng ID nữa.

## Có cần dùng prefix không?

Việc dùng prefix này không bắt buộc. Nó chỉ tiện lợi hơn 1 chút cho người dùng. Người dùng hoàn toàn có thể tự điền ID bằng tay là `layout_image` và `seo_image` cũng được.

Thực tế thì khi thêm phần prefix này cũng gây khó hiểu cho người dùng mới, nên trong phần tài liệu [tạo field group bằng code](https://docs.metabox.io/creating-fields-with-code/) trước đây mình có code mẫu cho phần prefix này, nhưng bây giờ mình đã bỏ đi.

VD: code trước đây:

```php
add_filter( 'rwmb_meta_boxes', function ( $meta_boxes ) {
	$prefix = 'layout_';
	$meta_boxes[] = [
		'title'  => 'Layout',
		'fields' => [
			[
				'name' => 'Image',
				'id'   => $prefix . 'image',
				'type' => 'single_image',
			],
			// Other fields.
		],
	];

	return $meta_boxes;
} );
```

Code mới trên docs hiện đã bỏ prefix:

```php
add_filter( 'rwmb_meta_boxes', function ( $meta_boxes ) {
	$meta_boxes[] = [
		'title'  => 'Layout',
		'fields' => [
			[
				'name' => 'Image',
				'id'   => 'layout_image',
				'type' => 'single_image',
			],
			// Other fields.
		],
	];

	return $meta_boxes;
} );
```

## Cấu hình

Phần cấu hình này trong UI nằm ở mục **Field Group Settings > tab Advanced > Field ID Prefix**.

## Parse dữ liệu

### Từ UI sang PHP

Khi parse dữ liệu từ UI sang PHP, thì prefix trong UI sẽ được áp dụng cho tất cả các field, bao gồm cả các sub-field trong group. Nói cách khác, các fields sau khi parse thì sẽ có prefix. Phần xử lý này nằm trong hàm `MBBParser\Parsers\MetaBox::parse_field()`.

Dữ liệu sau khi parse được lưu trong post meta `meta_box` của field group.

### Từ UI sang JSON

Khi parse dữ liệu từ UI sang JSON (khi export, khi lưu file JSON cho block, khi dùng tính năng Local JSON) thì các field sẽ không có prefix, mà sẽ có 1 trường settings prefix trong JSON như sau, mục đích là để file JSON ngắn gọn, dễ hiểu nhất có thể:

```json
{
	"$schema": "https://schemas.metabox.io/field-group.json",
	"fields": [
		{
			"name": "Image",
			"id": "image",
			"type": "image",
		}
	],
	"id": "layout",
	"modified": 1756470600,
	"prefix": "layout_",
	"title": "Layout",
}
```

#### Export

Khi export, dữ liệu được lấy theo luồng như sau:

```php
- Lấy từng field group qua `JsonService::get_meta_boxes()`
- Hàm này sẽ query các post có post type là `meta-box`, lấy parsed meta box trong post meta `meta_box` và settings trong post meta `settings`
- Sau đó chạy qua quá trình unparse và trả về format minimal qua `MBBParser\Unparsers\MetaBox::to_minimal_format()`
- Hàm `to_minimal_format` sẽ merge các giá trị của settings và của fields, đồng thời sẽ loại bỏ prefix của các fields
```

#### Local JSON

Khi save dữ liệu từ builder, luồng thực hiện như sau:

- File JSON được tạo ra nhờ hàm `LocalJson::generate_local_json()` & hook `mbb_after_save`
- Hàm này gọi đến hàm `LocalJson::use_database()`, lấy dữ liệu từ post và post meta tương ứng, rồi chạy qua `MBBParser\Unparsers\MetaBox::to_minimal_format()` để trả về format dạng minimal
- Hàm `to_minimal_format` sẽ merge các giá trị của settings và của fields, đồng thời sẽ loại bỏ prefix của các fields

Khi register các field group mà **CÓ** sử dụng tính năng Local JSON, luồng dữ liệu như sau:

```php
- Hàm `Register::register_meta_box()` lấy tất cả các field group từ các file JSON qua `JsonService::get_files()`
- Với mỗi file, parse JSON thành array
- Sau đó chạy qua quá trình unparse và trả về format full
- Trong quá trình unparse, vì file JSON không chứa prefix cho các fields, nên phải thêm prefix vào. Việc thêm prefix được thực hiện trong hàm `MBB\Parsers\MetaBox::unparse_meta_box()`, hàm này làm 2 nhiệm vụ:
	- Thêm prefix cho các fields vào parsed meta box.
	- Xoá prefix cho các fields để lưu vào settings.
```

Ở định dạng full, dữ liệu sau khi unparse như sau:

```json
{
	"fields": [], // Danh cách các field không có prefix, dùng cho export, builder, local JSON
	"meta_box": {
		"fields": [], // Danh sách các field đã có prefix, dùng cho register
	}
}
```

Khi register các field group mà **KHÔNG** sử dụng tính năng Local JSON, luồng dữ liệu như sau:

```php
- Hàm `Register::register_meta_box()` lấy tất cả các field group qua `JsonService::get_meta_boxes()`
- Hàm này sẽ query tất cả các post có post type là `meta-box`, lấy parsed meta box trong post meta `meta_box` và settings trong post meta `settings`
- Sau đó chạy qua quá trình unparse và trả về format full
- Ở định dạng full thì giữ nguyên các giá trị đã parse của PHP trong post meta `meta_box`, nên các fields vẫn có prefix.
```

#### Block JSON

Khi save một field group, thì file JSON cho block được sinh ra như sau:

- Hàm `MBB\Extensions\Blocks\Json::generate_block_json()` hook vào `mbb_after_save` để sinh file JSON
- Hàm này dùng dữ liệu được submit từ builder `$raw_data`, tức là các dữ liệu khi chưa parse gì (lúc đó các field không có prefix), để sinh ra các attributes. Do đó file JSON sẽ không có prefix. Dữ liệu của các field được lưu trong block `attributes` dạng như sau:

```json
"attributes": {
	"text": { // Key là ID của field, không có prefix
		"type": "string",
		"meta-box-field": {
			"_id": "text_mbdfmmuuv5",
			"type": "text",
			"id": "text", // Không có prefix
			"name": "Text"
		}
	},
	...
}
```

Dữ liệu của field này không dùng làm gì, mà chỉ phục vụ cho việc override lại dữ liệu trong builder, khi plugin nhận thấy có file `block.json` với version mới hơn (trong hàm `MBB\Extensions\Blocks\Json::override()`). Khi đó dữ liệu được merge lại và được parse bình thường.

Lưu ý:

- Khi render block, các attributes của block phải dùng prefix cho các field
- Khi parse block (khi override), việc parse được thực hiện qua `MBBParser\Parsers\MetaBox::parse()`, nên prefix sẽ được lưu vào danh sách các field trong post meta `meta_box`