import { createPortal } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import useFieldSettingsPanel from "../../hooks/useFieldSettingsPanel";
import PersistentPanelBody from '../PersistentPanelBody';
import Content from '../Tabs/FieldsTab/Content';

const FieldSettings = ( { id, controls, ...rest } ) => {
	const { activeField, portalElement } = useFieldSettingsPanel();

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
			value: 'validation',
			label: __( 'Validation', 'meta-box-builder' ),
		},
		{
			value: 'conditional_logic',
			label: __( 'Conditional logic', 'meta-box-builder' ),
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
	} ) );

	return portalElement && createPortal(
		<div className={ `og-field-settings ${ id === activeField._id ? 'og-field-settings--show' : '' }` }>
			{
				tabs.map( tab => (
					<PersistentPanelBody key={ tab.value } title={ tab.label }>
						<Content controls={ tab.controls } id={ id } { ...rest } />
					</PersistentPanelBody>
				) )
			}
		</div>,
		portalElement
	);
};

export default FieldSettings;