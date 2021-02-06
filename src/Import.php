<?php
namespace MBB;

use WP_Query;

class Import {
	public function __construct() {
		add_filter( 'post_row_actions', [$this, 'add_export_link'], 10, 2 );

		add_action( 'admin_footer-edit.php', [ $this, 'output_js_templates' ] );
		add_action( 'admin_init', [ $this, 'export' ] );

		// Must run before upgrade.
		$this->import();
	}

	public function add_export_link( $actions, $post ) {
		if ( 'meta-box' === $post->post_type ) {
			$actions['export'] = '<a href="' . add_query_arg( ['action' => 'mbb-export', 'post[]' => $post->ID] ) . '">' . esc_html__( 'Export', 'meta-box-builder' ) . '</a>';
		}
		return $actions;
	}

	public function output_js_templates() {
		if ( 'edit-meta-box' !== get_current_screen()->id ) {
			return;
		}
		?>
		<?php if ( isset( $_GET['imported'] ) ) : ?>
			<div class="notice notice-success is-dismissible"><p><?php esc_html_e( 'Field groups have been imported successfully!', 'meta-box-builder' ); ?></p></div>
		<?php endif; ?>

		<script type="text/template" id="mbb-import-form">
			<div class="mbb-import-form">
				<p><?php esc_html_e( 'Choose an exported ".json" file from your computer:', 'meta-box-builder' ); ?></p>
				<form enctype="multipart/form-data" method="post" action="">
					<?php wp_nonce_field( 'import', 'nonce' ); ?>
					<input type="file" name="mbb_file">
					<?php submit_button( esc_attr__( 'Import', 'meta-box-builder' ), 'secondary', 'submit', false, ['disabled' => true] ); ?>
				</form>
			</div>
		</script>
		<?php
	}

	public function export() {
		$action = isset( $_REQUEST['action'] ) && 'mbb-export' === $_REQUEST['action'];
		$action2 = isset( $_REQUEST['action2'] ) && 'mbb-export' === $_REQUEST['action2'];

		if ( ( ! $action && ! $action2 ) || empty( $_REQUEST['post'] ) ) {
			return;
		}

		$post_ids = $_REQUEST['post'];

		$query = new WP_Query( [
			'post_type'              => 'meta-box',
			'post__in'               => $post_ids,
			'posts_per_page'         => count( $post_ids ),
			'no_found_rows'          => true,
			'update_post_term_cache' => false,
		] );

		$data = [];
		foreach ( $query->posts as $post ) {
			$data[] = array_merge( (array) $post, [
				'settings' => get_post_meta( $post->ID, 'settings', true ),
				'fields'    => get_post_meta( $post->ID, 'fields', true ),
				'data'     => get_post_meta( $post->ID, 'data', true ),
				'meta_box' => get_post_meta( $post->ID, 'meta_box', true ),
			] );
		}

		$file_name = 'field-groups-exported';
		if ( count( $post_ids ) === 1 ) {
			$data = reset( $data );
			$file_name = $query->posts[0]->post_name;
		}

		$data = json_encode( $data, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT );

		header( 'Content-Type: application/octet-stream' );
		header( "Content-Disposition: attachment; filename=$file_name.json" );
		header( 'Expires: 0' );
		header( 'Cache-Control: must-revalidate' );
		header( 'Pragma: public' );
		header( 'Content-Length: ' . strlen( $data ) );
		echo $data;
		die;
	}

	private function import() {
		// No file uploaded.
		if ( empty( $_FILES['mbb_file'] ) || empty( $_FILES['mbb_file']['tmp_name'] ) ) {
			return;
		}

		$url = admin_url( 'edit.php?post_type=meta-box' );

		// Verify nonce.
		$nonce = filter_input( INPUT_POST, 'nonce' );
		if ( ! wp_verify_nonce( $nonce, 'import' ) ) {
			wp_die( sprintf( __( 'Invalid form submit. <a href="%s">Go back</a>.', 'meta-box-builder' ), $url ) );
		}

		$data = file_get_contents( $_FILES['mbb_file']['tmp_name'] );
		$posts = json_decode( $data, true );
		if ( json_last_error() !== JSON_ERROR_NONE ) {
			wp_die( sprintf( __( 'Invalid file data. <a href="%s">Go back</a>.', 'meta-box-builder' ), $url ) );
		}

		// If import only one post.
		if ( isset( $posts['ID'] ) ) {
			$posts = [ $posts ];
		}

		foreach ( $posts as $post ) {
			unset( $post['ID'] );
			$post_id = wp_insert_post( $post );
			if ( ! $post_id ) {
				wp_die( sprintf( __( 'Cannot import the field group <strong>%s</strong>. <a href="%s">Go back</a>.', 'meta-box-builder' ), $post['post_title'], $url ) );
			}
			if ( is_wp_error( $post_id ) ) {
				wp_die( implode( '<br>', $post_id->get_error_messages() ) );
			}
			update_post_meta( $post_id, 'settings', $post['settings'] );
			update_post_meta( $post_id, 'fields', $post['fields'] );
			update_post_meta( $post_id, 'data', $post['data'] );
			update_post_meta( $post_id, 'meta_box', $post['meta_box'] );
		}

		$url = add_query_arg( 'imported', 'true', $url );
		wp_safe_redirect( $url );
		die;
	}
}
