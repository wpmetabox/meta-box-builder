import { Button, Icon, Modal } from "@wordpress/components";
import { useState } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import { plusCircle } from '@wordpress/icons';
import AddFieldContent from "../../AddFieldContent";

export const Inserter = ( { addField, type = '' } ) => {
	const [ isOpen, setOpen ] = useState( false );
	const openModal = () => setOpen( true );
	const closeModal = () => setOpen( false );

	return (
		<>
			{
				type === 'group'
					? <span className="og-item__action og-item__action--add" onClick={ openModal } title={ __( 'Add a new field', 'meta-box-builder' ) }>
						<Icon icon={ plusCircle } />
					</span>
					: <Button variant="primary" onClick={ openModal } title={ __( 'Add a new field', 'meta-box-builder' ) }>
						{ __( '+ Add Field', 'meta-box-builder' ) }
					</Button>
			}
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
