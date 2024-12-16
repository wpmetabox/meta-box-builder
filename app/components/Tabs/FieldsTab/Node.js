import { memo } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import { Icon, dragHandle } from "@wordpress/icons";
import { isEqual } from 'lodash';
import { inside } from "../../../functions";
import useFieldSettingsPanel from "../../../hooks/useFieldSettingsPanel";
import useLists from "../../../hooks/useLists";
import useSidebarPanel from "../../../hooks/useSidebarPanel";
import Actions from '../../Structure/Actions';
import Field from './Field';
import Group from './Group';
import HeaderIcon from "./HeaderIcon";
import HeaderId from "./HeaderId";
import HeaderLabel from "./HeaderLabel";
import { Inserter } from "./Inserter";
import useContextMenu from "../../../hooks/useContextMenu";
import ContextMenu from "../../Structure/ContextMenu";

const Node = ( { field, parent = '', ...fieldActions } ) => {
	const { activeField, setActiveField } = useFieldSettingsPanel();
	const { setSidebarPanel } = useSidebarPanel();
	const { isContextMenuOpen, openContextMenu, contextMenuPosition } = useContextMenu();

	const updateActiveField = () => setActiveField( field );

	const toggleSettings = e => {
		if ( !inside( e.target, '.og-item__editable,.og-column--actions,.og-column--label,.components-menu-item__item,.og-add-field' ) ) {
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
			<div
				className="og-item__header og-collapsible__header"
				title={ __( 'Click to reveal field settings. Drag and drop to reorder fields.', 'meta-box-builder' ) }
				onClick={ toggleSettings }
				onContextMenu={ openContextMenu }
			>
				<span className="og-column--drag"><Icon icon={ dragHandle } /></span>
				<span className="og-column--label">
					<HeaderIcon field={ field } />
					<HeaderLabel field={ field } updateField={ update } updateActiveField={ updateActiveField } />
				</span>
				<span className="og-column--space"></span>
				<HeaderId field={ field } updateField={ update } updateActiveField={ updateActiveField } />
				<span className="og-column--type">{ field.type }</span>
				<span className="og-column--actions og-item__actions">
					<Actions field={ field } { ...fieldActions } />
				</span>
			</div>
			{
				isContextMenuOpen &&
				<ContextMenu top={ contextMenuPosition.y } left={ contextMenuPosition.x } field={ field } { ...fieldActions } />
			}
			{
				field.type === 'group'
					? <Group field={ field } parent={ parent } updateField={ update } />
					: <Field field={ field } parent={ parent } updateField={ update } />
			}
		</div>
	);
};

export default memo( Node, ( prev, next ) => {
	delete prev.field.fields;
	delete next.field.fields;

	return prev.parent === next.parent && isEqual( prev.field, next.field );
} );
