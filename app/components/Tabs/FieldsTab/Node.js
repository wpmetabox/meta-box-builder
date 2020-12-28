import dotProp from 'dot-prop';
import FieldSelected from './FieldSelected';
import Group from './Group';
const { useState, memo } = wp.element;
const { Dashicon } = wp.components;
const { __ } = wp.i18n;

const Node = ( { id, field, parent = '', index, removeField, duplicateField, moveField } ) => {
	const [ expanded, setExpanded ] = useState( dotProp.get( field, 'expanded', true ) );
	const toggleSettings = () => setExpanded( prev => !prev );

	const remove = e => {
		e.stopPropagation();
		removeField( id );
	};

	const duplicate = e => {
		e.stopPropagation();
		duplicateField( id );
	};

	const moveUp = e => {
		e.stopPropagation();
		moveField( index, 'up' );
	};

	const moveDown = e => {
		e.stopPropagation();
		moveField( index, 'down' );
	};

	return <div
		className={ `og-item og-collapsible${ expanded ? ' og-collapsible--expanded' : '' }` }
		title={ __( 'Click to reveal field settings.', 'meta-box-builder' ) }
	>
		<input type="hidden" name={ `fields${ parent }[${ id }][_id]` } defaultValue={ id } />
		<input type="hidden" name={ `fields${ parent }[${ id }][type]` } defaultValue={ field.type } />
		<input type="checkbox" readOnly style={ { display: 'none' } } name={ `fields${ parent }[${ id }][expanded]` } checked={ expanded } />
		<div className="og-item__header og-collapsible__header" onClick={ toggleSettings }>
			<span className="og-item__title" id={ `og-item__title__${ id }` }>{ field.name || __( '(No label)', 'meta-box-builder' ) }</span>
			<span className="og-item__actions">
				<span className="og-item__type">{ field.type }</span>
				<span className="og-item__action og-item__action--remove" title={ __( 'Remove', 'meta-box-builder' ) } onClick={ remove }><Dashicon icon="trash" /></span>
				<span className="og-item__action og-item__action--duplicate" title={ __( 'Duplicate', 'meta-box-builder' ) } onClick={ duplicate }><Dashicon icon="admin-page" /></span>
				<span className="og-item__action og-item__action--up" title={ __( 'Move up', 'meta-box-builder' ) } onClick={ moveUp }><Dashicon icon="arrow-up-alt2" /></span>
				<span className="og-item__action og-item__action--down" title={ __( 'Move down', 'meta-box-builder' ) } onClick={ moveDown }><Dashicon icon="arrow-down-alt2" /></span>
				<span className="og-item__action og-item__action--toggle" title={ __( 'Toggle settings', 'meta-box-builder' ) }><Dashicon icon="arrow-down" /></span>
			</span>
		</div>
		{
			field.type === 'group'
				? <Group id={ id } field={ field } parent={ parent } />
				: <FieldSelected id={ id } field={ field } parent={ parent } />
		}
	</div>;
};

export default memo( Node, ( prevProps, nextProps ) => nextProps.field.type !== 'group' && prevProps.id === nextProps.id && prevProps.index === nextProps.index );
