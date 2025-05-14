import { lazy, memo, Suspense, useEffect, useRef } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import { isEqual } from 'lodash';
import { inside, ucwords } from "../../functions";
import useContextMenu from "../../hooks/useContextMenu";
import useNavPanel from "../../hooks/useNavPanel";
import ContextMenu from "./ContextMenu";
import Field from './Field';
import Base from "./FieldTypePreview/Base";
import Toolbar from "./Toolbar";

const isClickedOnAField = e => inside( e.target, '.mb-field ' ) && !inside( e.target, '.mb-context-menu,.mb-toolbar' );

const OutsideClickDetector = ( { onClickOutside, children } ) => {
	const ref = useRef();

	useEffect( () => {
		const handleClickOutside = e => {
			// Hanle left-click only, to avoid bug when right-click to open context menu (deselect the current field, thus makes the field settings panel empty).
			if ( e.button !== 0 ) {
				return;
			}

			if ( !isClickedOnAField( e ) ) {
				return;
			}

			const closestField = e.target.matches( '.mb-field' ) ? e.target : e.target.closest( '.mb-field' );
			if ( ref.current && closestField.parentElement !== ref.current ) {
				onClickOutside?.();
			}
		};

		document.addEventListener( 'mousedown', handleClickOutside );
		return () => {
			document.removeEventListener( 'mousedown', handleClickOutside );
		};
	}, [ onClickOutside ] );

	return <div ref={ ref }>{ children }</div>;
};

const Node = ( { field, parent = '', ...fieldActions } ) => {
	const { isContextMenuOpen, openContextMenu, contextMenuPosition } = useContextMenu();
	const setNavPanel = useNavPanel( state => state.setNavPanel );

	const toggleSettings = e => {
		if ( !isClickedOnAField( e ) ) {
			return;
		}

		// Make it able to select sub-fields in a group
		e.stopPropagation();

		setNavPanel( 'field-settings' );
		if ( !field._active ) {
			update( '_active', true );
		}
	};

	const deselect = () => {
		if ( field._active ) {
			update( '_active', false );
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

	console.debug( `%c  Field ${ field._id }`, "color:orange" );

	return (
		<OutsideClickDetector onClickOutside={ deselect }>
			<div
				className={ `
					mb-field
					mb-field--${ field.type }
					${ field._active ? 'mb-field--active' : '' }
				` }
				id={ `mb-field-${ field._id }` }
				onClick={ toggleSettings }
				onContextMenu={ openContextMenu }
				title={ __( 'Click to toggle field settings. Drag and drop to reorder fields.', 'meta-box-builder' ) }
			>
				<input type="hidden" name={ `fields${ parent }[${ field._id }][_id]` } defaultValue={ field._id } />
				<input type="hidden" name={ `fields${ parent }[${ field._id }][type]` } defaultValue={ field.type } />

				{ field._active && <Toolbar field={ field } { ...fieldActions } /> }
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
		</OutsideClickDetector>
	);
};

export default memo( Node, ( prev, next ) => {
	delete prev.field.fields;
	delete next.field.fields;

	return prev.parent === next.parent && isEqual( prev.field, next.field );
} );
