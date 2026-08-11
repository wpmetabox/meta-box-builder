import { __ } from '@wordpress/i18n';

const DefaultSettings = {
	slug: '',
	function_name: 'your_prefix_register_model',
	text_domain: 'your-textdomain',

	labels: {
		name: '',
		singular_name: '',
		menu_name: '',
		add_new: __( 'Add New', 'meta-box-builder' ),
		add_new_item: '',
		edit_item: '',
		search_items: '',
		not_found: '',
		all_items: '',
		item_updated: '',
		item_added: '',
		item_deleted: '',
	},

	table: '',
	prefix: false,

	show_in_menu: true,
	menu_position: '',
	icon_type: 'dashicons',
	icon: 'admin-post',
	icon_svg: '',
	icon_custom: '',
	font_awesome: '',

	capability: 'edit_posts',
	supports: [],
};

export default DefaultSettings;
