<?php
namespace MBB\AddNewFieldGroup;

use MBB\Helpers\Data;

class AddNewFieldGroup {
	public function __construct() {
		add_action( 'admin_print_styles-edit.php', [ $this, 'enqueue_assets' ] );
	}

	public function enqueue_assets() {
		if ( ! $this->is_field_groups_list_page() ) {
			return;
		}

		$has_frontend_submission = Data::is_extension_active( 'mb-frontend-submission' );
		$has_blocks = Data::is_extension_active( 'mb-blocks' );

		// If neither extension is active, don't show the modal
		if ( ! $has_frontend_submission && ! $has_blocks ) {
			return;
		}

		wp_enqueue_style( 'mbb-add-new-modal', MBB_URL . 'src/AddNewFieldGroup/modal.css', [], MBB_VER );
		wp_enqueue_script( 'mbb-add-new-modal', MBB_URL . 'src/AddNewFieldGroup/modal.js', [], MBB_VER, true );

		wp_localize_script( 'mbb-add-new-modal', 'mbbAddNewModal', [
			'hasFrontendSubmission' => $has_frontend_submission,
			'hasBlocks'             => $has_blocks,
			'title'                 => esc_html__( 'Select Mode', 'meta-box-builder' ),
			'description'           => esc_html__( 'Choose how you want to create your field group:', 'meta-box-builder' ),
			'postSubmissionForm'    => esc_html__( 'Post Submission Form', 'meta-box-builder' ),
			'postSubmissionFormDesc'=> esc_html__( 'Create a form for users to submit posts from the frontend.', 'meta-box-builder' ),
			'customFields'          => esc_html__( 'Custom Fields', 'meta-box-builder' ),
			'customFieldsDesc'      => esc_html__( 'Create custom fields for your post types, taxonomies, users, or settings pages.', 'meta-box-builder' ),
			'block'                 => esc_html__( 'Block', 'meta-box-builder' ),
			'blockDesc'             => esc_html__( 'Create a custom block with custom fields.', 'meta-box-builder' ),
		] );
	}

	private function is_field_groups_list_page(): bool {
		$screen = get_current_screen();
		return $screen && $screen->id === 'edit-meta-box';
	}
}