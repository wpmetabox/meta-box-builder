import { Button, Modal } from "@wordpress/components";
import { useState } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import AddFieldContent from "../AddFieldContent";

const AddFieldButton = ( { addField, variant = 'primary' } ) => {
	const [ isOpen, setOpen ] = useState( false );
	const openModal = () => setOpen( true );
	const closeModal = () => setOpen( false );

	return (
		<>
			<Button className="mb-editor__add-field-button" variant={ variant } onClick={ openModal } title={ __( 'Add a new field', 'meta-box-builder' ) }>
				{ __( '+ Add Field', 'meta-box-builder' ) }
			</Button>
			{
				isOpen && (
					<Modal title={ __( 'Add a new field', 'meta-box-builder' ) } size="large" onRequestClose={ closeModal }>
						<AddFieldContent addField={ addField } onSelect={ closeModal } />
					</Modal>
				)
			}
		</>
	);
};

export default AddFieldButton;