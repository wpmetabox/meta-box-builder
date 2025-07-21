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
					<button type="button" class="mbb-modal-close">
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" aria-hidden="true" focusable="false"><path d="m13.06 12 6.47-6.47-1.06-1.06L12 10.94 5.53 4.47 4.47 5.53 10.94 12l-6.47 6.47 1.06 1.06L12 13.06l6.47 6.47 1.06-1.06L13.06 12Z"></path></svg>
					</button>
				</div>

				<div class="mbb-modal-body">
					<p>${ data.description }</p>

					<div class="mbb-mode-options">
						<a href="${ data.adminUrl }post-new.php?post_type=meta-box&mode=custom-fields" class="mbb-mode-option">
							<div class="mbb-mode-icon">
								<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false"><path d="M6 5.5h3a.5.5 0 01.5.5v3a.5.5 0 01-.5.5H6a.5.5 0 01-.5-.5V6a.5.5 0 01.5-.5zM4 6a2 2 0 012-2h3a2 2 0 012 2v3a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm11-.5h3a.5.5 0 01.5.5v3a.5.5 0 01-.5.5h-3a.5.5 0 01-.5-.5V6a.5.5 0 01.5-.5zM13 6a2 2 0 012-2h3a2 2 0 012 2v3a2 2 0 01-2 2h-3a2 2 0 01-2-2V6zm5 8.5h-3a.5.5 0 00-.5.5v3a.5.5 0 00.5.5h3a.5.5 0 00.5-.5v-3a.5.5 0 00-.5-.5zM15 13a2 2 0 00-2 2v3a2 2 0 002 2h3a2 2 0 002-2v-3a2 2 0 00-2-2h-3zm-9 1.5h3a.5.5 0 01.5.5v3a.5.5 0 01-.5.5H6a.5.5 0 01-.5-.5v-3a.5.5 0 01.5-.5zM4 15a2 2 0 012-2h3a2 2 0 012 2v3a2 2 0 01-2 2H6a2 2 0 01-2-2v-3z" fill-rule="evenodd" clip-rule="evenodd"></path></svg>
							</div>
							<h3>${ data.customFields }</h3>
							<p>${ data.customFieldsDesc }</p>
						</a>

						${ hasFrontendSubmission ? `
							<a href="${ data.adminUrl }post-new.php?post_type=meta-box&mode=post-submission-form" class="mbb-mode-option">
								<div class="mbb-mode-icon">
									<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M19 3H5c-.6 0-1 .4-1 1v7c0 .5.4 1 1 1h14c.5 0 1-.4 1-1V4c0-.6-.4-1-1-1zM5.5 10.5v-.4l1.8-1.3 1.3.8c.3.2.7.2.9-.1L11 8.1l2.4 2.4H5.5zm13 0h-2.9l-4-4c-.3-.3-.8-.3-1.1 0L8.9 8l-1.2-.8c-.3-.2-.6-.2-.9 0l-1.3 1V4.5h13v6zM4 20h9v-1.5H4V20zm0-4h16v-1.5H4V16z"></path></svg>
								</div>
								<h3>${ data.postSubmissionForm }</h3>
								<p>${ data.postSubmissionFormDesc }</p>
							</a>
						` : '' }

						${ hasBlocks ? `
							<a href="${ data.adminUrl }post-new.php?post_type=meta-box&mode=block" class="mbb-mode-option">
								<div class="mbb-mode-icon">
									<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M19 8h-1V6h-5v2h-2V6H6v2H5c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-8c0-1.1-.9-2-2-2zm.5 10c0 .3-.2.5-.5.5H5c-.3 0-.5-.2-.5-.5v-8c0-.3.2-.5.5-.5h14c.3 0 .5.2.5.5v8z"></path></svg>
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