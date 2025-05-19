import { fetcher } from './functions';
import { lists } from './list-functions';

export const initSaveForm = () => {
	const form = document.getElementById( 'post' );
	if ( !form ) {
		return;
	}

	form.addEventListener( 'submit', async ( e ) => {
		e.preventDefault(); // Prevent default form submission

		const submitButton = e.submitter;
		if ( !submitButton ) {
			return;
		}

		submitButton.disabled = true;
		const originalText = submitButton.value;
		submitButton.value = MbbApp.saving;

		// Build fields tree similar to useAllFieldsTree
		const buildFieldsTree = () => {
			// Get all root fields first
			const rootFields = lists.has( 'root' )
				? [ ...lists.get( 'root' ).getState().fields ]
				: [];

			// Process each field to include sub-fields for groups
			const processField = ( field ) => {
				// Deep clone the field to avoid reference issues
				const processedField = { ...field };

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

		// Get form data for other fields
		const formData = new FormData( form );
		const settings = {};
		const data = {};

		// Extract settings and data from form
		for ( const [ key, value ] of formData.entries() ) {
			if ( key.startsWith( 'settings[' ) ) {
				const settingKey = key.replace( 'settings[', '' ).replace( /\].*$/, '' );
				settings[ settingKey ] = value;
			} else if ( key.startsWith( 'data[' ) ) {
				const dataKey = key.replace( 'data[', '' ).replace( /\].*$/, '' );
				data[ dataKey ] = value;
			}
		}

		// Send AJAX request
		const response = await fetcher( 'save', {
			post_id: document.querySelector( '#post_ID' ).value,
			post_title: document.querySelector( '#post_title' ).value,
			post_name: document.querySelector( '#post_name' ).value,
			post_status: submitButton.dataset.status,
			fields,
			settings,
			data,
		}, 'POST' );

		submitButton.disabled = false;
		submitButton.value = originalText;

		if ( !response.success ) {
			alert( response.message );
		}
	} );
};
