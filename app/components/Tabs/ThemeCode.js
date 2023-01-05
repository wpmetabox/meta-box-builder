import { useEffect, useState } from "@wordpress/element";
import { htmlDecode } from "../../functions";
import useApi from "../../hooks/useApi";
import useFieldIds from "../../hooks/useFieldIds";
import useFields from "../../hooks/useFields";
import Content from "./ThemeCodeTab/Content";

const $ = jQuery;

const mergeInGroup = ( fields ) => {
	let allFields = fields;
	Object.entries( fields ).map( ( field ) => {
		if ( field[ 1 ].type !== 'group' || field[ 1 ].fields === undefined || field[ 1 ].fields.length === 0 ) {
			return;
		}

		const group = Object.values( field[ 1 ][ 'fields' ] ).find( attr => attr.type === 'group' );
		if ( group !== undefined ) {
			allFields = { ...allFields, ...mergeInSubGroup( allFields, group ) };
		}

		delete allFields[ field[ 1 ]._id ];
		allFields = { ...allFields, ...field[ 1 ].fields };
	} );
	return allFields;
};

const mergeInSubGroup = ( allFields, group ) => {
	allFields = { ...allFields, ...group.fields };
	delete allFields[ group._id ];

	const subGroup = Object.values( group.fields ).find( attr => attr.type === 'group' );
	if ( subGroup !== undefined ) {
		allFields = { ...allFields, ...mergeInSubGroup( allFields, subGroup ) };
	}

	return allFields;
};

const Codes = ( props ) => {
	const { fields } = useFields( props.fields, 'fields' );
	const fieldIds = useFieldIds( state => state.ids );

	// No fields?
	if ( fields.length === 0 || fieldIds.length === 0 ) {
		return '';
	}

	// Merge all fields in group.
	const allFields = mergeInGroup( fields );
	const listFields = Object.values( allFields );

	// Show list of field names in the left tabs.
	useEffect( () => {
		let timer = null;
		if ( listFields.length > 0 ) {
			const lastField = listFields[ listFields.length - 1 ];
			timer = setInterval( () => {
				const $nameElement = $( `#fields-${ lastField._id }-name` );
				if ( lastField.name === '' && $nameElement.length > 0 ) {
					$( `#og-theme-code__item-name--${ lastField._id }` ).text( $nameElement.val() );
					clearInterval( timer );
				}

				return () => clearInterval( timer );
			}, 200 );
		}

		return timer != undefined && timer != null ? clearInterval( timer ) : '';
	}, [ fieldIds ] );

	// Generate Code
	const themeCode = useApi( [ 'theme-code-generate', {
		fields: JSON.stringify( listFields ),
		settings: JSON.stringify( props.settings )
	}, 'POST' ] );

	const [ tab, setTab ] = useState( 0 );

	if ( themeCode === undefined || themeCode.length === 0 ) {
		return '';
	}

	return (
		<>
			<div className="og-theme-code__header">
				{
					themeCode.map( ( field, index ) => (
						<span
							key={ `header_${ field._id }` }
							onClick={ () => setTab( index ) }
							id={ `og-theme-code__item-name--${ field._id }` }
							item_id={ field._id }
							className={ `og-theme-code__item-name ${ tab === index ? 'og-theme-code__item-name--active' : '' }` }
						>
							{ field.name }
						</span>
					) )
				}
			</div>

			<div className="og-theme-code__body og-result">
				{ themeCode[ tab ] && <Content codeValue={ htmlDecode( themeCode[ tab ].theme_code ) } /> }
			</div>
		</>
	);
};

export default Codes;
