import dotProp from 'dot-prop';
import { ucwords } from '../../../functions';
import Field from './Field';
import Group from './Group';
const { useState, memo } = wp.element;
const { Dashicon } = wp.components;
const { __ } = wp.i18n;

const Node = ( { id, field, parent = '', removeField, duplicateField, updateFieldType } ) => {
	const [ expanded, setExpanded ] = useState( 'expanded' === dotProp.get( field, '_state', 'expanded' ) );
	const toggleSettings = () => setExpanded( prev => !prev );

	const remove = e => {
		e.stopPropagation();
		removeField( id );
	};

	const duplicate = e => {
		e.stopPropagation();
		duplicateField( id );
	};

	let label = [ 'hidden', 'divider' ].includes( field.type ) ? ucwords( field.type ) : field.name || __( '(No label)', 'meta-box-builder' );

	return <div className={ `og-item og-collapsible${ expanded ? ' og-collapsible--expanded' : '' }` }>
		<input type="hidden" name={ `fields${ parent }[${ id }][_id]` } defaultValue={ id } />
		<input type="hidden" name={ `fields${ parent }[${ id }][_state]` } defaultValue={ expanded ? 'expanded' : 'collapsed' } />
		<div className="og-item__header og-collapsible__header" onClick={ toggleSettings } title={ __( 'Click to reveal field settings. Drag and drop to reorder fields.', 'meta-box-builder' ) }>
			<span className="og-item__title" id={ `og-item__title__${ id }` }>{ label }</span>
			<span className="og-item__actions">
				<span className="og-item__type">{ field.type }</span>
				<span className="og-item__action og-item__action--remove" title={ __( 'Remove', 'meta-box-builder' ) } onClick={ remove }><Dashicon icon="trash" /></span>
				<span className="og-item__action og-item__action--duplicate" title={ __( 'Duplicate', 'meta-box-builder' ) } onClick={ duplicate }><Dashicon icon="admin-page" /></span>
				<span className="og-item__action og-item__action--toggle" title={ __( 'Toggle settings', 'meta-box-builder' ) }><Dashicon icon="arrow-down" /></span>
			</span>
		</div>
		{
			field.type === 'group'
				? <Group id={ id } field={ field } parent={ parent } updateFieldType={ updateFieldType } />
				: <Field id={ id } field={ field } parent={ parent } updateFieldType={ updateFieldType } />
		}
	</div>;
};

export default memo( Node, ( prevProps, nextProps ) => nextProps.field.type !== 'group' && prevProps.id === nextProps.id && prevProps.field.type === nextProps.field.type );
