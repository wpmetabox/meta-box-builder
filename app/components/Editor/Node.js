import { lazy, memo, Suspense, useCallback, useRef, useState } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import { isEqual } from 'lodash';
import { inside, ucwords } from "../../functions";
import useAllFields from "../../hooks/useAllFields";
import useContextMenu from "../../hooks/useContextMenu";
import useNavPanel from "../../hooks/useNavPanel";
import { setFieldActive } from "../../list-functions";
import Field from './Field';
import Base from "./FieldTypePreview/Base";
import Toolbar from "./Toolbar";

const isClickedOnAField = e => inside( e.target, '.mb-field ' ) && !inside( e.target, '.mb-context-menu,.mb-toolbar' );

const Node = ( { field, parent = '', ...fieldActions } ) => {
	const [ hover, setHover ] = useState( false );
	const [ isResizing, setIsResizing ] = useState( false );
	const resizeRef = useRef( null );
	const openContextMenu = useContextMenu( state => state.openContextMenu );
	const setNavPanel = useNavPanel( state => state.setNavPanel );
	const allFields = useAllFields();

	const hasCustomColumns = allFields.some( field => field.columns && field.columns !== 12 );

	const toggleSettings = e => {
		if ( !isClickedOnAField( e ) ) {
			return;
		}

		// Make it able to select sub-fields in a group
		e.stopPropagation();

		setFieldActive( field._id );
		setNavPanel( 'field-settings' );
	};

	const update = ( key, value ) => {
		if ( key.includes( '[' ) ) {
			// Get correct key in the last [].
			key = key.replace( /\]/g, '' ).split( '[' ).pop();
		}

		fieldActions.updateField( field._id, key, value );
	};

	const handleContextMenu = e => openContextMenu( e, field, fieldActions );

	const handleMouseEnter = () => setHover( true );
	const handleMouseLeave = () => setHover( false );

	const handleResizeStart = useCallback( e => {
		e.preventDefault();
		e.stopPropagation();
		setIsResizing( true );

		const startX = e.clientX;
		const startColumns = field.columns || 12;
		const fieldElement = e.target.closest( '.mb-field-wrapper' );
		const fieldRect = fieldElement.getBoundingClientRect();
		const totalWidth = fieldRect.width;
		const columnWidth = totalWidth / startColumns;

		const handleMouseMove = e => {
			const deltaX = e.clientX - startX;
			const deltaColumns = Math.round( deltaX / columnWidth );
			const newColumns = Math.max( 1, Math.min( 12, startColumns + deltaColumns ) );

			if ( newColumns !== startColumns ) {
				update( 'columns', newColumns );
			}
		};

		const handleMouseUp = () => {
			setIsResizing( false );
			document.removeEventListener( 'mousemove', handleMouseMove );
			document.removeEventListener( 'mouseup', handleMouseUp );
		};

		document.addEventListener( 'mousemove', handleMouseMove );
		document.addEventListener( 'mouseup', handleMouseUp );
	}, [ field.columns, update ] );

	if ( !field.type ) {
		return;
	}

	const FieldType = lazy( () => import( `./FieldTypePreview/${ ucwords( field.type, '_', '' ) }` ) );

	console.debug( `%c  Field ${ field._id }`, "color:orange" );

	return (
		<div className={ `
			mb-field-wrapper
			${ MbbApp.extensions.columns && hasCustomColumns ? `mb-field-wrapper--columns mb-field-wrapper--columns-${ field.columns || 12 }` : '' }
		` }>
			<div
				className={ `
					mb-field
					mb-field--${ field.type }
					${ field._active ? 'mb-field--active' : '' }
				` }
				id={ `mb-field-${ field._id }` }
				onClick={ toggleSettings }
				onContextMenu={ handleContextMenu }
				onMouseEnter={ handleMouseEnter }
				onMouseLeave={ handleMouseLeave }
				title={ __( 'Click to show field settings. Drag and drop to reorder fields.', 'meta-box-builder' ) }
			>
				{ ( field._active || hover ) && <Toolbar field={ field } { ...fieldActions } /> }
				{
					hover && MbbApp.extensions.columns && (
						<div
							ref={ resizeRef }
							className="mb-field-resize-handle"
							onMouseDown={ handleResizeStart }
							title={ __( 'Drag to resize field width', 'meta-box-builder' ) }
						/>
					)
				}
				<Base field={ field } { ...fieldActions } updateField={ update }>
					<Suspense fallback={ null }>
						<FieldType field={ field } parent={ parent } />
					</Suspense>
				</Base>
				<Field field={ field } parent={ parent } updateField={ update } />
			</div>
		</div>
	);
};

export default memo( Node, ( prev, next ) => {
	delete prev.field.fields;
	delete next.field.fields;

	return prev.parent === next.parent && isEqual( prev.field, next.field );
} );
