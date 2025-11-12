<?php
namespace MBB\Fields;

use RWMB_Field;

class BlockEditor extends RWMB_Field {
	public static function init(): void {
		add_action( 'rwmb_loaded', [ __CLASS__, 'register' ] );
	}

	public static function register(): void {
		if ( function_exists( 'rwmb_register_field_type' ) ) {
			call_user_func( 'rwmb_register_field_type', 'block_editor', __CLASS__ );
		}
	}

	public static function admin_enqueue_scripts(): void {
		wp_enqueue_editor();
		wp_enqueue_media();

		do_action( 'enqueue_block_editor_assets' );
		do_action( 'enqueue_block_assets' );

		$packages = [
			'wp-element',
			'wp-blocks',
			'wp-block-editor',
			'wp-components',
			'wp-data',
			'wp-compose',
			'wp-i18n',
			'wp-hooks',
		];

		foreach ( $packages as $package ) {
			wp_enqueue_script( $package );
		}

		wp_enqueue_style( 'wp-components' );
		wp_enqueue_style( 'wp-block-library' );
		wp_enqueue_style( 'wp-edit-blocks' );

		$default_bundle = MBB_URL . 'assets/vendor/isolated-block-editor.js';
		$bundle_url     = apply_filters( 'mbb_block_editor_bundle_url', $default_bundle );

		wp_register_script(
			'mbb-block-editor-iso',
			$bundle_url,
			[ 'wp-element', 'wp-components', 'wp-data', 'wp-i18n' ],
			'2.29.0',
			true
		);

		wp_enqueue_script( 'mbb-block-editor-iso' );

		wp_enqueue_script(
			'mbb-block-editor',
			MBB_URL . 'assets/js/block-editor.js',
			array_merge( $packages, [ 'mbb-block-editor-iso' ] ),
			MBB_VER,
			true
		);

		wp_localize_script(
			'mbb-block-editor',
			'rwmbBlockEditorField',
			[
				'bundleUrl' => $bundle_url,
			]
		);

		wp_register_style(
			'mbb-block-editor-iso-core',
			MBB_URL . 'assets/vendor/isolated-block-editor-core.css',
			[],
			'2.29.0'
		);

		wp_register_style(
			'mbb-block-editor-iso',
			MBB_URL . 'assets/vendor/isolated-block-editor.css',
			[ 'mbb-block-editor-iso-core' ],
			'2.29.0'
		);

		wp_enqueue_style(
			'mbb-block-editor',
			MBB_URL . 'assets/css/block-editor.css',
			[ 'wp-edit-blocks', 'mbb-block-editor-iso' ],
			MBB_VER
		);
	}

	public static function normalize( $field ) {
		$field = parent::normalize( $field );

		$field = wp_parse_args(
			$field,
			[
				'allowed_blocks' => [],
			]
		);

		$field['allowed_blocks'] = array_values(
			array_filter(
				array_map(
					static function ( $block ) {
						return is_string( $block ) ? sanitize_text_field( $block ) : '';
					},
					(array) $field['allowed_blocks']
				)
			)
		);

		return $field;
	}

	public static function value( $new, $old, $post_id, $field ) {
		return is_string( $new ) ? wp_kses_post( $new ) : '';
	}

	public static function html( $meta, $field ) {
		$attributes = self::get_attributes( $field, $meta );
		$attributes['class'] = trim( $attributes['class'] . ' rwmb-block-editor-input' );
		$attributes['style'] = 'display:none;';

		$settings = self::prepare_settings( $field );

		$encoded_settings = wp_json_encode( $settings );
		if ( false === $encoded_settings ) {
			$encoded_settings = '{}';
		}

		ob_start();
		?>
		<div
			class="rwmb-block-editor-wrapper"
			data-editor-id="<?php echo esc_attr( $attributes['id'] ?: 'rwmb-block-editor-' . uniqid() ); ?>"
			data-settings="<?php echo esc_attr( $encoded_settings ); ?>"
		>
			<textarea<?php echo self::render_attributes( $attributes ); ?>><?php echo esc_textarea( $meta ); ?></textarea>
		</div>
		<?php
		return ob_get_clean();
	}

	public static function format_single_value( $field, $value, $args, $post_id ) {
		if ( empty( $value ) ) {
			return '';
		}

		if ( function_exists( 'do_blocks' ) ) {
			return do_blocks( $value );
		}

		return apply_filters( 'the_content', $value );
	}

	protected static function prepare_settings( $field ) {
		$settings = [
			'editor' => self::get_editor_settings( $field ),
			'iso'    => [
				'blocks'            => [
					'allowBlocks' => self::get_allowed_blocks( $field ),
				],
				'toolbar'           => false,
				'moreMenu'          => false,
				'defaultPreferences'=> false,
				'allowEmbeds'       => [
					'youtube',
					'vimeo',
					'wordpress',
					'wordpress-tv',
					'videopress',
					'crowdsignal',
					'imgur',
				],
			],
			'editorType'        => 'core',
			'allowUrlEmbed'     => false,
			'pastePlainText'    => false,
			'replaceParagraphCode' => false,
		];

		return apply_filters( 'mbb/block_editor/settings', $settings, $field );
	}

	protected static function get_allowed_blocks( $field ) {
		if ( empty( $field['allowed_blocks'] ) ) {
			return true;
		}

		return array_values( array_unique( $field['allowed_blocks'] ) );
	}

	protected static function get_editor_settings( $field ) {
		global $editor_styles, $post;

		if ( function_exists( 'get_block_categories' ) && function_exists( 'wp_add_inline_script' ) ) {
			wp_add_inline_script(
				'wp-blocks',
				sprintf( 'wp.blocks.setCategories( %s );', wp_json_encode( get_block_categories( $post ) ) )
			);
		}

		$styles = [];
		$locale_font_family = esc_html_x( 'Noto Serif', 'CSS Font Family for Editor Font', 'meta-box-builder' );
		$styles[]           = [
			'css' => "body { font-family: '$locale_font_family' }",
		];

		if ( ! empty( $editor_styles ) && current_theme_supports( 'editor-styles' ) ) {
			foreach ( $editor_styles as $style ) {
				if ( preg_match( '~^(https?:)?//~', $style ) ) {
					$response = wp_remote_get( $style );
					if ( ! is_wp_error( $response ) ) {
						$styles[] = [
							'css' => wp_remote_retrieve_body( $response ),
						];
					}
				} else {
					$file = get_theme_file_path( $style );
					if ( is_file( $file ) ) {
						$styles[] = [
							'css'     => file_get_contents( $file ),
							'baseURL' => get_theme_file_uri( $style ),
						];
					}
				}
			}
		}

		$image_size_names = apply_filters(
			'image_size_names_choose',
			[
				'thumbnail' => __( 'Thumbnail' ),
				'medium'    => __( 'Medium' ),
				'large'     => __( 'Large' ),
				'full'      => __( 'Full Size' ),
			]
		);

		$available_image_sizes = [];
		foreach ( $image_size_names as $image_size_slug => $image_size_name ) {
			$available_image_sizes[] = [
				'slug' => $image_size_slug,
				'name' => $image_size_name,
			];
		}

		$allowed_block_types = true;
		if ( has_filter( 'allowed_block_types_all' ) ) {
			$allowed_block_types = apply_filters( 'allowed_block_types_all', $allowed_block_types, $post );
		} else {
			$allowed_block_types = apply_filters( 'allowed_block_types', $allowed_block_types, $post );
		}

		$editor_settings = [
			'enableUpload'           => true,
			'enableLibrary'          => true,
			'alignWide'              => get_theme_support( 'align-wide' ),
			'disableCustomColors'    => get_theme_support( 'disable-custom-colors' ),
			'disableCustomFontSizes' => get_theme_support( 'disable-custom-font-sizes' ),
			'disablePostFormats'     => ! current_theme_supports( 'post-formats' ),
			'titlePlaceholder'       => apply_filters( 'enter_title_here', __( 'Add title', 'meta-box-builder' ), $post ),
			'bodyPlaceholder'        => apply_filters( 'write_your_story', __( 'Start writing or type / to choose a block', 'meta-box-builder' ), $post ),
			'isRTL'                  => is_rtl(),
			'autosaveInterval'       => defined( 'AUTOSAVE_INTERVAL' ) ? AUTOSAVE_INTERVAL : 0,
			'maxUploadFileSize'      => wp_max_upload_size() ? wp_max_upload_size() : 0,
			'styles'                 => $styles,
			'imageSizes'             => $available_image_sizes,
			'richEditingEnabled'     => user_can_richedit(),
			'codeEditingEnabled'     => true,
			'canLockBlocks'          => true,
			'allowedBlockTypes'      => $allowed_block_types,
			'supportsTemplateMode'   => current_theme_supports( 'block-templates' ),
			'__experimentalCanUserUseUnfilteredHTML' => false,
			'__experimentalBlockPatterns'            => [],
			'__experimentalBlockPatternCategories'   => [],
		];

		$color_palette = current( (array) get_theme_support( 'editor-color-palette' ) );
		if ( false !== $color_palette ) {
			$editor_settings['colors'] = $color_palette;
		}

		$font_sizes = current( (array) get_theme_support( 'editor-font-sizes' ) );
		if ( false !== $font_sizes ) {
			$editor_settings['fontSizes'] = $font_sizes;
		}

		$gradient_presets = current( (array) get_theme_support( 'editor-gradient-presets' ) );
		if ( false !== $gradient_presets ) {
			$editor_settings['gradients'] = $gradient_presets;
		}

		if ( class_exists( 'WP_Block_Editor_Context' ) && function_exists( 'get_block_editor_settings' ) ) {
			$block_editor_context = new \WP_Block_Editor_Context(
				[
					'post' => $post,
				]
			);

			return get_block_editor_settings( $editor_settings, $block_editor_context );
		}

		return $editor_settings;
	}
}

