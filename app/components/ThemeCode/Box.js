import { RawHTML, useContext, useState } from "@wordpress/element";
import { __, sprintf } from "@wordpress/i18n";
import { SettingsContext } from "../../contexts/SettingsContext";
import { htmlDecode } from "../../functions";
import useApi from "../../hooks/useApi";
import useFieldIds from "../../hooks/useFieldIds";
import Content from "./Content";

const $ = jQuery;

const Box = () => {
	const fieldIds = useFieldIds( state => state.ids );
	const { settings } = useContext( SettingsContext );

	// No fields (with ids) or is a block?
	if ( MbbApp.fields.length === 0 || fieldIds.length === 0 || settings.object_type === 'block' ) {
		return '';
	}

	// Generate Code
	const themeCode = useApi( [ 'theme-code-generate', {
		fields: Object.values( MbbApp.fields ).filter( field => ![ 'button', 'custom_html', 'divider', 'heading', 'tab' ].includes( field.type ) ),
		settings
	}, 'POST' ] );

	const [ tab, setTab ] = useState( 0 );

	return (
		<div className="mb-box">
			<div className="mb-box__header">{ __( "Theme code", "meta-box-builder" ) }</div>
			<div className="mb-box__body">
				<div className="og-theme-code__intro">
					<RawHTML>{ sprintf( __( 'Below is the auto-generated code to <a href="%s">display fields\' values</a> that you can use in your theme. We display several ways to output the fields\' values if possible, so choose which one is best for you.', 'meta-box-builder' ), 'https://docs.metabox.io/displaying-fields-with-code/' ) }</RawHTML>
					<RawHTML className="og-theme-code__note">{ sprintf( __( 'Please use this code as a starting point and modify it to fit your needs. For more details about fields, please refer to the <a href="%s">documentation</a>.', 'meta-box-builder' ), 'https://docs.metabox.io/fields/' ) }</RawHTML>
				</div>
				<div className="og-theme-code__content">
					{
						themeCode === undefined || themeCode.length === 0
							? <p className="og-theme-code__none">{ __( 'No fields available.', 'meta-box-builder' ) }</p>
							: <>
								<div className="og-theme-code__header">
									<div className="og-theme-code__fields">
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
								</div>

								<div className="og-theme-code__body og-result">
									{ themeCode[ tab ] && <Content codeValue={ htmlDecode( themeCode[ tab ].theme_code ) } /> }
								</div>
							</>
					}
				</div>
			</div>
		</div>
	);
};

export default Box;