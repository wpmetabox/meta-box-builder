import { PanelBody, PanelRow } from '@wordpress/components';
import { createPortal } from '@wordpress/element';
import useFieldSettingsPanel from "../../hooks/useFieldSettingsPanel";
import Content from '../Tabs/FieldsTab/Content';
import { __ } from '@wordpress/i18n';

const FieldSettings = ( { id, controls, ...rest } ) => {
	const { activeFieldId, portalElement } = useFieldSettingsPanel();

	const tabs = [
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
			value: 'admin_columns',
			label: __( 'Admin columns', 'meta-box-builder' ),
		},
		{
			value: 'advanced',
			label: __( 'Advanced', 'meta-box-builder' ),
		},
	];

	return portalElement && createPortal(
		<div className={ `og-field-settings ${ id === activeFieldId ? 'og-field-settings--show' : '' }` }>
			{
				tabs.map( tab => {
					const tabControls = controls.filter( control => control.tab === tab.value );

					return tabControls.length > 0 && (
						<PanelBody key={ tab.value } title={ tab.label }>
							<PanelRow>
								<Content controls={ tabControls } id={ id } { ...rest } />
							</PanelRow>
						</PanelBody>
					);
				} )
			}
		</div>,
		portalElement
	);
};

export default FieldSettings;