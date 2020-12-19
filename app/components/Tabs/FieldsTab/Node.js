import dotProp from 'dot-prop';
import { Draggable } from 'react-beautiful-dnd';
import { useFormContext } from 'react-hook-form';
import FieldSelected from './FieldSelected';
import Group from './Group';
const { useState, memo } = wp.element;
const { Dashicon } = wp.components;
const { __ } = wp.i18n;

const Node = ( { id, field, parent = '', index, removeField, duplicateField } ) => {
	const [ expanded, setExpanded ] = useState( dotProp.get( field, 'expanded', true ) );
	const toggleSettings = () => setExpanded( prev => !prev );
	const { register } = useFormContext();

	return <Draggable draggableId={ id } index={ index }>
		{ ( provided, snapshot ) => (
			<div
				className={ `og-item og-collapsible${ expanded ? ' og-collapsible--expanded' : '' }${ snapshot.isDragging ? ' og-item--dragging' : '' }` }
				{ ...provided.draggableProps }
			>
				<input ref={ register } type="hidden" name={ `fields${ parent }[${ id }][_id]` } defaultValue={ id } />
				<input ref={ register } type="hidden" name={ `fields${ parent }[${ id }][type]` } defaultValue={ field.type } />
				<input ref={ register } type="checkbox" readOnly style={ { display: 'none' } } name={ `fields${ parent }[${ id }][expanded]` } checked={ expanded } />
				<div className="og-item__header og-collapsible__header">
					<span
						className="og-item__handle"
						title={ __( 'Drag this field to reorder', 'meta-box-builder' ) }
						ref={ provided.innerRef }
						{ ...provided.dragHandleProps }
					>
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M7 10H11V14H7zM7 4H11V8H7zM7 16H11V20H7zM13 10H17V14H13zM13 4H17V8H13zM13 16H17V20H13z" /></svg>
					</span>
					<span className="og-item__title" id={ `og-item__title__${ id }` }>{ field.name || __( '(No label)', 'meta-box-builder' ) }</span>
					<span className="og-item__actions">
						<span className="og-item__type">{ field.type }</span>
						<span className="og-item__action og-item__action--remove" title={ __( 'Remove', 'meta-box-builder' ) } onClick={ () => removeField( id ) }><Dashicon icon="trash" /></span>
						<span className="og-item__action og-item__action--duplicate" title={ __( 'Duplicate', 'meta-box-builder' ) } onClick={ () => duplicateField( id ) }><Dashicon icon="admin-page" /></span>
						<span className="og-item__action og-item__action--toggle" title={ __( 'Toggle settings', 'meta-box-builder' ) } onClick={ toggleSettings }><Dashicon icon="arrow-down-alt2" /></span>
					</span>
				</div>
				{
					field.type === 'group'
						? <Group id={ id } field={ field } parent={ parent } />
						: <FieldSelected id={ id } field={ field } parent={ parent } />
				}
			</div>
		) }
	</Draggable>;
};

export default memo( Node, ( prevProps, nextProps ) => nextProps.field.type !== 'group' && prevProps.id === nextProps.id );
