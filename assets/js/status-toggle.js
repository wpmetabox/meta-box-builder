jQuery( function ( $ ) {
	// Back can check the wrong switch. Put each one back to the status from the server.
	const restoreStatus = () => {
		$( '.rwmb-switch[data-status]' ).each( ( _, input ) => {
			input.checked = input.dataset.status === 'publish';
		} );
	};

	$( document ).on( 'change', '.rwmb-switch[data-status]', event => {
		// Ignore the change Back fires while restoring the form.
		if ( ! event.originalEvent || ! event.originalEvent.isTrusted ) {
			return;
		}

		const input = event.currentTarget;
		// The response can arrive after another click or after Back restores the form.
		const checked = input.checked;
		input.disabled = true;

		$.post( ajaxurl, {
			action: 'mbb_toggle_status',
			post_id: input.dataset.id,
			checked,
			_ajax_nonce: mbbStatusToggle.nonce,
		} ).done( response => {
			if ( ! response.success ) {
				input.checked = ! checked;
				alert( response.data.message );
				return;
			}

			input.checked = checked;
			input.dataset.status = checked ? 'publish' : 'draft';
		} ).fail( () => {
			input.checked = ! checked;
		} ).always( () => {
			input.disabled = false;
		} );
	} );

	window.addEventListener( 'pageshow', () => {
		restoreStatus();
		window.setTimeout( restoreStatus, 0 );
	} );
} );
