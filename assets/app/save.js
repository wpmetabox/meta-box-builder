import { __, _n, sprintf } from '@wordpress/i18n';
import { fetcher } from './hooks/useFetch';
import useModelSchema from './hooks/useModelSchema';
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

		const { missingFieldIds, schemaSource } = useModelSchema.getState();
		const missingCount = missingFieldIds.length;
		if ( missingCount > 0 ) {
			const tableLabel = schemaSource === 'custom_table'
				? __( 'custom table', 'meta-box-builder' )
				: __( 'model table', 'meta-box-builder' );
			const confirmed = window.confirm(
				sprintf(
					/* translators: %1$d: number of field IDs, %2$s: table type (model table / custom table) */
					_n(
						'%1$d field ID does not match the %2$s. It will be added as a TEXT column. Do you want to save?',
						'%1$d field IDs do not match the %2$s. They will be added as TEXT columns. Do you want to save?',
						missingCount,
						'meta-box-builder'
					),
					missingCount,
					tableLabel
				)
			);
			if ( ! confirmed ) {
				return;
			}
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
				method: 'POST',
				cache: false,
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
			// Mark changes as saved to prevent unsaved changes warning
			window.mbbMarkAsSaved?.();

			submitButton.value = currentText;
		}
	} );
};
