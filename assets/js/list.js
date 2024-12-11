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
} );