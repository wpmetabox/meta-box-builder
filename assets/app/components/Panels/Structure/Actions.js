import { DropdownMenu, MenuGroup, MenuItem, Modal } from '@wordpress/components';
import { useState } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import { arrowDown, arrowUp, copy, insertAfter, insertBefore, moreVertical, trash } from "@wordpress/icons";
import getList from '../../../list-functions';
import AddFieldContent from '../../AddFieldContent';

const Actions = ( { field, addFieldBefore, addFieldAfter, duplicateField, removeField, moveFieldUp, moveFieldDown } ) => {
	const [ action, setAction ] = useState( () => () => {} );
	const [ isOpen, setOpen ] = useState( false );
	const openModal = () => setOpen( true );
	const closeModal = () => setOpen( false );

	const actionMap = {
		addBefore: fieldType => addFieldBefore( field._id, fieldType ),
		addAfter: fieldType => addFieldAfter( field._id, fieldType ),
	};

	if ( field.type === 'group' ) {
		const { prependField, addField } = getList( field._id ).getState();
		actionMap.addSubFieldBefore = fieldType => prependField( fieldType );
		actionMap.addSubFieldAfter = fieldType => addField( fieldType );
	}

	const actionCallback = ( closeMenu, name ) => () => {
		closeMenu();
		openModal();
		setAction( () => actionMap[ name ] );
	};

	const duplicate = closeMenu => () => {
		closeMenu();
		duplicateField( field._id );
	};

	const remove = closeMenu => () => {
		closeMenu();

		let message = __( 'Do you really want to remove this field? Removing this field does NOT remove its data in the database.', 'meta-box-builder' );
		if ( MbbApp.extensions.aio ) {
			message += ' ' + __( 'To remove the data from the database, please go to Meta Box > Tools.', 'meta-box-builder' );
		}

		if ( confirm( message ) ) {
			removeField( field._id );
		}
	};

	const moveUp = closeMenu => () => {
		closeMenu();
		moveFieldUp( field._id );
	};

	const moveDown = closeMenu => () => {
		closeMenu();
		moveFieldDown( field._id );
	};

	return (
		<>
			<DropdownMenu className="og-item__actions" icon={ moreVertical } label={ __( 'Select an action', 'meta-box-builder' ) }>
				{
					( { onClose } ) => (
						<>
							<MenuGroup>
								<MenuItem icon={ insertBefore } onClick={ actionCallback( onClose, 'addBefore' ) }>
									{ __( 'Add a field before', 'meta-box-builder' ) }
								</MenuItem>
								<MenuItem icon={ insertAfter } onClick={ actionCallback( onClose, 'addAfter' ) }>
									{ __( 'Add a field after', 'meta-box-builder' ) }
								</MenuItem>
								<MenuItem icon={ copy } onClick={ duplicate( onClose ) }>
									{ __( 'Duplicate', 'meta-box-builder' ) }
								</MenuItem>
							</MenuGroup>
							{
								field.type === 'group' && (
									<MenuGroup>
										<MenuItem icon={ insertBefore } onClick={ actionCallback( onClose, 'addSubFieldBefore' ) }>
											{ __( 'Add a sub-field at the beginning', 'meta-box-builder' ) }
										</MenuItem>
										<MenuItem icon={ insertAfter } onClick={ actionCallback( onClose, 'addSubFieldAfter' ) }>
											{ __( 'Add a sub-field at the end', 'meta-box-builder' ) }
										</MenuItem>
									</MenuGroup>
								)
							}
							<MenuGroup>
								<MenuItem icon={ arrowUp } onClick={ moveUp( onClose ) }>
									{ __( 'Move up', 'meta-box-builder' ) }
								</MenuItem>
								<MenuItem icon={ arrowDown } onClick={ moveDown( onClose ) }>
									{ __( 'Move down', 'meta-box-builder' ) }
								</MenuItem>
							</MenuGroup>
							<MenuGroup>
								<MenuItem isDestructive icon={ trash } onClick={ remove( onClose ) }>
									{ __( 'Remove', 'meta-box-builder' ) }
								</MenuItem>
							</MenuGroup>
						</>
					)
				}
			</DropdownMenu>
			{
				isOpen && (
					<Modal focusOnMount="firstContentElement" title={ __( 'Add a new field', 'meta-box-builder' ) } size="large" onRequestClose={ closeModal }>
						<AddFieldContent addField={ action } onSelect={ closeModal } />
					</Modal>
				)
			}
		</>
	);
};

export default Actions;