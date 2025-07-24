<?php
namespace MBB\FieldGroupModes;

class ShortcodeAdminColumn {
	public function __construct() {
		add_action( 'load-edit.php', [ $this, 'load' ] );
	}

	public function load(): void {
		if ( ! $this->is_screen() ) {
			return;
		}

		add_filter( 'manage_meta-box_posts_columns', [ $this, 'add_columns' ] );
		add_action( 'manage_meta-box_posts_custom_column', [ $this, 'show_column' ] );
		add_action( 'admin_footer', [ $this, 'output_script' ] );
	}

	private function is_screen(): bool {
		if ( get_current_screen()->id !== 'edit-meta-box' ) {
			return false;
		}
		if ( empty( $_GET['mode'] ) || $_GET['mode'] !== 'post-submission-form' ) {
			return false;
		}

		return true;
	}

	public function add_columns( array $columns ): array {
		$columns['shortcode'] = __( 'Shortcode', 'meta-box-builder' );
		return $columns;
	}

	public function show_column( string $column ): void {
		if ( $column !== 'shortcode' ) {
			return;
		}

		global $post;

		$shortcode = "[mb_frontend_form id='{$post->post_name}']";
		// Translators: %1$s is the tooltip text, %2$s is the shortcode.
		printf( '<span class="mbb-shortcode" data-tooltip="%1$s">%2$s</span>', esc_attr__( 'Click to copy', 'meta-box-builder' ), esc_html( $shortcode ) );
	}

	public function output_script(): void {
		?>
		<style>
			.mbb-shortcode {
				cursor: pointer;
				display: inline-block;
				position: relative;
			}

			.mbb-shortcode:after {
				display: inline-block;
				content: attr(data-tooltip);
				position: absolute;
				z-index: 1;
				top: 100%;
				left: 0;
				transform: translateY(0);

				background-color: #000;
				color: #fff;
				font-size: 12px;
				line-height: 1.2;
				padding: 4px;
				border-radius: 4px;

				visibility: hidden;
				opacity: 0;
				transition: opacity 0.3s;
			}

			.mbb-shortcode:hover:after {
				visibility: visible;
				opacity: 1;
			}
		</style>
		<script>
			{
				const copyText = e => {
					var range = document.createRange();
					range.selectNode( e.target );

					window.getSelection().removeAllRanges();
					window.getSelection().addRange( range );

					document.execCommand( 'copy' );
					window.getSelection().removeAllRanges();

					e.target.dataset.tooltip = '<?php esc_attr_e( 'Copied', 'meta-box-builder' ) ?>';
					setTimeout( () => {
						e.target.dataset.tooltip = '<?php esc_attr_e( 'Click to copy', 'meta-box-builder' ) ?>';
					}, 2000 );
				};

				document.querySelectorAll( '.mbb-shortcode' ).forEach( el => {
					el.addEventListener( 'click', copyText );
				} );
			}
		</script>
		<?php
	}
}
