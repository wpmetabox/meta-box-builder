import { useContext, useEffect } from "@wordpress/element";
import dotProp from "dot-prop";
import { FieldIdsContext } from "../../contexts/FieldIdsContext";
import { FieldsDataContext } from "../../contexts/FieldsDataContext";
import ThemeCode from "./CodeTypes/ThemeCode";

const merge_in_group = ( fields ) => {
	let all_fields = Object.assign( {}, fields );
	Object.entries( fields ).map( ( field ) => {
		if ( field[ 1 ].type !== 'group' || field[ 1 ].fields === undefined || field[ 1 ].fields.length === 0 ) {
			return;
		}

		const group = Object.values( field[ 1 ][ 'fields' ] ).find( attr => attr.type === 'group' )
		if ( group !== undefined ) {
			all_fields = Object.assign( all_fields, merge_in_sub_group( all_fields, group ) );
		}

		delete all_fields[field[ 1 ]._id];
		all_fields = Object.assign( all_fields, field[ 1 ].fields );
	} );
	return all_fields;
};

const merge_in_sub_group = ( all_fields, group ) => {
	all_fields = Object.assign( all_fields, group.fields );
	delete all_fields[ group._id ];

	const sub_group = Object.values( group.fields ).find( attr => attr.type === 'group' );
	if ( sub_group !== undefined ) {
		all_fields = Object.assign( all_fields, merge_in_sub_group( all_fields, sub_group ) );
	}	

	return all_fields;
};

const Codes = ( props ) => {
	let fields = [];

	const { fieldTypes, fieldCategories } = useContext( FieldsDataContext );
	if ( Object.keys( fieldTypes ).length !== 0 && fieldCategories.length !== 0 ) {
		const { fieldIds } = useContext( FieldIdsContext );
		
		//merge all fields in group
		const all_fields = merge_in_group( props.fields )

		fields = Object.entries( fieldIds ).map( ( [ _id, id ] ) => {
			let name = dotProp.get( all_fields, `${ _id }.name`, '' );
			return { _id, id, name };
		} );

		// Show code add new field.  
		useEffect( () => {
			if ( fields.length > 0 ) {
				const last_field = fields[ fields.length - 1 ];

				let timmer = setInterval( () => {
					if ( last_field.name === '' && jQuery( `#fields-${ last_field._id }-name` ).length > 0 ) {
						jQuery( `.og-tab-panel--theme-code .og-result span[item_id="${ last_field._id }"]` ).text( jQuery( `#fields-${ last_field._id }-name` ).val() );
						clearInterval( timmer );
					}

					return () => clearInterval( timmer );
				}, 200 );
			}
		}, [ fields ] );
		//End Show code add new field.
	}

	return (
		<>
			{ fields.length > 0 &&
				fields.map( ( field, index ) => (
					<div key={ `code_${ field._id }` } className="og-result">
						<div className="og-item__header og-collapsible__header">
							<span id={ `code-item-title-${ field._id }` } item_id={ field._id } className="og-item__title">{ field.name }</span>
						</div>
						<div className="og-result__body">
							<ThemeCode field={ field } />
						</div>
					</div>
				) )
			}
		</>
	);
};

export default Codes;
