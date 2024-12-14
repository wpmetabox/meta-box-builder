import { DropdownMenu, MenuGroup, MenuItem } from '@wordpress/components';
import { memo } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import { Icon, arrowDown, arrowUp, copy, dragHandle, insertAfter, insertBefore, moreVertical, trash } from "@wordpress/icons";
import { isEqual } from 'lodash';
import { inside } from "../../../functions";
import useFieldSettingsPanel from "../../../hooks/useFieldSettingsPanel";
import useLists from "../../../hooks/useLists";
import useSidebarPanel from "../../../hooks/useSidebarPanel";
import Field from './Field';
import Group from './Group';
import HeaderIcon from "./HeaderIcon";
import HeaderId from "./HeaderId";
import HeaderLabel from "./HeaderLabel";
import { Inserter } from "./Inserter";

const Node = ( { field, parent = '', ...fieldActions } ) => {
	const { activeField, setActiveField } = useFieldSettingsPanel();
	const { setSidebarPanel } = useSidebarPanel();

	const updateActiveField = () => setActiveField( field );

	const toggleSettings = e => {
		if ( inside( e.target, '.og-item__action--toggle' ) || !inside( e.target, '.og-item__editable,.og-item__toggle,.og-item__actions,.og-column--label,.components-popover' ) ) {
			updateActiveField();
			setSidebarPanel( 'field_settings' );
		}
	};

	const update = ( key, value ) => {
		if ( key.includes( '[' ) ) {
			// Get correct key in the last [].
			key = key.replace( /\]/g, '' ).split( '[' ).pop();
		}

		fieldActions.updateField( field._id, key, value );
	};

	return field.type && (
		<div className={ `og-item og-item--${ field.type } ${ field._id === activeField._id ? 'og-item--active' : '' }` }>
			<input type="hidden" name={ `fields${ parent }[${ field._id }][_id]` } defaultValue={ field._id } />
			<input type="hidden" name={ `fields${ parent }[${ field._id }][type]` } defaultValue={ field.type } />
			<div className="og-item__header og-collapsible__header" onClick={ toggleSettings } title={ __( 'Click to reveal field settings. Drag and drop to reorder fields.', 'meta-box-builder' ) }>
				<span className="og-column--drag"><Icon icon={ dragHandle } /></span>
				<span className="og-column--label">
					<HeaderIcon field={ field } />
					<HeaderLabel field={ field } updateField={ update } updateActiveField={ updateActiveField } />
				</span>
				<span className="og-column--space"></span>
				<HeaderId field={ field } updateField={ update } updateActiveField={ updateActiveField } />
				<span className="og-column--type">{ field.type }</span>
				<span className="og-column--actions og-item__actions">
					<DropdownMenu icon={ moreVertical } label={ __( 'Select an action', 'meta-box-builder' ) }>
						{
							( { onClose } ) => <Actions onClose={ onClose } field={ field } { ...fieldActions } />
						}
					</DropdownMenu>
				</span>
			</div>
			{
				field.type === 'group'
					? <Group field={ field } parent={ parent } updateField={ update } />
					: <Field field={ field } parent={ parent } updateField={ update } />
			}
		</div>
	);
};

const GroupAddField = ( { listId } ) => {
	const { getForList } = useLists();
	const { addField } = getForList( listId );

	return <Inserter addField={ addField } type="group" />;
};

const Actions = ( { onClose, field, addFieldBefore, addFieldAfter, duplicateField, removeField } ) => {
	const duplicate = () => {
		onClose();
		duplicateField( field._id );
	};

	const remove = () => {
		onClose();

		if ( confirm( __( 'Do you really want to remove this field?', 'meta-box-builder' ) ) ) {
			removeField( field._id );
		}
	};

	return (
		<>
			<MenuGroup>
				<MenuItem icon={ insertBefore } onClick={ onClose }>
					{ __( 'Add a field before', 'meta-box-builder' ) }
				</MenuItem>
				<MenuItem icon={ insertAfter } onClick={ onClose }>
					{ __( 'Add a field after', 'meta-box-builder' ) }
				</MenuItem>
				<MenuItem icon={ copy } onClick={ duplicate }>
					{ __( 'Duplicate', 'meta-box-builder' ) }
				</MenuItem>
			</MenuGroup>
			{
				field.type === 'group' && (
					<MenuGroup>
						<MenuItem icon={ insertBefore } onClick={ onClose }>
							{ __( 'Add a sub-field at the beginning', 'meta-box-builder' ) }
						</MenuItem>
						<MenuItem icon={ insertAfter } onClick={ onClose }>
							{ __( 'Add a sub-field at the end', 'meta-box-builder' ) }
						</MenuItem>
					</MenuGroup>
				)
			}
			<MenuGroup>
				<MenuItem icon={ arrowUp } onClick={ onClose }>
					{ __( 'Move up', 'meta-box-builder' ) }
				</MenuItem>
				<MenuItem icon={ arrowDown } onClick={ onClose }>
					{ __( 'Move down', 'meta-box-builder' ) }
				</MenuItem>
			</MenuGroup>
			<MenuGroup>
				<MenuItem icon={ trash } onClick={ remove }>
					{ __( 'Remove', 'meta-box-builder' ) }
				</MenuItem>
			</MenuGroup>
		</>
	);
};

export default memo( Node, ( prev, next ) => {
	delete prev.field.fields;
	delete next.field.fields;

	return prev.parent === next.parent && isEqual( prev.field, next.field );
} );
