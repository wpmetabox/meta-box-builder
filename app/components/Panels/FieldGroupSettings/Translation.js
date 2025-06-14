import { Button, SelectControl } from "@wordpress/components";
import { useState } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import useSettings from "../../../hooks/useSettings";
import TranslationModal from "./TranslationModal";

const Translation = () => {
	const { getSetting, updateSetting } = useSettings();
	const [ isModalOpen, setIsModalOpen ] = useState( false );

	return (
		<>
			<SelectControl
				value={ getSetting( 'translation', 'ignore' ) }
				onChange={ value => updateSetting( 'translation', value ) }
				options={ [
					{ label: __( 'Do not translate any fields in this field group', 'meta-box-builder' ), value: 'ignore' },
					{ label: __( 'Translate all fields in this field group', 'meta-box-builder' ), value: 'translate' },
					{ label: __( 'Synchronize values across languages', 'meta-box-builder' ), value: 'copy' },
					{ label: __( 'Set translation mode per field', 'meta-box-builder' ), value: 'advanced' },
				] }
			/>
			{
				getSetting( 'translation', 'ignore' ) === 'advanced' && (
					<Button isLink onClick={ () => setIsModalOpen( true ) }>
						{ __( 'View settings', 'meta-box-builder' ) }
					</Button>
				)
			}
			<TranslationModal isOpen={ isModalOpen } onClose={ () => setIsModalOpen( false ) } />
		</>
	);
};

export default Translation;
