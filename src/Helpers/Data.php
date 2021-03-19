<?php
namespace MBB\Helpers;

class Data {
	public static function get_post_types() {
		$unsupported = [
			// WordPress built-in post types.
			'customize_changeset',
			'custom_css',
			'nav_menu_item',
			'oembed_cache',
			'revision',
			'user_request',
			'wp_block',

			// Meta Box post types.
			'mb-post-type',
			'mb-relationship',
			'mb-settings-page',
			'mb-taxonomy',
			'mb-views',
			'meta-box',
		];
		$post_types  = get_post_types( [], 'objects' );
		$post_types  = array_diff_key( $post_types, array_flip( $unsupported ) );
		$post_types  = array_map( function( $post_type ) {
			return [
				'slug'         => $post_type->name,
				'name'         => $post_type->labels->singular_name,
				'hierarchical' => $post_type->hierarchical,
				'block_editor' => function_exists( 'use_block_editor_for_post_type' ) && use_block_editor_for_post_type( $post_type->name ),
			];
		}, $post_types );

		return array_values( $post_types );
	}

	public static function get_taxonomies() {
		$unsupported = ['link_category', 'nav_menu', 'post_format'];
		$taxonomies  = get_taxonomies( '', 'objects' );
		$taxonomies  = array_diff_key( $taxonomies, array_flip( $unsupported ) );
		$taxonomies  = array_map( function( $taxonomy ) {
			return [
				'slug'         => $taxonomy->name,
				'name'         => $taxonomy->labels->singular_name,
				'hierarchical' => $taxonomy->hierarchical,
			];
		}, $taxonomies );

		return array_values( $taxonomies );
	}

	public static function get_page_templates() {
		return array_flip( wp_get_theme()->get_page_templates() );
	}

	public static function get_templates() {
		$post_types = self::get_post_types();

		$templates = [];
		foreach ( $post_types as $post_type ) {
			$post_type_templates = array_flip( wp_get_theme()->get_page_templates( null, $post_type['slug'] ) );

			foreach ( $post_type_templates as $name => $file ) {
				$templates[] = [
					'name'           => $name,
					'file'           => $file,
					'post_type'      => $post_type['slug'],
					'post_type_name' => $post_type['name'],
					'id'             => "{$post_type['slug']}:{$file}",
				];
			}
		}

		return $templates;
	}

	public static function get_post_formats() {
		if ( ! current_theme_supports( 'post-formats' ) ) {
			return [];
		}
		$post_formats = get_theme_support( 'post-formats' );

		return is_array( $post_formats[0] ) ? $post_formats[0] : [];
	}

	public static function get_setting_pages() {
		$pages = [];
		$settings_pages = apply_filters( 'mb_settings_pages', [] );
		foreach ( $settings_pages as $settings_page ) {
			$title = '';
			if ( ! empty( $settings_page['menu_title'] ) ) {
				$title = $settings_page['menu_title'];
			} elseif ( ! empty( $settings_page['page_title'] ) ) {
				$title = $settings_page['page_title'];
			}

			$tabs = [];
			if ( ! empty( $settings_page['tabs'] ) ) {
				foreach ( $settings_page['tabs'] as $id => $tab ) {
					if ( is_string( $tab ) ) {
						$tab = ['label' => $tab];
					}
					$tab = wp_parse_args( $tab, [
						'icon'  => '',
						'label' => '',
					] );
					$tabs[ $id ] = $tab['label'];
				}
			}

			$pages[] = [
				'id'    => $settings_page['id'],
				'title' => $title,
				'tabs'  => $tabs,
			];
		}
		return $pages;
	}

	public static function get_dashicons() {
		return array(
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
		);
	}

	public static function is_extension_active( $extension ) {
		$functions = [
			'mb-admin-columns'           => 'mb_admin_columns_load',
			'mb-blocks'                  => 'mb_blocks_load',
			'mb-comment-meta'            => 'mb_comment_meta_load',
			'mb-custom-table'            => 'mb_custom_table_load',
			'mb-frontend-submission'     => 'mb_frontend_submission_load',
			'mb-settings-page'           => 'mb_settings_page_load',
			'mb-term-meta'               => 'mb_term_meta_load',
			'mb-user-meta'               => 'mb_user_meta_load',
			'meta-box-columns'           => 'mb_columns_add_markup',
			'meta-box-conditional-logic' => 'mb_conditional_logic_load',
		];
		$classes = [
			'mb-relationships'         => 'MBR_Loader',
			'meta-box-group'           => 'RWMB_Group',
			'meta-box-include-exclude' => 'MB_Include_Exclude',
			'meta-box-show-hide'       => 'MB_Show_Hide',
			'meta-box-tabs'            => 'MB_Tabs',
			'meta-box-tooltip'         => 'MB_Tooltip',
		];

		if ( isset( $functions[ $extension ] ) ) {
			return function_exists( $functions[ $extension ] );
		}
		if ( isset( $classes[ $extension ] ) ) {
			return class_exists( $classes[ $extension ] );
		}
		return false;
	}

	public static function tooltip( $content ) {
		return '<button type="button" class="mbb-tooltip" data-tippy-content="' . esc_attr( $content ) . '"><span class="dashicons dashicons-editor-help"></span></button>';
	}

	/**
	 * Parse post content to meta box settings array.
	 * Try JSON decode first, then unserialize for backward-compatibility.
	 *
	 * @param  string $data Encoded post content.
	 * @return array
	 */
	public static function parse_meta_box_settings( $data ) {
		$settings = json_decode( $data, true );
		return json_last_error() === JSON_ERROR_NONE ? $settings : @unserialize( $data );
	}
}