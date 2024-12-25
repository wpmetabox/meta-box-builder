import { Modal, Toolbar as T, ToolbarButton, ToolbarGroup } from '@wordpress/components';
import { createPortal, useState } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import { arrowDown, arrowUp, copy, insertAfter, insertBefore, trash } from "@wordpress/icons";
import useFieldSettingsPanel from '../../hooks/useFieldSettingsPanel';
import useLists from '../../hooks/useLists';
import AddFieldContent from '../AddFieldContent';

const Toolbar = ( {
	position = {},
	field,
	addFieldBefore,
	addFieldAfter,
	duplicateField,
	removeField,
	moveFieldUp,
	moveFieldDown
} ) => {
	const { activeField } = useFieldSettingsPanel();
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
			<div
				className={ `mb-toolbar ${ activeField._id === field._id ? 'mb-toolbar--show' : '' }` }
				style={ {
					top: position.top,
					left: position.left,
					width: position.width,
				} }
			>
				<T label={ __( 'Toolbar', 'meta-box-builder' ) }>
					<ToolbarGroup>
						<ToolbarButton size="small" icon={ insertBefore } onClick={ actionCallback( 'addBefore' ) } label={ __( 'Add a field before', 'meta-box-builder' ) } />
						<ToolbarButton size="small" icon={ insertAfter } onClick={ actionCallback( 'addAfter' ) } label={ __( 'Add a field after', 'meta-box-builder' ) } />
						<ToolbarButton size="small" icon={ copy } onClick={ duplicate } label={ __( 'Duplicate', 'meta-box-builder' ) } />
					</ToolbarGroup>
					{
						field.type === 'group' && (
							<ToolbarGroup>
								<ToolbarButton size="small" icon={ insertBefore } onClick={ actionCallback( 'addSubFieldBefore' ) } label={ __( 'Add a sub-field at the beginning', 'meta-box-builder' ) } />
								<ToolbarButton size="small" icon={ insertAfter } onClick={ actionCallback( 'addSubFieldAfter' ) } label={ __( 'Add a sub-field at the end', 'meta-box-builder' ) } />
							</ToolbarGroup>
						)
					}
					<ToolbarGroup>
						<ToolbarButton size="small" icon={ arrowUp } onClick={ moveUp } label={ __( 'Move up', 'meta-box-builder' ) } />
						<ToolbarButton size="small" icon={ arrowDown } onClick={ moveDown } label={ __( 'Move down', 'meta-box-builder' ) } />
					</ToolbarGroup>
					<ToolbarGroup>
						<ToolbarButton isDestructive size="small" icon={ trash } onClick={ remove } label={ __( 'Remove', 'meta-box-builder' ) } />
					</ToolbarGroup>
				</T>
			</div>
			{
				isOpen && (
					<Modal title={ __( 'Add a new field', 'meta-box-builder' ) } size="large" onRequestClose={ closeModal }>
						<AddFieldContent addField={ action } onSelect={ closeModal } />
					</Modal>
				)
			}
		</>,
		document.body
	);
};

export default Toolbar;