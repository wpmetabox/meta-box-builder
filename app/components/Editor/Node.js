import { lazy, memo, Suspense, useState } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import { isEqual } from 'lodash';
import { inside, ucwords } from "../../functions";
import useContextMenu from "../../hooks/useContextMenu";
import useFieldSettingsPanel from "../../hooks/useFieldSettingsPanel";
import useSidebarPanel from "../../hooks/useSidebarPanel";
import useToolbar from "../../hooks/useToolbar";
import ContextMenu from "./ContextMenu";
import Field from './Field';
import Base from "./FieldTypePreview/Base";
import Toolbar from "./Toolbar";

const Node = ( { field, parent = '', ...fieldActions } ) => {
	const { activeField, setActiveField } = useFieldSettingsPanel();
	const { setSidebarPanel } = useSidebarPanel();
	const { isContextMenuOpen, openContextMenu, contextMenuPosition } = useContextMenu();
	const { showToolbar, toolbarPosition } = useToolbar();
	const [ hover, setHover ] = useState( false );

	const isActive = activeField._id === field._id;

	const toggleSettings = e => {
		if ( !inside( e.target, '.mb-field ' ) || inside( e.target, '.mb-context-menu ' ) || inside( e.target, '.mb-field__toolbar ' ) ) {
			return;
		}

		e.stopPropagation();

		// If the field is already active, close it.
		if ( isActive ) {
			setActiveField( {} );
			setSidebarPanel( '' );
			return;
		}

		// Set active field and show settings panel.
		setActiveField( field );
		setSidebarPanel( 'field_settings' );
		showToolbar( e );
	};

	const update = ( key, value ) => {
		if ( key.includes( '[' ) ) {
			// Get correct key in the last [].
			key = key.replace( /\]/g, '' ).split( '[' ).pop();
		}

		fieldActions.updateField( field._id, key, value );
	};

	if ( !field.type ) {
		return;
	}

	const FieldType = lazy( () => import( `./FieldTypePreview/${ ucwords( field.type, '_', '' ) }` ) );

	return (
		<div
			className={ `
				mb-field
				mb-field--${ field.type }
				${ isActive ? 'mb-field--active' : '' }
			` }
			onClick={ toggleSettings }
			onContextMenu={ openContextMenu }
			title={ __( 'Click to reveal field settings. Drag and drop to reoder fields.', 'meta-box-builder' ) }
		>
			<input type="hidden" name={ `fields${ parent }[${ field._id }][_id]` } defaultValue={ field._id } />
			<input type="hidden" name={ `fields${ parent }[${ field._id }][type]` } defaultValue={ field.type } />

			<Toolbar
				position={ toolbarPosition }
				field={ field }
				{ ...fieldActions }
			/>
			<Base field={ field } { ...fieldActions } updateField={ update }>
				<Suspense fallback={ null }>
					<FieldType field={ field } parent={ parent } />
				</Suspense>
			</Base>
			<ContextMenu
				open={ isContextMenuOpen }
				top={ contextMenuPosition.y }
				left={ contextMenuPosition.x }
				field={ field }
				{ ...fieldActions }
			/>
			<Field field={ field } parent={ parent } updateField={ update } />
		</div>
	);
};

export default memo( Node, ( prev, next ) => {
	delete prev.field.fields;
	delete next.field.fields;

	return prev.parent === next.parent && isEqual( prev.field, next.field );
} );
