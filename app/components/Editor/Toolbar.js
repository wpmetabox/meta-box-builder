import { Modal, Toolbar as T, ToolbarButton, ToolbarGroup } from '@wordpress/components';
import { useState } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import { arrowDown, arrowUp, copy, insertAfter, insertBefore, trash } from "@wordpress/icons";
import useLists from '../../hooks/useLists';
import AddFieldContent from '../AddFieldContent';

const Toolbar = ( {
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

	return (
		<>
			<div className="mb-toolbar">
				<T label={ __( 'Toolbar', 'meta-box-builder' ) }>
					<ToolbarGroup>
						<ToolbarButton size="small" icon={ arrowUp } onClick={ moveUp } label={ __( 'Move up', 'meta-box-builder' ) } />
						<ToolbarButton size="small" icon={ arrowDown } onClick={ moveDown } label={ __( 'Move down', 'meta-box-builder' ) } />
					</ToolbarGroup>
					<ToolbarGroup>
						<ToolbarButton size="small" icon={ insertBefore } onClick={ actionCallback( 'addBefore' ) } label={ __( 'Add a field before', 'meta-box-builder' ) } />
						<ToolbarButton size="small" icon={ insertAfter } onClick={ actionCallback( 'addAfter' ) } label={ __( 'Add a field after', 'meta-box-builder' ) } />
						<ToolbarButton size="small" icon={ copy } onClick={ duplicate } label={ __( 'Duplicate', 'meta-box-builder' ) } />
					</ToolbarGroup>
					{
						field.type === 'group' && (
							<ToolbarGroup>
								<ToolbarButton
									icon={
										<svg className="mb-toolbar__icon" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
											<line x1="2" y1="13" x2="14" y2="13" />
											<line x1="2" y1="10.5" x2="14" y2="10.5" />
											<line x1="5" y1="5" x2="11" y2="5" />
											<line x1="8" y1="2" x2="8" y2="8" />
										</svg>
									}
									onClick={ actionCallback( 'addSubFieldBefore' ) }
									label={ __( 'Add a sub-field at the beginning', 'meta-box-builder' ) }
								/>
								<ToolbarButton
									icon={
										<svg className="mb-toolbar__icon" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
											<line x1="14" y1="3" x2="2" y2="3" />
											<line x1="14" y1="5.5" x2="2" y2="5.5" />
											<line x1="11" y1="11" x2="5" y2="11" />
											<line x1="8" y1="14" x2="8" y2="8" />
										</svg>
									}
									onClick={ actionCallback( 'addSubFieldAfter' ) }
									label={ __( 'Add a sub-field at the end', 'meta-box-builder' ) }
								/>
							</ToolbarGroup>
						)
					}
					<ToolbarGroup>
						<ToolbarButton isDestructive size="small" icon={ trash } onClick={ remove } label={ __( 'Remove', 'meta-box-builder' ) } />
					</ToolbarGroup>
				</T>
			</div>
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

export default Toolbar;