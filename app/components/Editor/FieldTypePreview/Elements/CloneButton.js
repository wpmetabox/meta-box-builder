import { __ } from "@wordpress/i18n";
import getList from "../../../../list-functions";

export default ( { field } ) => {
	if ( !field.clone ) {
		return;
	}

	// Do not show the clone button if the group has no subfields.
	if ( field.type === 'group' ) {
		const fields = getList( field._id )( state => state.fields );
		if ( fields.length === 0 ) {
			return;
		}
	}

	return <a href="#" className="rwmb-button button add-clone">{ field.add_button || __( '+ Add more', 'meta-box-builder' ) }</a>;
};