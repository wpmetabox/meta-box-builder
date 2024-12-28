import { MenuGroup, MenuItem, Modal } from '@wordpress/components';
import { createPortal, useState } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import { arrowDown, arrowUp, copy, insertAfter, insertBefore, trash } from "@wordpress/icons";
import useLists from '../../hooks/useLists';
import AddFieldContent from '../AddFieldContent';

const ContextMenu = ( {
	open,
	top,
	left,
	field,
	addFieldBefore,
	addFieldAfter,
	duplicateField,
	removeField,
	moveFieldUp,
	moveFieldDown
} ) => {
	const { getForList } = useLists();
	const [ action, setAction ] = useState( () => () => {} );
	const [ isOpen, setOpen ] = useState( false );
	const openModal = () => setOpen( true );
	const closeModal = () => setOpen( false );

	const actionMap = {
		addBefore: fieldType => addFieldBefore( field._id, fieldType ),
		addAfter: fieldType => addFieldAfter( field._id, fieldType ),
		addSubFieldBefore: fieldType => {
			const { prependField } = getForList( field._id );
			prependField( fieldType );
		},
		addSubFieldAfter: fieldType => {
			const { addField } = getForList( field._id );
			addField( fieldType );
		},
	};

	const actionCallback = name => () => {
		openModal();
		setAction( () => actionMap[ name ] );
	};

	const remove = () => {
		if ( confirm( __( 'Do you really want to remove this field?', 'meta-box-builder' ) ) ) {
			removeField( field._id );
		}
	};

	const duplicate = () => duplicateField( field._id );
	const moveUp = () => moveFieldUp( field._id );
	const moveDown = () => moveFieldDown( field._id );

	return createPortal(
		<>
			<div className={ `mb-context-menu ${ open ? 'mb-context-menu--show' : '' }` } style={ { top, left } }>
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
			{
				isOpen && (
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