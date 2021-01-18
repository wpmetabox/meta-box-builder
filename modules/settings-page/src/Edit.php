<?php
namespace MBB\SettingsPage;

class Edit {
	public function __construct() {
		add_action( 'edit_form_after_title', [ $this, 'render' ] );
		add_action( 'admin_enqueue_scripts', [ $this, 'enqueue' ] );
		add_action( 'save_post_mb-settings-page', [ $this, 'save' ] );

		add_action( 'add_meta_boxes_mb-settings-page', [ $this, 'remove_slug_meta_box'] );
		add_filter( 'rwmb_meta_boxes', [ $this, 'add_meta_boxes' ] );
		add_filter( 'rwmb_post_name_field_meta', [ $this, 'get_post_name' ] );
		add_filter( 'rwmb_post_name_value', '__return_empty_string' );
	}

	public function render() {
		if ( $this->is_screen() ) {
			echo '<div id="root" class="mb-spui"></div>';
		}
	}

	public function enqueue() {
		if ( ! $this->is_screen() ) {
			return;
		}

		$url = MBB_URL . 'modules/settings-page/assets';

		wp_enqueue_style( 'mb-settings-page-ui', "$url/style.css", ['wp-components'], MBB_VER );
		wp_enqueue_script( 'mb-settings-page-ui', "$url/scripts.js", ['wp-element', 'wp-components', 'wp-i18n'], MBB_VER, true );

		global $post;
		$register = new Register();
		wp_localize_script( 'mb-settings-page-ui', 'MBSPUI', [
			'caps'              => $this->getAllCaps(),
			'settings'          => json_decode( $post->post_content, true ),
			'settings_pages'    => $register->settings_pages,
			'custom_post_types' => $this->getCustomPostTypes(),
			'icons'             => $this->get_icons(),
		] );
	}

	public function getAllCaps() {
		global $wp_roles;

		$caps = [];

		foreach ( $wp_roles->roles as $role ) {
			$caps = array_merge( $role[ 'capabilities' ], $caps );
		}

		$datas = [];

		foreach ( $caps as $key => $value ) {
			$datas[] = [
				'value' => $key,
				'label' => $key
			];
		}

		return $datas;
	}

	public function getCustomPostTypes() {
		$datas = [];

		$post_types = get_post_types(
			[
				'public'   => true,
				'_builtin' => false,
			],
			'objects',
			'and'
		);

		foreach( $post_types as $type ) {
			$datas[] = [
				'name'  => 'parent',
				'value' => 'edit.php?post_type=' . $type->name,
				'label' => $type->label . ' (custom post type)'
			];
		}

		return $datas;
	}

	private function get_icons() {
		return [
			'admin-appearance',
			'admin-collapse',
			'admin-comments',
			'admin-generic',
			'admin-home',
			'admin-links',
			'admin-media',
			'admin-network',
			'admin-page',
			'admin-plugins',
			'admin-post',
			'admin-settings',
			'admin-site',
			'admin-tools',
			'admin-users',
			'album',
			'align-center',
			'align-left',
			'align-none',
			'align-right',
			'analytics',
			'archive',
			'arrow-down-alt2',
			'arrow-down-alt',
			'arrow-down',
			'arrow-left-alt2',
			'arrow-left-alt',
			'arrow-left',
			'arrow-right-alt2',
			'arrow-right-alt',
			'arrow-right',
			'arrow-up-alt2',
			'arrow-up-alt',
			'arrow-up',
			'art',
			'awards',
			'backup',
			'book-alt',
			'book',
			'building',
			'businessman',
			'calendar-alt',
			'calendar',
			'camera',
			'carrot',
			'cart',
			'category',
			'chart-area',
			'chart-bar',
			'chart-line',
			'chart-pie',
			'clipboard',
			'clock',
			'cloud',
			'controls-back',
			'controls-forward',
			'controls-pause',
			'controls-play',
			'controls-repeat',
			'controls-skipback',
			'controls-skipforward',
			'controls-volumeoff',
			'controls-volumeon',
			'dashboard',
			'desktop',
			'dismiss',
			'download',
			'editor-aligncenter',
			'editor-alignleft',
			'editor-alignright',
			'editor-bold',
			'editor-break',
			'editor-code',
			'editor-contract',
			'editor-customchar',
			'editor-distractionfree',
			'editor-expand',
			'editor-help',
			'editor-indent',
			'editor-insertmore',
			'editor-italic',
			'editor-justify',
			'editor-kitchensink',
			'editor-ol',
			'editor-outdent',
			'editor-paragraph',
			'editor-paste-text',
			'editor-paste-word',
			'editor-quote',
			'editor-removeformatting',
			'editor-rtl',
			'editor-spellcheck',
			'editor-strikethrough',
			'editor-textcolor',
			'editor-ul',
			'editor-underline',
			'editor-unlink',
			'editor-video',
			'edit',
			'email-alt',
			'email',
			'excerpt-view',
			'exerpt-view',
			'external',
			'facebook-alt',
			'facebook',
			'feedback',
			'flag',
			'format-aside',
			'format-audio',
			'format-chat',
			'format-gallery',
			'format-image',
			'format-links',
			'format-quote',
			'format-standard',
			'format-status',
			'format-video',
			'forms',
			'googleplus',
			'grid-view',
			'groups',
			'hammer',
			'heart',
			'id-alt',
			'id',
			'images-alt2',
			'images-alt',
			'image-crop',
			'image-flip-horizontal',
			'image-flip-vertical',
			'image-rotate-left',
			'image-rotate-right',
			'index-card',
			'info',
			'leftright',
			'lightbulb',
			'list-view',
			'location-alt',
			'location',
			'lock',
			'marker',
			'media-archive',
			'media-audio',
			'media-code',
			'media-default',
			'media-document',
			'media-interactive',
			'media-spreadsheet',
			'media-text',
			'media-video',
			'megaphone',
			'menu',
			'microphone',
			'migrate',
			'minus',
			'money',
			'nametag',
			'networking',
			'no-alt',
			'no',
			'palmtree',
			'performance',
			'phone',
			'playlist-audio',
			'playlist-video',
			'plus-alt',
			'plus',
			'portfolio',
			'post-status',
			'post-trash',
			'pressthis',
			'products',
			'randomize',
			'redo',
			'rss',
			'schedule',
			'screenoptions',
			'search',
			'share1',
			'share-alt2',
			'share-alt',
			'share',
			'shield-alt',
			'shield',
			'slides',
			'smartphone',
			'smiley',
			'sort',
			'sos',
			'star-empty',
			'star-filled',
			'star-half',
			'store',
			'tablet',
			'tagcloud',
			'tag',
			'testimonial',
			'text',
			'tickets-alt',
			'tickets',
			'translation',
			'trash',
			'twitter',
			'undo',
			'universal-access-alt',
			'universal-access',
			'update',
			'upload',
			'vault',
			'video-alt2',
			'video-alt3',
			'video-alt',
			'visibility',
			'welcome-add-page',
			'welcome-comments',
			'welcome-edit-page',
			'welcome-learn-more',
			'welcome-view-site',
			'welcome-widgets-menus',
			'welcome-write-blog',
			'wordpress-alt',
			'wordpress',
		];
	}

	public function save( $post_id ) {
		$parent = wp_is_post_revision( $post_id );
		if ( $parent ) {
			$post_id = $parent;
		}
	}

	private function is_screen() {
		return 'mb-settings-page' === get_current_screen()->id;
	}

	public function remove_slug_meta_box() {
		remove_meta_box( 'slugdiv', null, 'normal' );
	}

	public function add_meta_boxes( $meta_boxes ) {
		$meta_boxes[] = [
			'title'      => esc_html__( 'Settings Page ID', 'meta-box-builder' ),
			'id'         => 'settings-page-id',
			'post_types' => ['mb-settings-page'],
			'context'    => 'side',
			'priority'   => 'low',
			'fields'     => [
				[
					'type' => 'text',
					'id'   => 'post_name',
				],
			],
		];
		return $meta_boxes;
	}

	public function get_post_name() {
		return get_post_field( 'post_name' );
	}
}