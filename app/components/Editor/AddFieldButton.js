import { Button, Modal } from "@wordpress/components";
import { useState } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import AddFieldContent from "../AddFieldContent";

const AddFieldButton = ( { addField, variant = 'primary', text = __( '+ Add Field', 'meta-box-builder' ) } ) => {
	const [ isOpen, setOpen ] = useState( false );
	const openModal = () => setOpen( true );
	const closeModal = () => setOpen( false );

	return (
		<div className="mb-editor__add-field-button">
			<Button variant={ variant } onClick={ openModal } title={ __( 'Add a new field', 'meta-box-builder' ) }>
				{ text }
			</Button>
			{
				isOpen && (
					<Modal title={ __( 'Add a new field', 'meta-box-builder' ) } size="large" onRequestClose={ closeModal }>
						<AddFieldContent addField={ addField } onSelect={ closeModal } />
					</Modal>
				)
			}
		</div>
	);
};

export default AddFieldButton;