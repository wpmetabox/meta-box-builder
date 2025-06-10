import { fetcher } from './functions';
import useSettings from './hooks/useSettings';
import { lists } from './list-functions';

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
		submitButton.value = MbbApp.texts.saving;

		// Build fields tree similar to useAllFieldsTree
		const buildFieldsTree = () => {
			// Get all root fields first
			const rootFields = lists.has( 'root' )
				? [ ...lists.get( 'root' ).getState().fields ]
				: [];

			// Process each field to include sub-fields for groups
			const processField = field => {
				// Deep clone the field to avoid reference issues
				const processedField = { ...field };

				// Temporary keys used in the builder.
				delete processedField._new;
				delete processedField._active;
				delete processedField._id_changed;

				// Temporary keys used by SortableJS.
				delete processedField.chosen;
				delete processedField.selected;

				// If it's a group field, get its sub-fields
				if ( field.type === 'group' && lists.has( field._id ) ) {
					processedField.fields = lists.get( field._id ).getState().fields.map( processField );
				}

				return processedField;
			};

			// Process all root fields
			return rootFields.map( processField );
		};

		// Get hierarchical fields
		const fields = buildFieldsTree();

		// Get settings from useSettings store
		const settings = useSettings.getState().settings;

		const status = submitButton.dataset.status;

		try {
			// Send AJAX request
			const response = await fetcher( 'save', {
				post_id: document.querySelector( '#post_ID' ).value,
				post_title: document.querySelector( '#post_title' ).value,
				post_name: document.querySelector( '#post_name' ).value,
				post_status: status,
				fields,
				settings,
			}, 'POST' );

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
			console.error( 'Error saving form:', error );
			alert( MbbApp.texts.saveError );
		} finally {
			// Always re-enable the submit button
			submitButton.disabled = false;
		}
	} );
};
