import { lazy, memo, Suspense } from "@wordpress/element";
import { isEqual } from 'lodash';
import { inside, ucwords } from "../../functions";
import useContextMenu from "../../hooks/useContextMenu";
import useFieldSettingsPanel from "../../hooks/useFieldSettingsPanel";
import useSidebarPanel from "../../hooks/useSidebarPanel";
import ContextMenu from "./ContextMenu";
import Field from './Field';
import Base from "./FieldTypePreview/Base";

const Node = ( { field, parent = '', ...fieldActions } ) => {
	const { activeField, setActiveField } = useFieldSettingsPanel();
	const { setSidebarPanel } = useSidebarPanel();
	const { isContextMenuOpen, openContextMenu, contextMenuPosition } = useContextMenu();

	const toggleSettings = e => {
		if ( !inside( e.target, '.mb-field ' ) || inside( e.target, '.mb-context-menu ' ) ) {
			return;
		}

		e.stopPropagation();

		setActiveField( activeField._id === field._id ? {} : field );
		setSidebarPanel( activeField._id === field._id ? '' : 'field_settings' );
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

	if ( field.type === 'key_value' ) {
		field.clone = true;
	}

	return (
		<div
			className={ `
				mb-field
				mb-field--${ field.type }
				${ field._id === activeField._id ? 'mb-field--active' : '' }
			` }
			onClick={ toggleSettings }
			onContextMenu={ openContextMenu }
		>
			<Base field={ field } updateField={ update }>
				<Suspense fallback={ null }>
					<FieldType field={ field } parent={ parent } />
				</Suspense>
			</Base>
			{
				<ContextMenu
					open={ isContextMenuOpen }
					top={ contextMenuPosition.y }
					left={ contextMenuPosition.x }
					field={ field }
					{ ...fieldActions }
				/>
			}
			<Field field={ field } parent={ parent } updateField={ update } />
		</div>
	);
};

export default memo( Node, ( prev, next ) => {
	delete prev.field.fields;
	delete next.field.fields;

	return prev.parent === next.parent && isEqual( prev.field, next.field );
} );
