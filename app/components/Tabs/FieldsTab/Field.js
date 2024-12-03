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

	const tabs = [
		{
			value: 'general',
			label: __( 'General', 'meta-box-builder' ),
		},
		{
			value: 'conditional_logic',
			label: __( 'Conditional logic', 'meta-box-builder' ),
		},
		{
			value: 'advanced',
			label: __( 'Advanced', 'meta-box-builder' ),
		},
	];

	return tabs.map( tab => {
		const tabControls = controls.filter( control => control.tab === tab.value );

		return tabControls.length > 0 && (
			<PanelBody key={ tab.value } title={ tab.label }>
				<PanelRow>
					<Content { ...props } controls={ tabControls } />
				</PanelRow>
			</PanelBody>
		);
	} );
};

export default Field;