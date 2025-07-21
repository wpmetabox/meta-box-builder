/**
 * Intercepts the "Add New" button on the Field Groups screen and displays
 * a modal for selecting the mode (Post Submission Form, Custom Fields, or Block).
 */
{
	'use strict';

	const data = window.mbbAddNewModal;
	const hasFrontendSubmission = data.hasFrontendSubmission;
	const hasBlocks = data.hasBlocks;

	// Create modal container
	const modalContainer = document.createElement( 'div' );
	modalContainer.id = 'mbb-add-new-modal';
	modalContainer.style.display = 'none';
	modalContainer.innerHTML = `
		<div class="mbb-modal-overlay">
			<div class="mbb-modal-content">
				<div class="mbb-modal-header">
					<h2>${ data.title }</h2>
					<button type="button" class="mbb-modal-close" aria-label="Close modal">×</button>
				</div>

				<div class="mbb-modal-body">
					<p>${ data.description }</p>

					<div class="mbb-mode-options">
						${ hasFrontendSubmission ? `
							<a href="wp-admin/post-new.php?post_type=meta-box&mode=post-submission-form" class="mbb-mode-option">
								<div class="mbb-mode-icon">
									<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
										<path d="M14 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.89 22 5.99 22H18C19.1 22 20 21.1 20 20V8L14 2Z" stroke="#0073aa" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
										<path d="M14 2V8H20" stroke="#0073aa" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
										<path d="M16 13H8" stroke="#0073aa" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
										<path d="M16 17H8" stroke="#0073aa" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
										<path d="M10 9H9H8" stroke="#0073aa" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
									</svg>
								</div>
								<h3>${ data.postSubmissionForm }</h3>
								<p>${ data.postSubmissionFormDesc }</p>
							</a>
						` : '' }

						<a href="wp-admin/post-new.php?post_type=meta-box&mode=custom-fields" class="mbb-mode-option">
							<div class="mbb-mode-icon">
								<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
									<rect x="3" y="3" width="18" height="18" rx="2" ry="2" stroke="#0073aa" stroke-width="2"/>
									<path d="M9 9H15" stroke="#0073aa" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
									<path d="M9 13H15" stroke="#0073aa" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
									<path d="M9 17H15" stroke="#0073aa" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
								</svg>
							</div>
							<h3>${ data.customFields }</h3>
							<p>${ data.customFieldsDesc }</p>
						</a>

						${ hasBlocks ? `
							<a href="wp-admin/post-new.php?post_type=meta-box&mode=block" class="mbb-mode-option">
								<div class="mbb-mode-icon">
									<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
										<path d="M4 6H20" stroke="#0073aa" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
										<path d="M4 12H20" stroke="#0073aa" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
										<path d="M4 18H20" stroke="#0073aa" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
										<path d="M8 6V18" stroke="#0073aa" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
									</svg>
								</div>
								<h3>${ data.block }</h3>
								<p>${ data.blockDesc }</p>
							</a>
						` : '' }
					</div>
				</div>
			</div>
		</div>
	`;

	// Add modal to page
	document.body.appendChild( modalContainer );

	const closeModal = () => {
		modalContainer.style.display = 'none';
		document.body.style.overflow = '';
	}

	const addNewButton = document.querySelector( '.page-title-action' );
	addNewButton.addEventListener( 'click', e => {
		e.preventDefault();
		modalContainer.style.display = 'block';
		document.body.style.overflow = 'hidden';
	} );

	// Close modal when clicking overlay
	modalContainer.querySelector( '.mbb-modal-overlay' ).addEventListener( 'click', e => {
		if ( e.target === this ) {
			closeModal();
		}
	} );

	modalContainer.querySelector( '.mbb-modal-close' ).addEventListener( 'click', closeModal );

	// Close modal with Escape key
	document.addEventListener( 'keydown', e => {
		if ( e.key === 'Escape' && modalContainer.style.display === 'block' ) {
			closeModal();
		}
	} );

}