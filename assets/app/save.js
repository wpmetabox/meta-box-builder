import { fetcher } from './hooks/useFetch';
import useSettings from './hooks/useSettings';
import { buildFieldsTree } from './list-functions';

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

		// Get hierarchical fields
		const fields = buildFieldsTree();

		// Get settings from useSettings store
		const settings = useSettings.getState().settings;

		const status = submitButton.dataset.status;

		try {
			// Send AJAX request
			const response = await fetcher( {
				api: 'save',
				params: {
					post_id: document.querySelector( '#post_ID' ).value,
					post_title: document.querySelector( '#post_title' ).value,
					post_name: document.querySelector( '#post_name' ).value,
					post_status: status,
					fields,
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

			// Update status text.
			document.querySelector( '#post_status' ).textContent = status === 'publish' ? MbbApp.texts.published : MbbApp.texts.draft;
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
