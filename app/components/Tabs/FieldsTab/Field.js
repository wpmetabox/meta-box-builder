import { PanelBody, PanelRow } from '@wordpress/components';
import { __ } from "@wordpress/i18n";
import useApi from "../../../hooks/useApi";
import Content from './Content';

const Field = props => {
	const fieldTypes = useApi( 'field-types', {} );

	// Safe fallback to 'text' for not-recommended HTML5 field types.
	const ignore = [ 'datetime-local', 'month', 'tel', 'week' ];
	const type = ignore.includes( props.field.type ) ? 'text' : props.field.type;

	if ( !type || !fieldTypes.hasOwnProperty( type ) ) {
		return;
	}

	const controls = [ ...fieldTypes[ type ].controls ];
	const general = controls.filter( control => control.tab === 'general' );
	const advanced = controls.filter( control => control.tab === 'advanced' );

	return <>
		<PanelBody title={ __( 'General', 'meta-box-builder' ) } initialOpen={ true }>
			<PanelRow>
				<Content { ...props } controls={ general } />
			</PanelRow>
		</PanelBody>
		{
			advanced.length > 0 &&
			<PanelBody title={ __( 'Advanced', 'meta-box-builder' ) } initialOpen={ true }>
				<PanelRow>
					<Content { ...props } controls={ advanced } />
				</PanelRow>
			</PanelBody>
		}
	</>;
};

export default Field;