import { MenuGroup, MenuItem, Modal } from '@wordpress/components';
import { createPortal, useEffect, useState } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import { arrowDown, arrowUp, copy, insertAfter, insertBefore, trash } from "@wordpress/icons";
import { inside } from '../../functions';
import useContextMenu from '../../hooks/useContextMenu';
import getList from '../../list-functions';
import AddFieldContent from '../AddFieldContent';

const ContextMenu = () => {
	const {
		isOpen,
		position,
		field,
		fieldActions,
		closeContextMenu,
		isModalOpen,
		openModal,
		closeModal,
	} = useContextMenu();
	const [ action, setAction ] = useState( () => () => {} );

	// Close context menu when scroll inside the editor, or click, or press any key.
	const editor = document.querySelector( '.mb-body__inner' );

	useEffect( () => {
		const handleClickOutside = e => {
			if ( !inside( e.target, '.mb-context-menu' ) ) {
				closeContextMenu();
			}
		};

		editor.addEventListener( 'scroll', closeContextMenu );
		document.addEventListener( 'keydown', closeContextMenu );
		document.addEventListener( 'click', handleClickOutside );

		return () => {
			editor.removeEventListener( 'scroll', closeContextMenu );
			document.removeEventListener( 'keydown', closeContextMenu );
			document.removeEventListener( 'click', handleClickOutside );
		};
	}, [] );

	if ( !field || !fieldActions ) {
		return;
	}

	const {
		addFieldBefore,
		addFieldAfter,
		duplicateField,
		removeField,
		moveFieldUp,
		moveFieldDown
	} = fieldActions;

	const actionMap = {
		addBefore: fieldType => addFieldBefore( field._id, fieldType ),
		addAfter: fieldType => addFieldAfter( field._id, fieldType ),
	};

	if ( field.type === 'group' ) {
		// Use list.getState() to avoid using reactivity hook, which would cause the context menu to re-render.
		const list = getList( field._id );
		actionMap.addSubFieldBefore = fieldType => list.getState().prependField( fieldType );
		actionMap.addSubFieldAfter = fieldType => list.getState().addField( fieldType );
	}

	const actionCallback = name => () => {
		closeContextMenu();
		openModal();
		setAction( () => actionMap[ name ] );
	};

	const remove = () => {
		if ( confirm( __( 'Do you really want to remove this field?', 'meta-box-builder' ) ) ) {
			removeField( field._id );
			closeContextMenu();
		}
	};

	const duplicate = () => {
		duplicateField( field._id );
		closeContextMenu();
	};
	const moveUp = () => {
		moveFieldUp( field._id );
		closeContextMenu();
	};
	const moveDown = () => {
		moveFieldDown( field._id );
		closeContextMenu();
	};

	return createPortal(
		<>
			{
				isOpen && (
					<div className="mb-context-menu" style={ position }>
						<MenuGroup>
							<MenuItem icon={ insertBefore } onClick={ actionCallback( 'addBefore' ) }>
								{ __( 'Add a field before', 'meta-box-builder' ) }
							</MenuItem>
							<MenuItem icon={ insertAfter } onClick={ actionCallback( 'addAfter' ) }>
								{ __( 'Add a field after', 'meta-box-builder' ) }
							</MenuItem>
							<MenuItem icon={ copy } onClick={ duplicate }>
								{ __( 'Duplicate', 'meta-box-builder' ) }
							</MenuItem>
						</MenuGroup>
						{
							field.type === 'group' && (
								<MenuGroup>
									<MenuItem icon={ insertBefore } onClick={ actionCallback( 'addSubFieldBefore' ) }>
										{ __( 'Add a sub-field at the beginning', 'meta-box-builder' ) }
									</MenuItem>
									<MenuItem icon={ insertAfter } onClick={ actionCallback( 'addSubFieldAfter' ) }>
										{ __( 'Add a sub-field at the end', 'meta-box-builder' ) }
									</MenuItem>
								</MenuGroup>
							)
						}
						<MenuGroup>
							<MenuItem icon={ arrowUp } onClick={ moveUp }>
								{ __( 'Move up', 'meta-box-builder' ) }
							</MenuItem>
							<MenuItem icon={ arrowDown } onClick={ moveDown }>
								{ __( 'Move down', 'meta-box-builder' ) }
							</MenuItem>
						</MenuGroup>
						<MenuGroup>
							<MenuItem isDestructive icon={ trash } onClick={ remove }>
								{ __( 'Remove', 'meta-box-builder' ) }
							</MenuItem>
						</MenuGroup>
					</div>
				)
			}
			{
				isModalOpen && (
					<Modal focusOnMount="firstContentElement" title={ __( 'Add a new field', 'meta-box-builder' ) } size="large" onRequestClose={ closeModal }>
						<AddFieldContent addField={ action } onSelect={ closeModal } />
					</Modal>
				)
			}
		</>,
		document.body
	);
};

export default ContextMenu;