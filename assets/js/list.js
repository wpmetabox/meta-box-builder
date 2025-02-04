jQuery( $ => {
	// Add "Export" option to the Bulk Actions dropdowns.
	$( '<option value="mbb-export">' )
		.text( MBB.export )
		.appendTo( 'select[name="action"], select[name="action2"]' );

	// Toggle upload form.
	var $form = $( $( '#mbb-import-form' ).html() ).insertAfter( '.wp-header-end' );
	var $toggle = $( '<button class="page-title-action">' )
		.text( MBB.import )
		.insertAfter( '.page-title-action' );

	$toggle.on( 'click', e => {
		e.preventDefault();
		$form.toggle();
	} );

	// Enable submit button when selecting a file.
	const $input = $form.find( 'input[type="file"]' ),
		$submit = $form.find( 'input[type="submit"]' );

	$input.on( 'change', () => {
		$submit.prop( 'disabled', ! $input.val() );
	} );

	// Dialog for diff
	document.getElementById( 'mbb-diff-dialog-close' ).addEventListener( 'click', () => {
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

	// AJAX action to run sync
	document.querySelectorAll( '.button-sync' ).forEach( buttonSync => {
		buttonSync.addEventListener( 'click', async (e) => {
			e.preventDefault();
			const previousText = buttonSync.textContent;

			// Set the button to loading state
			buttonSync.classList.add( 'loading' );
			buttonSync.disabled = true;
			buttonSync.textContent = 'Syncing...';

			const data = await wp.apiFetch( { 
				path: '/mbb/set-json-data',
				method: 'PUT',
				data: {
					id: buttonSync.dataset.id,
					use: buttonSync.dataset.use,
				}
			} );

			if ( data.success ) {
				const templateSyncSuccess = document.querySelector('#sync-success').content.cloneNode(true);

				// Update the diff section
				document.querySelector('.mbb-diff-dialog-content').innerHTML = templateSyncSuccess.querySelector('div').innerHTML;
				
				// Update status of current row sync to synced
				const label = document.querySelector(`.mbb-label[data-for-id="${buttonSync.dataset.id}"]`);
				label.textContent = 'Synced';
				label.dataset.status = 'synced';
			}
			// Run the sync

			// Reset the button
			buttonSync.classList.remove( 'loading' );
			buttonSync.disabled = false;
			buttonSync.textContent = previousText;
		} );
	} );

} );