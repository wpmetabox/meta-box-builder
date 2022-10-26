import { useEffect } from "@wordpress/element";
import dotProp from "dot-prop";
import useApi from "../../hooks/useApi";
import useFieldIds from "../../hooks/useFieldIds";
import useFields from "../../hooks/useFields";
import ThemeCode from "./CodeTypes/ThemeCode";

const mergeInGroup = ( fields ) => {
	let allFields = Object.assign( {}, fields );
	Object.entries( fields ).map( ( field ) => {
		if ( field[ 1 ].type !== 'group' || field[ 1 ].fields === undefined || field[ 1 ].fields.length === 0 ) {
			return;
		}

		const group = Object.values( field[ 1 ][ 'fields' ] ).find( attr => attr.type === 'group' );
		if ( group !== undefined ) {
			allFields = Object.assign( allFields, mergeInSubGroup( allFields, group ) );
		}

		delete allFields[ field[ 1 ]._id ];
		allFields = Object.assign( allFields, field[ 1 ].fields );
	} );
	return allFields;
};

const mergeInSubGroup = ( allFields, group ) => {
	allFields = Object.assign( allFields, group.fields );
	delete allFields[ group._id ];

	const subGroup = Object.values( group.fields ).find( attr => attr.type === 'group' );
	if ( subGroup !== undefined ) {
		allFields = Object.assign( allFields, mergeInSubGroup( allFields, subGroup ) );
	}

	return allFields;
};

const Codes = ( props ) => {
	const { fields } = useFields( props.fields, 'fields' );
	const fieldIds = useFieldIds( state => state.ids );
	//Not empty fields
	if ( fields.length === 0 || fieldIds.length === 0 ) return '';

	//merge all fields in group
	const allFields = mergeInGroup( fields );
	const listFields = Object.values( allFields );

	// Show code add new field.  
	useEffect( () => {
		if ( listFields.length > 0 ) {
			const last_field = listFields[ listFields.length - 1 ];
			let timmer = setInterval( () => {
				if ( last_field.name === '' && jQuery( `#fields-${ last_field._id }-name` ).length > 0 ) {
					jQuery( `.og-tab-panel--theme-code .og-result span[item_id="${ last_field._id }"]` ).text( jQuery( `#fields-${ last_field._id }-name` ).val() );
					clearInterval( timmer );
				}

				return () => clearInterval( timmer );
			}, 200 );
		}
	}, [ listFields ] );
	//End Show code add new field.

	//Generate Code
	const themeCode = useApi( [ 'theme-code-generate', {
		fields: JSON.stringify( listFields ),
		settings: JSON.stringify( props.settings )
	}, 'POST' ] );

	return (
		<>
			{ listFields.length > 0 &&
				listFields.map( ( field, index ) => (
					<div key={ `code_${ field._id }` } className="og-result">
						<div className="og-item__header og-collapsible__header">
							<span id={ `code-item-title-${ field._id }` } item_id={ field._id } className="og-item__title">{ field.name }</span>
						</div>
						<div className="og-result__body">
							<ThemeCode codeValue={ dotProp.get( themeCode, `${ index }.theme_code` ) } />
						</div>
					</div>
				) )
			}
		</>
	);
};

export default Codes;
