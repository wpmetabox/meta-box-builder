<?php
namespace MBB;

use MBB\Helpers\Data;
use MetaBox\Support\Arr;

class AdminColumns {
	/**
	 * Current view
	 * 
	 * @var string $view
	 */
	protected $view;

	protected $json;

	protected $data = [];

	public function __construct() {
		add_action( 'admin_print_styles-edit.php', [ $this, 'enqueue' ] );
		add_filter( 'manage_meta-box_posts_columns', [ $this, 'add_columns' ] );
		add_action( 'manage_meta-box_posts_custom_column', [ $this, 'show_column' ], 10, 2 );
		add_filter( "views_edit-meta-box", [ $this, 'admin_table_views' ], 10, 1 );
		add_filter( 'post_row_actions', [ $this, 'add_sync_action' ], 10, 2 );
		add_filter( "bulk_actions-edit-meta-box", [ $this, 'admin_table_bulk_actions' ], 10, 1 );
		add_action( 'current_screen', [ $this, 'current_screen' ] );
		add_action( 'admin_footer', [ $this, 'render_diff_dialog' ] );
	}

	public function render_diff_dialog() {
		if ( ! $this->is_status( 'sync' ) ) {
			return;
		}
		?>
		<dialog id="mbb-diff-dialog">
			<header>
				<h2><?php echo esc_html__( 'Review changes', 'meta-box-builder' ) ?></h2>
				<button id="mbb-diff-dialog-close" class="button-link">&times;</button>
			</header>

			<div class="mbb-diff-dialog-content"></div>

			<footer>
				<button id="mbb-diff-dialog-sync-btn" class="button button-primary">
					<?php echo esc_html__( 'Sync', 'meta-box-builder' ) ?>
				</button>
				<button id="mbb-diff-dialog-close-btn" class="button button-secondary">
					<?php echo esc_html__( 'Close', 'meta-box-builder' ) ?>
				</button>
			</footer>
		</dialog>

		<style>
			#mbb-diff-dialog {
				width: 80%;
				max-width: 800px;
				border: 1px solid #ccd0d4;
				border-radius: 4px;
				box-shadow: 0 3px 5px rgba(0, 0, 0, 0.2);
				padding: 20px;
				background: #fff;
			}

			#mbb-diff-dialog header {
				display: flex;
				justify-content: space-between;
				align-items: center;
				border-bottom: 1px solid #ccd0d4;
				padding-bottom: 10px;
				margin-bottom: 20px;
			}

			#mbb-diff-dialog header h2 {
				margin: 0;
				font-size: 1.5em;
			}

			#mbb-diff-dialog header button {
				background: none;
				border: none;
				color: #0073aa;
				cursor: pointer;
			}

			#mbb-diff-dialog header button:hover {
				color: #005177;
			}

			.mbb-diff-dialog-content {
				display: flex;
				justify-content: space-between;
			}

			.mbb-diff-dialog-content>div {
				width: 48%;
			}

			.mbb-diff-dialog-content h3 {
				margin-top: 0;
				font-size: 1.2em;
			}

			.mbb-diff-dialog-content pre {
				background: #f6f7f7;
				border: 1px solid #ccd0d4;
				border-radius: 4px;
				padding: 10px;
				overflow-x: auto;
				max-height: 300px;
			}

			#mbb-diff-dialog footer {
				display: flex;
				justify-content: flex-end;
				border-top: 1px solid #ccd0d4;
				padding-top: 10px;
				margin-top: 20px;
			}

			#mbb-diff-dialog footer button {
				margin-left: 10px;
			}

			#mbb-diff-dialog-close {
				font-size: 2em;
				text-decoration: none;
			}
		</style>

		<script>
			const syncData = <?php echo json_encode( $this->json ) ?>;
			const showDialog = ( mbbId ) => {
				const dialog = document.getElementById( 'mbb-diff-dialog' );
				dialog.querySelector( '.mbb-diff-dialog-content' ).innerHTML = syncData[ mbbId ].diff;
				dialog.showModal();
			};

			document.getElementById( 'mbb-diff-dialog-close' ).addEventListener( 'click', () => {
				document.getElementById( 'mbb-diff-dialog' ).close();
			} );

			document.getElementById( 'mbb-diff-dialog-sync-btn' ).addEventListener( 'click', () => {
				document.getElementById( 'mbb-diff-dialog' ).close();
			} );

			document.getElementById( 'mbb-diff-dialog-close-btn' ).addEventListener( 'click', () => {
				document.getElementById( 'mbb-diff-dialog' ).close();
			} );

			// Escape key to close dialog
			document.addEventListener( 'keydown', ( e ) => {
				if ( e.key === 'Escape' ) {
					document.getElementById( 'mbb-diff-dialog' ).close();
				}
			} );

			// Click outside to close dialog
			document.getElementById( 'mbb-diff-dialog' ).addEventListener( 'click', ( e ) => {
				if ( e.target === document.getElementById( 'mbb-diff-dialog' ) ) {
					document.getElementById( 'mbb-diff-dialog' ).close();
				}
			} );
		</script>
		<?php
	}

	public function current_screen() {
		$screen = get_current_screen();

		if ( $screen->id !== 'edit-meta-box' ) {
			return;
		}

		$this->view = $_GET['post_status'] ?? ''; //phpcs:ignore WordPress.Security.NonceVerification.Recommended -- used as intval to return a page.

		$this->init_data()
			->init_sync()
			->check_sync();

		if ( $this->view === 'sync' ) {
			add_action( 'admin_footer', [ $this, 'render_sync_template' ], 1 );
		}
	}

	public function check_sync() {
		$action = $_GET['action'] ?? ''; //phpcs:ignore WordPress.Security.NonceVerification.Recommended -- used as intval to return a page.

		if ( $action !== 'mbb-sync' ) {
			return;
		}

		if ( ! current_user_can( 'administrator' ) ) {
			wp_die( __( 'Not allowed', 'meta-box-builder' ) );
		}

		$mb_id = $_GET['id'] ?? ''; //phpcs:ignore WordPress.Security.NonceVerification.Recommended -- used as intval to return a page.

		if ( empty( $mb_id ) ) {
			wp_die( __( 'Not found', 'meta-box-builder' ) );
		}

		$data      = $this->json[ $mb_id ];
		$file_path = $data['file'];

		// No post found, import the json file.
		if ( ! $data['post_id'] ) {
			$res     = LocalJson::import( $file_path );
			$message = $res ? 'imported' : 'import-failed';
			wp_safe_redirect( admin_url( 'edit.php?post_type=meta-box&message=' . $message ) );
			exit;
		}

		if ( $data['is_newer'] > 0 ) {
			$res     = LocalJson::update_remote( $data['post_id'], $file_path );
			$message = $res ? 'remoted-updated' : 'remoted-update-failed';
			wp_safe_redirect( admin_url( 'edit.php?post_type=meta-box&message=' . $message ) );
			exit;
		}

		if ( $data['is_newer'] === -1 ) {
			$res     = LocalJson::update_local( $data['post_id'], $file_path );
			$message = $res ? 'local-updated' : 'local-update-failed';
			wp_safe_redirect( admin_url( 'edit.php?post_type=meta-box&message=' . $message ) );
			exit;
		}
	}

	public function render_sync_template() {
		global $wp_list_table;

		// Get table columns.
		$columns = $wp_list_table->get_columns();
		$hidden  = get_hidden_columns( $wp_list_table->screen );
		?>
		<template id="mb-sync-list">
			<tbody>
				<?php foreach ( $this->json as $id => $data ) : ?>
					<tr>
						<?php foreach ( $columns as $name => $label ) :
							$tag     = $name === 'cb' ? 'th' : 'td';
							$classes = [ $name, "column-$name" ];

							if ( $name === 'cb' ) {
								$classes[] = 'check-column';
								$label     = '';
							}

							if ( $name === 'title' ) {
								$classes[] = 'column-primary';
							}

							if ( in_array( $name, $hidden ) ) {
								$classes[] = ' hidden';
							}

							echo '<' . $tag . ' class="' . esc_attr( implode( ' ', $classes ) ) . '" data-colname="' . esc_attr( $label ) . '">';

							switch ( $name ) {
								case 'cb':
									echo '<label for="cb-select-' . esc_attr( $id ) . '" class="screen-reader-text">';
									/* translators: %s: field group title */
									echo esc_html( sprintf( __( 'Select %s', 'acf' ), $data['local']['title'] ) );
									echo '</label>';
									echo '<input id="cb-select-' . esc_attr( $id ) . '" type="checkbox" value="' . esc_attr( $id ) . '" name="post[]">';
									break;

								case 'title':
									echo esc_html( $data['local']['post_title'] );
									;
									break;

								default:
									$this->show_column( $name, $id );
									break;
							}

							echo "</$tag>";
						endforeach; ?>
					</tr>
				<?php endforeach; ?>
			</tbody>
		</template>

		<script>
			document.addEventListener( 'DOMContentLoaded', function () {
				const template = document.querySelector( '#mb-sync-list' );
				const tbody = template.content.querySelector( 'tbody' );
				document.querySelector( '.wp-list-table tbody' ).replaceWith( tbody );
			} );
		</script>
		<?php
	}

	public function init_sync(): self {
		// Get a list of json files in the theme directory.
		$paths = LocalJson::get_json_paths();

		$json = [];
		foreach ( $paths as $path ) {
			if ( ! file_exists( $path ) ) {
				continue;
			}
			// List files under $path
			$files = glob( $path . '/*.json' );

			$json = [];
			foreach ( $files as $file ) {
				$mb_id          = rtrim( basename( $file ), '.json' );
				$json[ $mb_id ] = $this->get_sync_status( $file );
			}
		}

		$this->json = $json;

		return $this;
	}

	private function init_data(): self {
		$query = new \WP_Query( [ 
			'post_type' => 'meta-box',
			'posts_per_page' => -1,
			'no_found_rows' => true,
			'update_post_term_cache' => false,
		] );

		$meta_boxes = [];
		foreach ( $query->posts as $post ) {
			$meta_keys = Export::get_meta_keys( $post->post_type );

			$post_data = [ 
				'post_type' => $post->post_type,
				'post_name' => $post->post_name,
				'post_title' => $post->post_title,
				'post_date' => $post->post_date,
				'post_status' => $post->post_status,
				'post_content' => $post->post_content,
			];

			foreach ( $meta_keys as $meta_key ) {
				$post_data[ $meta_key ] = get_post_meta( $post->ID, $meta_key, true );
			}


			if ( ! is_array( $post_data ) ) {
				continue;
			}

			$post_data['settings']['version'] = $post_data['settings']['version'] ?? 'v0';
			$meta_boxes[ $post->ID ]          = $post_data;
		}

		$this->data = $meta_boxes;

		return $this;
	}

	private function get_meta_box_by_id( $id ): array {
		$meta_boxes = $this->data;

		// Filter by meta box id
		$meta_box = array_filter( $meta_boxes, function ($meta_box) use ($id) {
			return $meta_box['meta_box']['id'] === $id;
		} );

		// Get the first key of array
		$keys = array_keys( $meta_box );

		// No posts found, return empty array
		if ( empty( $keys ) ) {
			return [ 
				null,
				[ 
					'settings' => [ 'version' => 'v0' ],
				],
			];
		}

		// [post_id, meta_box]
		return [ $keys[0], $meta_box[ $keys[0] ] ];
	}

	private function get_sync_status( $file ) {
		$local = json_decode( file_get_contents( $file ), true );
		$mb_id = $local['meta_box']['id'] ?? $local['post_name'];

		[ $post_id, $remote ] = $this->get_meta_box_by_id( $mb_id );

		$is_newer = version_compare( $local['settings']['version'], $remote['settings']['version'] );

		$diff = wp_text_diff( wp_json_encode( $local, JSON_PRETTY_PRINT ), wp_json_encode( $remote, JSON_PRETTY_PRINT ), [ 
			'title_left' => esc_html__( 'Local', 'meta-box-builder' ),
			'title_right' => esc_html__( 'Remote', 'meta-box-builder' ),
		] );

		return compact( 'is_newer', 'local', 'remote', 'diff', 'post_id', 'file', 'mb_id' );
	}

	/**
	 * Add sync to quick actions
	 */
	public function add_sync_action( array $actions, object $post ): array {
		if ( ! in_array( $post->post_type, [ 'meta-box' ], true ) ) {
			return $actions;
		}

		$url = wp_nonce_url( add_query_arg( [ 
			'action' => 'mbb-sync',
			'post_type' => $post->post_type,
			'post[]' => $post->ID,
		] ), 'bulk-posts' ); // @see WP_List_Table::display_tablenav()

		$actions['sync'] = '<a href="' . esc_url( $url ) . '">' . esc_html__( 'Sync changes', 'meta-box-builder' ) . '</a>';

		return $actions;
	}

	private function is_status( string $status ): bool {
		return isset( $_GET['post_status'] ) && $_GET['post_status'] === $status; //phpcs:ignore WordPress.Security.NonceVerification.Recommended -- used as intval to return a page.
	}

	public function admin_table_bulk_actions( $actions ) {
		$actions['sync'] = __( 'Sync changes', 'meta-box-builder' );

		return $actions;
	}

	public function admin_table_views( $views ) {
		global $wp_list_table, $wp_query;

		$count = count( array_filter( $this->json, function ($json) {
			return $json['is_newer'] > 0;
		} ) );

		if ( $count ) {
			$url = add_query_arg( [ 
				'post_status' => 'sync',
			] );

			$views['sync'] = sprintf(
				'<a %s href="%s">%s <span class="count">(%s)</span></a>',
				$this->is_status( 'sync' ) ? 'class="current"' : '',
				$url,
				esc_html( __( 'Sync available', 'acf' ) ),
				$count
			);
		}

		if ( $this->view === 'sync' ) {
			$wp_list_table->set_pagination_args( [ 
				'total_items' => $count,
				'total_pages' => 1,
				'per_page' => $count,
			] );
			$wp_query->post_count = 1; // At least one post is needed to render bulk drop-down.
		}

		return $views;
	}

	public function enqueue() {
		if ( ! in_array( get_current_screen()->id, [ 'edit-meta-box', 'edit-mb-relationship', 'edit-mb-settings-page' ], true ) ) {
			return;
		}

		wp_enqueue_style( 'mbb-list', MBB_URL . 'assets/css/list.css', [], MBB_VER );
		wp_enqueue_script( 'mbb-list', MBB_URL . 'assets/js/list.js', [ 'jquery' ], MBB_VER, true );
		wp_localize_script( 'mbb-list', 'MBB', [ 
			'export' => esc_html__( 'Export', 'meta-box-builder' ),
			'import' => esc_html__( 'Import', 'meta-box-builder' ),
		] );

		if ( Data::is_extension_active( 'mb-frontend-submission' ) ) {
			wp_register_script( 'popper', MBB_URL . 'assets/js/popper.js', [], '2.11.6', true );
			wp_enqueue_script( 'tippy', MBB_URL . 'assets/js/tippy.js', [ 'popper' ], '6.3.7', true );
			wp_add_inline_script( 'tippy', 'tippy( ".mbb-tooltip", {placement: "top", arrow: true, animation: "fade"} );' );
		}
	}

	public function add_columns( $columns ) {
		$new_columns = [ 
			'for' => __( 'Show For', 'meta-box-builder' ),
			'location' => __( 'Location', 'meta-box-builder' ),
		];

		if ( Data::is_extension_active( 'mb-frontend-submission' ) && ! $this->is_status( 'sync' ) ) {
			$new_columns['shortcode'] = __( 'Shortcode', 'meta-box-builder' ) . Data::tooltip( __( 'Embed the field group in the front end for users to submit posts.', 'meta-box-builder' ) );
		}

		if ( $this->is_status( 'sync' ) ) {
			$new_columns['local_json'] = __( 'Local JSON', 'meta-box-builder' );
		}

		$columns = array_slice( $columns, 0, 2, true ) + $new_columns + array_slice( $columns, 2, null, true );

		return $columns;
	}

	public function show_column( $column, $post_id ) {
		if ( ! in_array( $column, [ 'for', 'location', 'shortcode', 'local_json' ], true ) ) {
			return;
		}

		// In sync view, we don't have post_id and related data because we read from json files.
		// so we need to handle it differently.
		if ( $this->is_status( 'sync' ) ) {
			if ( method_exists( $this, "show_{$column}_sync" ) ) {
				$this->{"show_{$column}_sync"}( $post_id );
				return;
			}

			$this->{"show_{$column}"}( $post_id );
			return;
		}

		$data = get_post_meta( get_the_ID(), 'settings', true );
		$this->{"show_$column"}( $data );
	}

	private function show_local_json( string $mb_id ) {
		$url = wp_nonce_url( add_query_arg( [ 
			'action' => 'mbb-sync',
			'id' => $mb_id,
		] ), 'bulk-posts' ); // @see WP_List_Table::display_tablenav()

		$sync_data = $this->json[ $mb_id ];

		// Empty sync data means no related json file.
		if ( empty( $sync_data ) || $sync_data['is_newer'] === 0 ) {
			return;
		}
		?>
		<strong><?php echo esc_html__( 'Sync available', 'meta-box-builder' ) ?></strong>
		<div class="row-actions">
			<?php if ( $this->is_status( 'sync' ) ) :
				if ( empty( $sync_data['post_id'] ) ) : ?>
					<span class="import">
						<a href="<?php echo $url ?>">
							<?php echo esc_html__( 'Import', 'meta-box-builder' ) ?>
						</a>
					</span>
				<?php else : ?>
					<span class="sync">
						<a href="<?php echo $url ?>">
							<?php echo esc_html__( 'Sync changes', 'meta-box-builder' ) ?>
						</a> |
					</span>
					<span class="review">
						<a href="javascript:;" role="button" onclick="return showDialog('<?php echo $mb_id ?>');">
							<?php echo esc_html__( 'Review changes', 'meta-box-builder' ) ?>
						</a>
					</span>
				<?php endif; ?>
			<?php endif; ?>

		</div>
		<?php
	}

	private function show_for( $data ) {
		$object_type = Arr::get( $data, 'object_type', 'post' );

		$labels = [ 
			'user' => __( 'Users', 'meta-box-builder' ),
			'comment' => __( 'Comments', 'meta-box-builder' ),
			'setting' => __( 'Settings Pages', 'meta-box-builder' ),
			'post' => __( 'Posts', 'meta-box-builder' ),
			'term' => __( 'Taxonomies', 'meta-box-builder' ),
			'block' => __( 'Blocks', 'meta-box-builder' ),
		];

		if ( isset( $labels[ $object_type ] ) ) {
			esc_html_e( $labels[ $object_type ] );
		}
	}

	private function get_human_readable_file_location( $file ) {
		// Get the relative path of the file.
		$active_theme = get_template_directory();
		$plugins_path = WP_PLUGIN_DIR;

		if ( str_contains( $file, $active_theme ) ) {
			return sprintf( __( 'Active theme: %s', 'meta-box-builder' ), str_replace( $active_theme, '', $file ) );
		}

		if ( str_contains( $file, $plugins_path ) ) {
			return sprintf( __( 'Plugin: %s', 'meta-box-builder' ), str_replace( $plugins_path, '', $file ) );
		}

		if ( str_contains( $file, ABSPATH ) ) {
			return sprintf( __( 'Path: %s', 'meta-box-builder' ), str_replace( ABSPATH, '', $file ) );
		}
	}

	private function show_location_sync( $post_id ) {
		echo $this->get_human_readable_file_location( $this->json[ $post_id ]['file'] );
	}

	private function show_location( $data ) {
		$object_type = Arr::get( $data, 'object_type', 'post' );
		switch ( $object_type ) {
			case 'user':
				esc_html_e( 'All Users', 'meta-box-builder' );
				break;
			case 'comment':
				esc_html_e( 'All Comments', 'meta-box-builder' );
				break;
			case 'setting':
				$settings_pages = Data::get_setting_pages();
				$settings_pages = wp_list_pluck( $settings_pages, 'title', 'id' );
				$ids = Arr::get( $data, 'settings_pages', [] );
				$saved = array_intersect_key( $settings_pages, array_flip( $ids ) );
				echo wp_kses_post( implode( '<br>', $saved ) );
				break;
			case 'post':
				echo wp_kses_post( implode( '<br>', array_filter( array_map( function ($post_type) {
					$post_type_object = get_post_type_object( $post_type );
					return $post_type_object ? $post_type_object->labels->singular_name : '';
				}, Arr::get( $data, 'post_types', [ 'post' ] ) ) ) ) );
				break;
			case 'term':
				echo wp_kses_post( implode( '<br>', array_filter( array_map( function ($taxonomy) {
					$taxonomy_object = get_taxonomy( $taxonomy );
					return $taxonomy_object ? $taxonomy_object->labels->singular_name : '';
				}, Arr::get( $data, 'taxonomies', [] ) ) ) ) );
				break;
			case 'block':
				if ( isset( $data['block_json'] ) && isset( $data['block_json']['path'] ) ) {
					echo esc_html( $data['block_json']['path'] );
				}
				break;
		}
	}

	private function show_shortcode() {
		global $post;
		$shortcode = "[mb_frontend_form id='{$post->post_name}' post_fields='title,content']";
		echo '<input type="text" readonly value="' . esc_attr( $shortcode ) . '" onclick="this.select()">';
	}
}
