import { fetcher } from '../../../../assets/app/hooks/useFetch';
import useSettings from '../../../../assets/app/hooks/useSettings';

export const initSaveForm = () => {
	const form = document.getElementById( 'post' );
	if ( !form ) {
		return;
	}

	form.addEventListener( 'submit', async e => {
		e.preventDefault(); // Prevent default form submission

		const submitButton = e.submitter;
		if ( !submitButton ) {
			return;
		}

		submitButton.disabled = true;
		const currentText = submitButton.value;
		submitButton.value = MbbApp.texts.saving;

		// Get settings from useSettings store
		const settings = useSettings.getState().settings;

		try {
			// Send AJAX request
			const response = await fetcher( {
				api: 'settings-page/save',
				params: {
					post_id: document.querySelector( '#post_ID' ).value,
					post_title: document.querySelector( '#post_title' ).value,
					settings,
				},
				method: 'POST'
			} );

			if ( !response.success ) {
				alert( response.message );
				return;
			}

			window.mbbShowNotification?.();
		} catch ( error ) {
			let message = error.message;

			// Show error message for post title only.
			if ( error.data?.details && ! Array.isArray( error.data?.details ) ) {
				message = Object.values( error.data?.details ).map( item => item.message ).join( "\n" );
			}

			alert( message );
		} finally {
			submitButton.value = currentText;
			submitButton.disabled = false;
		}
	} );
};
