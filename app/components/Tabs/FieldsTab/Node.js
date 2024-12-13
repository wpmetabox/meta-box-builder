import { memo } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import { Icon, copy, dragHandle, trash } from "@wordpress/icons";
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

const Node = ( { field, parent = '', removeField, updateField, duplicateField } ) => {
	const { setActiveField } = useFieldSettingsPanel();
	const { setSidebarPanel } = useSidebarPanel();

	const toggleSettings = e => {
		if ( inside( e.target, '.og-item__action--toggle' ) || !inside( e.target, '.og-item__editable,.og-item__toggle,.og-item__actions,.og-column--label,.components-popover' ) ) {
			setActiveField( field );
			setSidebarPanel( 'field_settings' );
		}
	};

	const remove = () => {
		if ( confirm( __( 'Do you really want to remove this field?', 'meta-box-builder' ) ) ) {
			removeField( field._id );
		}
	};

	const duplicate = () => duplicateField( field._id );
	const update = ( key, value ) => {
		if ( key.includes( '[' ) ) {
			// Get correct key in the last [].
			key = key.replace( /\]/g, '' ).split( '[' ).pop();
		}

		updateField( field._id, key, value );
	};

	return field.type && (
		<div className={ `og-item og-item--${ field.type }` }>
			<input type="hidden" name={ `fields${ parent }[${ field._id }][_id]` } defaultValue={ field._id } />
			<input type="hidden" name={ `fields${ parent }[${ field._id }][type]` } defaultValue={ field.type } />
			<div className="og-item__header og-collapsible__header" onClick={ toggleSettings } title={ __( 'Click to reveal field settings. Drag and drop to reorder fields.', 'meta-box-builder' ) }>
				<span className="og-column--drag"><Icon icon={ dragHandle } /></span>
				<span className="og-column--label">
					<HeaderIcon field={ field } />
					<HeaderLabel field={ field } updateField={ update } />
				</span>
				<span className="og-column--space"></span>
				<HeaderId field={ field } updateField={ update } />
				<span className="og-column--type">{ field.type }</span>
				<span className="og-column--actions og-item__actions">
					{
						field.type === 'group' && <GroupAddField id={ field._id } />
					}
					<span className="og-item__action og-item__action--duplicate" title={ __( 'Duplicate', 'meta-box-builder' ) } onClick={ duplicate }><Icon icon={ copy } /></span>
					<span className="og-item__action og-item__action--remove" title={ __( 'Remove', 'meta-box-builder' ) } onClick={ remove }><Icon icon={ trash } /></span>
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

const GroupAddField = ( { id } ) => {
	const { getForList } = useLists();
	const { addField } = getForList( id );

	return <Inserter addField={ addField } type="group" />;
};

export default memo( Node, ( prev, next ) => {
	delete prev.field.fields;
	delete next.field.fields;

	return prev.parent === next.parent && isEqual( prev.field, next.field );
} );
