<?php
namespace MBB\Extensions\Relationships;

use MBB\BaseEditPage;
use MBB\Helpers\Data;

class Edit extends BaseEditPage {
	public function __construct( $post_type, $slug_meta_box_title ) {
		parent::__construct( $post_type, $slug_meta_box_title );

		add_action( 'admin_head', [ $this, 'admin_head' ] );
		add_action( 'admin_notices', [ $this, 'admin_notices' ], 1 );
	}

	/**
	 * Hide the default WordPress elements. Use `admin_head` to make the CSS apply immediately.
	 */
	public function admin_head(): void {
		if ( get_current_screen()->id !== $this->post_type ) {
			return;
		}
		?>
		<style>
			#post-body { display: none; }
		</style>
		<?php
	}

	public function admin_notices(): void {
		if ( get_current_screen()->id !== $this->post_type ) {
			return;
		}

		// Remove all other notices from other plugins.
		remove_all_actions( 'admin_notices' );
	}

	/**
	 * Override the parent method to remove the meta box for ID (post_name) and option_name.
	 *
	 * @param array $meta_boxes
	 *
	 * @return array
	 */
	public function add_meta_boxes( $meta_boxes ) {
		return $meta_boxes;
	}

	public function enqueue() {
		wp_enqueue_style( 'mbb-app', MBB_URL . 'assets/css/style.css', [ 'wp-components', 'code-editor' ], filemtime( MBB_DIR . 'assets/css/style.css' ) );

		wp_enqueue_style(
			'mb-relationships-app',
			MBB_URL . 'src/Extensions/Relationships/css/relationships.css',
			[ 'wp-components', 'code-editor' ],
			filemtime( MBB_DIR . 'src/Extensions/Relationships/css/relationships.css' )
		);

		wp_enqueue_code_editor( [ 'type' => 'application/x-httpd-php' ] );

		$asset = require __DIR__ . "/build/relationships.asset.php";

		// Add extra JS libs for copy code to clipboard & block color picker.
		$asset['dependencies'] = array_merge( $asset['dependencies'], [ 'jquery', 'clipboard', 'code-editor' ] );
		wp_enqueue_script(
			'mb-relationships-app',
			MBB_URL . 'src/Extensions/Relationships/build/relationships.js',
			$asset['dependencies'],
			$asset['version'],
			true
		);

		$post = get_post();

		$data = [
			'adminUrl'      => admin_url(),
			'url'           => admin_url( 'edit.php?post_type=' . get_current_screen()->id ),
			'status'        => $post->post_status,
			'title'         => $post->post_title,

			'post_types' => $this->get_post_types(),
			'taxonomies' => $this->get_taxonomies(),
			'object_types' => $this->get_object_type_options(),

			'settings' => get_post_meta( get_the_ID(), 'settings', true ),

			'texts' => [
				'saving'        => __( 'Saving...', 'meta-box-builder' ),
				'switchToDraft' => __( 'Switch to draft', 'meta-box-builder' ),
				'saveDraft'     => __( 'Save draft', 'meta-box-builder' ),
				'update'        => __( 'Update', 'meta-box-builder' ),
				'publish'       => __( 'Publish', 'meta-box-builder' ),
				'draft'         => __( 'Draft', 'meta-box-builder' ),
				'published'     => __( 'Published', 'meta-box-builder' ),
				'saveError'     => __( 'Error saving form. Please try again.', 'meta-box-builder' ),
			],
		];

		wp_localize_script( 'mb-relationships-app', 'MbbApp', $data );
	}

	/**
	 * Do nothing to save because saving is handled via REST API.
	 * @see Save.php and save.js
	 */
	public function save( $post_id, $post ) {
	}

	private function get_post_types(): array {
		$post_types = Data::get_post_types();
		$options    = [];
		foreach ( $post_types as $post_type ) {
			$options[ $post_type['slug'] ] = sprintf( '%s (%s)', $post_type['name'], $post_type['slug'] );
		}
		return $options;
	}

	private function get_taxonomies(): array {
		$taxonomies = Data::get_taxonomies();
		$options    = [];
		foreach ( $taxonomies as $taxonomy ) {
			$options[ $taxonomy['slug'] ] = sprintf( '%s (%s)', $taxonomy['name'], $taxonomy['slug'] );
		}
		return $options;
	}

	private function get_object_type_options(): array {
		$options         = [];
		$options['post'] = __( 'Post', 'meta-box-builder' );
		if ( Data::is_extension_active( 'mb-term-meta' ) ) {
			$options['term'] = __( 'Term', 'meta-box-builder' );
		}
		if ( Data::is_extension_active( 'mb-user-meta' ) ) {
			$options['user'] = __( 'User', 'meta-box-builder' );
		}
		return $options;
	}
}
