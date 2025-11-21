import { createPortal } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import useFieldSettingsPanel from "../../../hooks/useFieldSettingsPanel";
import { isInGroup } from "../../../list-functions";
import PersistentPanelBody from '../PersistentPanelBody';
import Tab from './Tab';

export default ( { controls, field, ...rest } ) => {
	const { portalElement } = useFieldSettingsPanel();

	// Extract controls displayed in the panel header.
	const headerSettings = [ 'required', 'clone_settings' ];
	const headerControls = controls.filter( control => headerSettings.includes( control.setting ) );
	controls = controls.filter( control => !headerSettings.includes( control.setting ) );

	// Hide controls that are not allowed in a group.
	if ( isInGroup( field._id ) ) {
		controls = controls.filter( control => !control?.props?.hide_in_group );
	}

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
		<div className="mb-field-settings">
			<div className="mb-field-settings__header">
				<Tab controls={ headerControls } field={ field } { ...rest } />
			</div>

			{
				tabs.map( tab => [ 'conditional_logic', 'validation', 'admin_columns' ].includes( tab.value )
					? <Tab key={ tab.value } controls={ tab.controls } field={ field } { ...rest } />
					: (
						<PersistentPanelBody
							key={ tab.value }
							panelId={ `field-${ tab.value }` }
							title={ tab.label }
							initialOpen={ tab.value !== 'advanced' }
						>
							<Tab controls={ tab.controls } field={ field } { ...rest } />
						</PersistentPanelBody>
					)
				)
			}
		</div>,
		portalElement
	);
};
