import { createPortal, useEffect, useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import useFieldSettingsPanel from "../../hooks/useFieldSettingsPanel";
import PersistentPanelBody from '../PersistentPanelBody';
import Content from '../Tabs/FieldsTab/Content';

const FieldSettings = ( { controls, field, ...rest } ) => {
	const { activeField, portalElement } = useFieldSettingsPanel();

	// Extract controls displayed in the panel header.
	const headerSettings = [ 'required', 'clone_settings' ];
	const headerControls = controls.filter( control => headerSettings.includes( control.setting ) );
	controls = controls.filter( control => !headerSettings.includes( control.setting ) );

	const [ activeTab, setActiveTab ] = useState( 'general' );
	const updateActiveTab = key => () => setActiveTab( key === activeTab ? '' : key );

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

	useEffect( () => {
		if ( portalElement ) {
			portalElement.scrollTop = 0; // Reset scroll position to top.
		}
	}, [ activeTab ] );

	return portalElement && createPortal(
		<div className={ `og-field-settings ${ field._id === activeField._id ? 'og-field-settings--show' : '' }` }>
			<div className="og-field-settings__header">
				<Content controls={ headerControls } field={ field } { ...rest } />
			</div>

			{
				tabs.map( tab => tab.controls.length > 0 && (
					<PersistentPanelBody
						key={ tab.value }
						title={ tab.label }
						open={ tab.value === activeTab }
						onClick={ updateActiveTab( tab.value ) }
					>
						<Content controls={ tab.controls } field={ field } { ...rest } />
					</PersistentPanelBody>
				) )
			}
		</div>,
		portalElement
	);
};

export default FieldSettings;