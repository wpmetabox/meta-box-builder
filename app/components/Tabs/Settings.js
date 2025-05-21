import { Button } from "@wordpress/components";
import { Suspense, useContext, useState } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import { SettingsContext } from "../../contexts/SettingsContext";
import TranslationModal from "../../controls/TranslationModal";
import { getControlParams } from "../../functions";
import useApi from "../../hooks/useApi";

const getControlComponent = ( control, settings, updateSettings ) => {
	const [ Control, input, defaultValue ] = getControlParams( control, settings );

	return <Control
		componentId={ `settings-${ control.setting }` }
		name={ `settings${ input }` }
		{ ...control.props }
		defaultValue={ defaultValue }
		updateFieldData={ updateSettings }
	/>;
};

const Settings = () => {
	const settingsControls = useApi( 'settings-controls', [] );
	const { settings, updateSettings } = useContext( SettingsContext );
	const [ isModalOpen, setIsModalOpen ] = useState( false );

	const handleTranslationChange = event => setIsModalOpen( event.target.value === 'advanced' );

	const hasTranslation = settingsControls.some( control => control.setting === 'translation' );

	return (
		<>
			{ settingsControls.map( control => control.setting === 'translation'
				? (
					<Suspense fallback={ null } key={ control.setting }>
						{
							getControlComponent( {
								...control,
								props: {
									...control.props,
									onChange: handleTranslationChange
								}
							}, settings, updateSettings )
						}
						{
							settings.translation === 'advanced' && (
								<Button className="mbb-translation-config" isLink onClick={ () => setIsModalOpen( true ) }>
									{ __( 'View settings', 'meta-box-builder' ) }
								</Button>
							)
						}
					</Suspense>
				)
				: (
					<Suspense fallback={ null } key={ control.setting }>
						{ getControlComponent( control, settings, updateSettings ) }
					</Suspense>
				)
			) }
			{
				hasTranslation &&
				<>
					<TranslationModal isOpen={ isModalOpen } onClose={ () => setIsModalOpen( false ) } settings={ settings } updateSettings={ updateSettings } />
					<input type="hidden" name="settings[fields_translations]" value={ JSON.stringify( settings?.fields_translations || {} ) } />
				</>
			}
		</>
	);
};

export default Settings;
