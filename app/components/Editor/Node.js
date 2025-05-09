import { lazy, memo, Suspense } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import { isEqual } from 'lodash';
import { inside, isActiveField, setActiveField, ucwords } from "../../functions";
import useContextMenu from "../../hooks/useContextMenu";
import useNav from "../../hooks/useNav";
import ContextMenu from "./ContextMenu";
import Field from './Field';
import Base from "./FieldTypePreview/Base";
import Toolbar from "./Toolbar";

const Node = ( { field, parent = '', ...fieldActions } ) => {
	const { navPanel, setNavPanel } = useNav();
	const { isContextMenuOpen, openContextMenu, contextMenuPosition } = useContextMenu();

	const toggleSettings = e => {
		if ( !inside( e.target, '.mb-field ' ) || inside( e.target, '.mb-context-menu,.mb-toolbar,.og-item__editable' ) ) {
			return;
		}

		// Make it able to select sub-fields in a group
		e.stopPropagation();

		// Set active field and show settings panel.
		if ( !isActiveField( field ) ) {
			setActiveField( field );
			setNavPanel( 'field_settings' );
		} else if ( navPanel !== 'field_settings' ) {
			setNavPanel( 'field_settings' );
		}
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
				${ isActiveField( field ) ? 'mb-field--active' : '' }
			` }
			id={ `mb-field-${ field._id }` }
			onClick={ toggleSettings }
			onContextMenu={ openContextMenu }
			title={ __( 'Click to toggle field settings. Drag and drop to reorder fields.', 'meta-box-builder' ) }
		>
			<input type="hidden" name={ `fields${ parent }[${ field._id }][_id]` } defaultValue={ field._id } />
			<input type="hidden" name={ `fields${ parent }[${ field._id }][type]` } defaultValue={ field.type } />

			<Toolbar field={ field } { ...fieldActions } />
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
