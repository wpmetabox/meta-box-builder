import { lazy, memo, Suspense, useCallback, useEffect, useRef, useState } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import { isEqual } from 'lodash';
import { inside, ucwords } from "../../functions";
import useColumns from "../../hooks/useColumns";
import { useFetch } from "../../hooks/useFetch";
import useNavPanel from "../../hooks/useNavPanel";
import { setFieldActive } from "../../list-functions";
import Base from "./FieldTypePreview/Base";
import Toolbar from "./Toolbar";

const isClickedOnAField = e => inside( e.target, '.mb-field' ) && !inside( e.target, '.mb-toolbar' ) && !inside( e.target, '[contentEditable]' );

const FieldPreview = ( { field: f, parent = '', ...fieldActions } ) => {
	let { data: fieldTypes } = useFetch( { api: 'field-types', defaultValue: {} } );
	fieldTypes = Object.fromEntries(
		Object.entries( fieldTypes ).filter( ( [ type, field ] ) => !field.disabled )
	);

	const [ hover, setHover ] = useState( false );
	const [ resizing, setResizing ] = useState( false );
	const setNavPanel = useNavPanel( state => state.setNavPanel );
	const { hasCustomColumns } = useColumns();
	const ref = useRef();

	const field = normalize( f );

	const toggleSettings = e => {
		if ( !isClickedOnAField( e ) ) {
			return;
		}

		// Make it able to select sub-fields in a group, and do not select parent field.
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

	useEffect( () => {
		const handleMouseMove = e => {
			if ( !ref.current ) {
				return;
			}

			// List all elements from the inside out.
			const path = e.composedPath?.() || [];

			// Find the first element with class "mb-field" from the inside out
			const hoveredField = path.find( el => el?.classList?.contains( 'mb-field' ) );

			// Set hover state to true if the hovered field is the current field, not the sub-field.
			setHover( hoveredField === ref.current );
		};

		window.addEventListener( 'mousemove', handleMouseMove );
		return () => window.removeEventListener( 'mousemove', handleMouseMove );
	}, [] );

	const handleResizeStart = useCallback( e => {
		e.preventDefault();
		e.stopPropagation();
		setResizing( true );
		document.body.classList.add( 'mb-resizing' ); // To show the cursor col-resize

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
			setResizing( false );
			document.body.classList.remove( 'mb-resizing' ); // To hide the cursor col-resize when the cursor is outside the field
			document.removeEventListener( 'mousemove', handleMouseMove );
			document.removeEventListener( 'mouseup', handleMouseUp );
		};

		document.addEventListener( 'mousemove', handleMouseMove );
		document.addEventListener( 'mouseup', handleMouseUp );
	}, [ field.columns, update ] );

	const FieldType = lazy( () => import( `./FieldTypePreview/${ ucwords( field.type, '_', '' ) }` ) );

	console.debug( `%c  Field ${ field._id }`, "color:orange" );

	const hovering = hover || resizing;
	const showActions = field._active || hovering;

	return field.type && fieldTypes.hasOwnProperty( field.type ) && (
		<div className={ `
			mb-field-wrapper
			${ MbbApp.extensions.columns && hasCustomColumns() ? `mb-field-wrapper--columns mb-field-wrapper--columns-${ field.columns || 12 }` : '' }
		` }>
			<div
				ref={ ref }
				className={ `
					mb-field
					mb-field--${ field.type }
					${ field._active ? 'mb-field--active' : '' }
					${ hovering ? 'mb-field--hover' : '' }
					${ resizing ? 'mb-field--resizing' : '' }
				` }
				id={ `mb-field-${ field._id }` }
				onClick={ toggleSettings }
			>
				<Toolbar show={ hovering } field={ field } { ...fieldActions } />
				{
					MbbApp.extensions.columns && showActions && (
						<div
							className="mb-field-resize-handle"
							onMouseDown={ handleResizeStart }
							title={ __( 'Drag to resize the field', 'meta-box-builder' ) }
						/>
					)
				}
				<Base field={ field } { ...fieldActions } updateField={ update }>
					<Suspense fallback={ null }>
						<FieldType field={ field } parent={ parent } updateField={ update } />
					</Suspense>
				</Base>
			</div>
		</div>
	);
};

const normalize = f => {
	const { data: fieldTypes } = useFetch( { api: 'field-types', defaultValue: {} } );

	let field = { ...f };

	// Safe fallback to 'text' for not-recommended HTML5 field types.
	const ignore = [ 'datetime-local', 'month', 'tel', 'week' ];

	if ( ignore.includes( field.type ) ) {
		field.type = 'text';
	}

	if ( field.type === 'key_value' ) {
		field.clone = true;
	}

	let classNames = ( field.class || '' ).split( ' ' );

	if ( field.type === 'group' ) {
		if ( field.collapsible ) {
			classNames.push( 'rwmb-group-collapsible' );
		}
		if ( !field.clone ) {
			classNames.push( 'rwmb-group-non-cloneable' );
		}
	}

	if ( field.type === 'text_list' && !field.clone ) {
		classNames.push( 'rwmb-text_list-non-cloneable' );
	}

	field.class = [ ...new Set( classNames ) ].join( ' ' );

	return field;
};

// Still need to memoize the field preview because group loads this component separately for each sub-field.
export default memo( FieldPreview, ( prev, next ) => {
	delete prev.field.fields;
	delete next.field.fields;

	return prev.parent === next.parent && isEqual( prev.field, next.field );
} );