import { Suspense, useContext, useState } from "@wordpress/element";
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

	const handleTranslationChange = event => {
		if ( event.target.value === 'advanced' ) {
			setIsModalOpen( true );
		}
	};

	const handleModalSave = ( translations ) => {
		updateSettings( {
			...settings,
			fields_translations: JSON.stringify( translations )
		} );
	};

	return (
		<>
			{ settingsControls.map( control => {
				if ( control.setting === 'translation' ) {
					return (
						<Suspense fallback={ null } key={ control.setting }>
							{ getControlComponent( {
								...control,
								props: {
									...control.props,
									onChange: handleTranslationChange
								}
							}, settings, updateSettings ) }
						</Suspense>
					);
				}
				return (
					<Suspense fallback={ null } key={ control.setting }>
						{ getControlComponent( control, settings, updateSettings ) }
					</Suspense>
				);
			} ) }
			<TranslationModal
				isOpen={ isModalOpen }
				onClose={ () => setIsModalOpen( false ) }
				onSave={ handleModalSave }
			/>
		</>
	);
};

export default Settings;
