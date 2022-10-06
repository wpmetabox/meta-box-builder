import { Data } from "./Data";

export const AdminColumnsData = () => {
	let value = jQuery( document ).find( '#settings-object_type' ).val();
	jQuery( document ).on( 'change', '#settings-object_type', function() {
		value = jQuery( this ).val();
	} );

	if ( value == 'term' ) {
		return (
			<Data id="admin-columns">
				<option value="cb" />
				<option value="name" />
				<option value="description" />
				<option value="slug" />
				<option value="count" />
			</Data>
		);
	}

	if ( value == 'user' ) {
		return (
			<Data id="admin-columns">
				<option value="cb" />
				<option value="username" />
				<option value="name" />
				<option value="email" />
				<option value="role" />
				<option value="posts" />
			</Data>
		);
	}

	return (
		<Data id="admin-columns">
			<option value="cb" />
			<option value="title" />
			<option value="author" />
			<option value="categories" />
			<option value="tags" />
			<option value="comments" />
			<option value="date" />
		</Data>
	);
};