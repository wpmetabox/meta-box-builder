import { useContext } from "@wordpress/element";
import { FieldIdsContext } from '/contexts/FieldIdsContext';

export const AdminColumnsData = () => {
	const { fieldIds } = useContext( FieldIdsContext );
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
				{ Object.entries( fieldIds ).map( ( [ id, field ] ) => <option key={ id } value={ field.id } /> ) }
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
				{ Object.entries( fieldIds ).map( ( [ id, field ] ) => <option key={ id } value={ field.id } /> ) }
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
				{ Object.entries( fieldIds ).map( ( [ id, field ] ) => <option key={ id } value={ field.id } /> ) }
			</datalist>
		);
	}
};