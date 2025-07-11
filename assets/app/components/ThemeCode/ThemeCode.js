import { RawHTML, useState } from "@wordpress/element";
import { __, sprintf } from "@wordpress/i18n";
import { useFetch } from "../../hooks/useFetch";
import useSettings from "../../hooks/useSettings";
import { buildFieldsTree } from "../../list-functions";
import Content from "./Content";

const htmlDecode = innerHTML => Object.assign( document.createElement( 'textarea' ), { innerHTML } ).value;

const ThemeCode = () => {
	const { settings, getObjectType } = useSettings();
	const [ tab, setTab ] = useState( 0 );

	const excludeFieldTypes = [ 'button', 'custom_html', 'divider', 'heading', 'hidden', 'tab' ];
	const fields = buildFieldsTree().filter( field => !excludeFieldTypes.includes( field.type ) );

	// Generate Code
	const { data } = useFetch( { api: 'theme-code-generate', params: { fields, settings }, method: 'POST', defaultValue: [] } );

	// No fields (with ids) or is a block?
	if ( fields.length === 0 || getObjectType() === 'block' ) {
		return '';
	}

	return (
		<>
			<div className="og-theme-code__intro">
				<RawHTML>{ sprintf( __( 'Below is the auto-generated code to <a href="%s">display fields\' values</a> that you can use in your theme. We display several ways to output the fields\' values if possible, so choose which one is best for you.', 'meta-box-builder' ), 'https://docs.metabox.io/displaying-fields-with-code/' ) }</RawHTML>
				<RawHTML className="og-theme-code__note">{ sprintf( __( 'Please use this code as a starting point and modify it to fit your needs. For more details about fields, please refer to the <a href="%s">documentation</a>.', 'meta-box-builder' ), 'https://docs.metabox.io/fields/' ) }</RawHTML>
			</div>
			<div className="og-theme-code__content">
				{
					data.length === 0
						? <p className="og-theme-code__none">{ __( 'No fields available.', 'meta-box-builder' ) }</p>
						: <>
							<div className="og-theme-code__header">
								<div className="og-theme-code__fields">
									{
										data.map( ( field, index ) => (
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
							</div>

							<div className="og-theme-code__body og-result">
								{ data[ tab ] && <Content codeValue={ htmlDecode( data[ tab ].theme_code ) } /> }
							</div>
						</>
				}
			</div>
		</>
	);
};

export default ThemeCode;
