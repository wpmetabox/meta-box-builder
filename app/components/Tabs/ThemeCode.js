import { useEffect, useState } from "@wordpress/element";
import { htmlDecode } from "../../functions";
import useApi from "../../hooks/useApi";
import useFieldIds from "../../hooks/useFieldIds";
import useFields from "../../hooks/useFields";
import Content from "./ThemeCodeTab/Content";

const $ = jQuery;

const Codes = ( props ) => {
	const { fields } = useFields( props.fields, 'fields' );
	const fieldIds = useFieldIds( state => state.ids );

	// No fields?
	if ( fields.length === 0 || fieldIds.length === 0 ) {
		return '';
	}

	const listFields = Object.values( fields );

	// Show list of field names in the left tabs.
	useEffect( () => {
		let timer = null;
		if ( listFields.length > 0 ) {
			const lastField = listFields[ listFields.length - 1 ];
			timer = setInterval( () => {
				const $nameElement = $( `#fields-${ lastField._id }-name` );
				if ( lastField.name === '' && $nameElement.length > 0 ) {
					$( `#og-theme-code__field--${ lastField._id }` ).text( $nameElement.val() );
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
			<div className="og-theme-code__intro">
				<p>Below is the auto-generated code to display fields' values. Select a field from the left tab and you'll see the code to display its value on the right.</p>
				<p>You can copy and paste the code into your theme's files. We also display several ways to output the fields' values (if possible), so choose which one is best for you.</p>
				<p><strong>Note:</strong> you should use this code as a starting point and modify it to fit your needs. For more details about using code, please refer to the <a href="https://docs.metabox.io/fields">documentation</a>.</p>
			</div>
			<div className="og-theme-code__content">
				<div className="og-theme-code__header">
					{
						themeCode.map( ( field, index ) => (
							<span
								key={ `header_${ field._id }` }
								onClick={ () => setTab( index ) }
								id={ `og-theme-code__field--${ field._id }` }
								item_id={ field._id }
								className={ `og-theme-code__field ${ tab === index ? 'og-theme-code__field--active' : '' }` }
							>
								{ field.name }
							</span>
						) )
					}
				</div>

				<div className="og-theme-code__body og-result">
					{ themeCode[ tab ] && <Content codeValue={ htmlDecode( themeCode[ tab ].theme_code ) } /> }
				</div>
			</div>
		</>
	);
};

export default Codes;
