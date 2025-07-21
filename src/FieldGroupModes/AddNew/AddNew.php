<?php
namespace MBB\FieldGroupModes\AddNew;

use MBB\Helpers\Data;

class AddNew {
	public function __construct() {
		add_action( 'admin_print_styles-edit.php', [ $this, 'enqueue_assets' ] );
	}

	public function enqueue_assets() {
		if ( ! $this->is_field_groups_list_page() ) {
			return;
		}

		$has_frontend_submission = Data::is_extension_active( 'mb-frontend-submission' );
		$has_blocks              = Data::is_extension_active( 'mb-blocks' );

		wp_enqueue_style( 'mbb-add-new-modal', MBB_URL . 'src/FieldGroupModes/AddNew/modal.css', [], filemtime( __DIR__ . '/modal.css' ) );
		wp_enqueue_script( 'mbb-add-new-modal', MBB_URL . 'src/FieldGroupModes/AddNew/modal.js', [], filemtime( __DIR__ . '/modal.js' ), true );

		$for = [ __( 'post types', 'meta-box-builder' ) ];
		if ( Data::is_extension_active( 'mb-taxonomies' ) ) {
			$for[] = __( 'taxonomies', 'meta-box-builder' );
		}
		if ( Data::is_extension_active( 'mb-user-meta' ) ) {
			$for[] = __( 'users', 'meta-box-builder' );
		}
		if ( Data::is_extension_active( 'mb-settings-pages' ) ) {
			$for[] = __( 'settings pages', 'meta-box-builder' );
		}
		$custom_fields_desc = sprintf( esc_html__( 'Create custom fields for %s.', 'meta-box-builder' ), $this->join_with_or( $for ) );

		wp_localize_script( 'mbb-add-new-modal', 'mbbAddNewModal', [
			'adminUrl'               => admin_url(),
			'hasFrontendSubmission'  => $has_frontend_submission,
			'hasBlocks'              => $has_blocks,
			'title'                  => esc_html__( 'Select Mode', 'meta-box-builder' ),
			'description'            => esc_html__( 'Choose how you want to create your field group:', 'meta-box-builder' ),
			'postSubmissionForm'     => esc_html__( 'Post Submission Form', 'meta-box-builder' ),
			'postSubmissionFormDesc' => esc_html__( 'Create a form for users to submit posts from the frontend.', 'meta-box-builder' ),
			'customFields'           => esc_html__( 'Custom Fields', 'meta-box-builder' ),
			'customFieldsDesc'       => $custom_fields_desc,
			'block'                  => esc_html__( 'Block', 'meta-box-builder' ),
			'blockDesc'              => esc_html__( 'Create a custom Gutenberg block with custom fields.', 'meta-box-builder' ),
		] );
	}

	private function is_field_groups_list_page(): bool {
		$screen = get_current_screen();
		return $screen && $screen->id === 'edit-meta-box';
	}

	private function join_with_or( array $items ): string {
		$count = count( $items );

		if ( $count === 0 ) {
			return '';
		}

		if ( $count === 1 ) {
			return $items[0];
		}

		if ( $count === 2 ) {
			return $items[0] . ' ' . __( 'or', 'meta-box-builder' ) . ' ' . $items[1];
		}

		$last = array_pop( $items );
		return implode( ', ', $items ) . ' ' . __( 'or', 'meta-box-builder' ) . ' ' . $last;
	}
}
