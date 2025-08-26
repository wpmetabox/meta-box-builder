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

		try {
			// Send AJAX request
			const response = await fetcher( {
				api: 'save',
				params: {
					post_id: document.querySelector( '#post_ID' ).value,
					post_title: document.querySelector( '#post_title' ).value,
					post_name: document.querySelector( '#post_name' ).textContent,
					fields,
					settings,
				},
				method: 'POST'
			} );

			if ( !response.success ) {
				alert( response.message );
				return;
			}

			// Mark changes as saved to prevent unsaved changes warning
			window.mbbMarkAsSaved?.();

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
		}
	} );
};
