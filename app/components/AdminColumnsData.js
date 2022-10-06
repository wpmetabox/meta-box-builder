import { useFieldIdsStore } from "../contexts/FieldIdsContext";

export const AdminColumnsData = () => {
	const fieldIds = useFieldIdsStore( state => state.fieldIds );
	let value = jQuery( document ).find( '#settings-object_type' ).val();
	jQuery( document ).on( 'change', '#settings-object_type', function() {
		value = jQuery( this ).val();
	} );
	if ( value == 'term' ) {
		return (
			<datalist id="admin-columns">
				<option value="cb" />
				<option value="name" />
				<option value="description" />
				<option value="slug" />
				<option value="count" />
				{ Object.entries( fieldIds ).map( ( [ id, fieldId ] ) => <option key={ id } value={ fieldId } /> ) }
			</datalist>
		);
	} else if ( value == 'user' ) {
		return (
			<datalist id="admin-columns">
				<option value="cb" />
				<option value="username" />
				<option value="name" />
				<option value="email" />
				<option value="role" />
				<option value="posts" />
				{ Object.entries( fieldIds ).map( ( [ id, fieldId ] ) => <option key={ id } value={ fieldId } /> ) }
			</datalist>
		);
	} else {
		return (
			<datalist id="admin-columns">
				<option value="cb" />
				<option value="title" />
				<option value="author" />
				<option value="categories" />
				<option value="tags" />
				<option value="comments" />
				<option value="date" />
				{ Object.entries( fieldIds ).map( ( [ id, fieldId ] ) => <option key={ id } value={ fieldId } /> ) }
			</datalist>
		);
	}
};