import { fetcher } from '../../../../app/hooks/useFetch';
import useSettings from '../../../../app/hooks/useSettings';

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

		const status = submitButton.dataset.status;

		try {
			// Send AJAX request
			const response = await fetcher( {
				api: 'settings-page/save',
				params: {
					post_id: document.querySelector( '#post_ID' ).value,
					post_title: document.querySelector( '#post_title' ).value,
					post_status: status,
					settings,
				},
				method: 'POST'
			} );

			if ( !response.success ) {
				alert( response.message );
				return;
			}

			window.mbbShowNotification?.();

			// Update button texts based on new status.
			const draftButton = document.querySelector( '[data-status="draft"]' );
			const publishButton = document.querySelector( '[data-status="publish"]' );

			draftButton.value = status === 'publish' ? MbbApp.texts.switchToDraft : MbbApp.texts.saveDraft;
			publishButton.value = status === 'publish' ? MbbApp.texts.update : MbbApp.texts.publish;
		} catch ( error ) {
			let message = error.message;

			// Show error message for post title only.
			if ( error.data?.details && ! Array.isArray( error.data?.details ) ) {
				message = Object.values( error.data?.details ).map( item => item.message ).join( "\n" );
			}

			alert( message );

			// Reset the submit button text.
			submitButton.value = currentText;
		} finally {
			// Always re-enable the submit button
			submitButton.disabled = false;
		}
	} );
};
