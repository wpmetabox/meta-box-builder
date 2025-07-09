import { PanelBody } from '@wordpress/components';
import { createPortal } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import useFieldSettingsPanel from "../../../hooks/useFieldSettingsPanel";
import Tab from './Tab';

const FieldSettings = ( { controls, field, ...rest } ) => {
	const { portalElement } = useFieldSettingsPanel();

	// Render field settings only when the field is active.
	if ( !field._active ) {
		return;
	}

	// Extract controls displayed in the panel header.
	const headerSettings = [ 'required', 'clone_settings' ];
	const headerControls = controls.filter( control => headerSettings.includes( control.setting ) );
	controls = controls.filter( control => !headerSettings.includes( control.setting ) );

	let tabs = [
		{
			value: 'general',
			label: __( 'General', 'meta-box-builder' ),
		},
		{
			value: 'appearance',
			label: __( 'Appearance', 'meta-box-builder' ),
		},
		{
			value: 'conditional_logic',
			label: __( 'Conditional logic', 'meta-box-builder' ),
		},
		{
			value: 'validation',
			label: __( 'Validation', 'meta-box-builder' ),
		},
		{
			value: 'admin_columns',
			label: __( 'Admin columns', 'meta-box-builder' ),
		},
		{
			value: 'advanced',
			label: __( 'Advanced', 'meta-box-builder' ),
		},
	];

	// Get controls for each tab.
	tabs = tabs.map( tab => ( {
		...tab,
		controls: controls.filter( control => control.tab === tab.value )
	} ) ).filter( tab => tab.controls.length > 0 );

	return portalElement && createPortal(
		<div className={ `mb-field-settings ${ field._active ? 'mb-field-settings--show' : '' }` }>
			<div className="mb-field-settings__header">
				<Tab controls={ headerControls } field={ field } { ...rest } />
			</div>

			{
				tabs.map( tab => [ 'conditional_logic', 'validation', 'admin_columns' ].includes( tab.value )
					? <Tab key={ tab.value } controls={ tab.controls } field={ field } { ...rest } />
					: (
						<PanelBody key={ tab.value } title={ tab.label } initialOpen={ tab.value !== 'advanced' }>
							<Tab controls={ tab.controls } field={ field } { ...rest } />
						</PanelBody>
					)
				)
			}
		</div>,
		portalElement
	);
};

export default FieldSettings;