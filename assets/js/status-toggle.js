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

		$.post( ajaxurl, {
			action: 'mbb_toggle_status',
			post_id: input.dataset.id,
			checked: input.checked,
			_ajax_nonce: mbbStatusToggle.nonce,
		}, response => {
			if ( ! response.success ) {
				input.checked = input.dataset.status === 'publish';
				alert( response.data.message );
				return;
			}

			input.dataset.status = input.checked ? 'publish' : 'draft';
		} );
	} );

	window.addEventListener( 'pageshow', () => {
		restoreStatus();
		window.setTimeout( restoreStatus, 0 );
	} );
} );
