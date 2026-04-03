import { lazy, memo, Suspense, useCallback, useState } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import { isEqual } from 'lodash';
import { inside, ucwords } from "../../functions";
import useActiveField from "../../hooks/useActiveField";
import useColumns from "../../hooks/useColumns";
import { useFetch } from "../../hooks/useFetch";
import useFieldTypes from "../../hooks/useFieldTypes";
import useNavPanel from "../../hooks/useNavPanel";
import Base from "./FieldTypePreview/Base";
import Toolbar from "./Toolbar";

const isClickedOnAField = e => inside( e.target, '.mb-field' ) && !inside( e.target, '.mb-toolbar' ) && !inside( e.target, '[contentEditable]' );

// Cache lazy components at module level to preserve identity across re-renders.
// Without this, React.lazy() called inside the render body creates a new component
// reference each time, causing Suspense to unmount/remount and flash null.
const lazyFieldTypeCache = new Map();
const getLazyFieldType = type => {
	if ( !lazyFieldTypeCache.has( type ) ) {
		lazyFieldTypeCache.set( type, lazy( () => import( `./FieldTypePreview/${ ucwords( type, '_', '' ) }` ) ) );
	}
	return lazyFieldTypeCache.get( type );
};

const builtInFieldTypes = [
	'autocomplete',
	'background',
	'button',
	'button_group',
	'checkbox',
	'checkbox_list',
	'choice',
	'color',
	'custom_html',
	'date',
	'datetime',
	'divider',
	'email',
	'fieldset_text',
	'file',
	'file_input',
	'file_upload',
	'heading',
	'icon',
	'image',
	'image_advanced',
	'image_select',
	'image_upload',
	'input',
	'input_list',
	'key_value',
	'map',
	'media',
	'multiple_values',
	'number',
	'object_choice',
	'oembed',
	'osm',
	'password',
	'post',
	'radio',
	'range',
	'select',
	'select_advanced',
	'select_tree',
	'sidebar',
	'single_image',
	'slider',
	'switch',
	'taxonomy',
	'taxonomy_advanced',
	'text',
	'text_list',
	'textarea',
	'time',
	'url',
	'user',
	'video',
	'wysiwyg',
	'block_editor',

	// Premium field types.
	'group',
	'tab',
];

const FieldPreview = ( { field: f, parent = '', ...fieldActions } ) => {
	let { fieldTypes } = useFieldTypes();
	fieldTypes = Object.fromEntries(
		Object.entries( fieldTypes ).filter( ( [ type, field ] ) => !field.disabled )
	);

	const field = normalize( f );

	const [ resizing, setResizing ] = useState( false );
	const setNavPanel = useNavPanel( state => state.setNavPanel );
	const setFieldActive = useActiveField( state => state.setFieldActive );
	const hasCustomColumns = useColumns( state => state.hasCustomColumns() );
	const isActive = useActiveField( state => state.fieldId === field._id );

	const { data: fieldHTML } = useFetch( { api: 'field-html', params: { field }, method: 'POST' } );

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

	const FieldType = builtInFieldTypes.includes( field.type ) ? getLazyFieldType( field.type ) : null;

	return field.type && fieldTypes.hasOwnProperty( field.type ) && (
		<div className={ `
			mb-field-wrapper
			${ MbbApp.extensions.columns && hasCustomColumns ? `mb-field-wrapper--columns mb-field-wrapper--columns-${ field.columns || 12 }` : '' }
		` }>
			<div
				className={ `
					mb-field
					mb-field--${ field.type }
					${ isActive ? 'mb-field--active' : '' }
					${ resizing ? 'mb-field--resizing' : '' }
				` }
				id={ `mb-field-${ field._id }` }
				onClick={ toggleSettings }
			>
				<Toolbar show={ false } field={ field } { ...fieldActions } />
				{
					MbbApp.extensions.columns && (
						<div
							className="mb-field-resize-handle"
							onMouseDown={ handleResizeStart }
							title={ __( 'Drag to resize the field', 'meta-box-builder' ) }
						/>
					)
				}
				<Base field={ field } { ...fieldActions } updateField={ update }>
					<Suspense fallback={ null }>
						{ FieldType ? <FieldType field={ field } parent={ parent } updateField={ update } /> : <div dangerouslySetInnerHTML={ { __html: fieldHTML } } /> }
					</Suspense>
				</Base>
			</div>
		</div>
	);
};

const normalize = f => {
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
