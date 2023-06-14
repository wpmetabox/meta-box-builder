import { memo, useReducer } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import { Icon, chevronDown, copy, dragHandle, trash } from "@wordpress/icons";
import { ucwords } from '../../../functions';
import Field from './Field';
import Group from './Group';

const Collapsible = ( { header, body } ) => {
	const [ expanded, toggle ] = useReducer( expanded => !expanded, false );

	return <div className={ `og-item og-collapsible${ expanded ? ' og-collapsible--expanded' : '' }` }>
		<div className="og-item__header og-collapsible__header" onClick={ toggle } title={ __( 'Click to reveal field settings. Drag and drop to reorder fields.', 'meta-box-builder' ) }>
			{ header }
		</div>
		{ body }
	</div>;
};

const Node = ( { id, field, parent = '', removeField, duplicateField, updateFieldType } ) => {
	const remove = e => {
		e.stopPropagation();
		if ( confirm( __( 'Do you really want to remove this field?', 'meta-box-builder' ) ) ) {
			removeField( id );
		}
	};

	const duplicate = e => {
		e.stopPropagation();
		duplicateField( id );
	};

	let label = [ 'hidden', 'divider' ].includes( field.type ) ? ucwords( field.type ) : field.name || field.group_title || __( '(No label)', 'meta-box-builder' );

	return field.type && <Collapsible
		header={
			<>
				<span className="og-column--drag"><Icon icon={ dragHandle } /></span>
				<span className="og-item__title og-column--label" id={ `og-item__title__${ id }` }>{ label }</span>
				<span className="og-column--id">{ [ 'custom_html', 'divider', 'heading' ].includes( field.type ) ? __( 'N/A', 'meta-box-builder' ) : field.id }</span>
				<span className="og-column--type">{ field.type }</span>
				<span className="og-item__actions og-column--actions">
					<span className="og-item__action og-item__action--remove" title={ __( 'Remove', 'meta-box-builder' ) } onClick={ remove }><Icon icon={ trash } /></span>
					<span className="og-item__action og-item__action--duplicate" title={ __( 'Duplicate', 'meta-box-builder' ) } onClick={ duplicate }><Icon icon={ copy } /></span>
					<span className="og-item__action og-item__action--toggle" title={ __( 'Toggle settings', 'meta-box-builder' ) }><Icon icon={ chevronDown } /></span>
				</span>
			</>
		}
		body={
			<>
				<input type="hidden" name={ `fields${ parent }[${ id }][_id]` } defaultValue={ id } />
				{
					field.type === 'group'
						? <Group id={ id } field={ field } parent={ parent } updateFieldType={ updateFieldType } />
						: <Field id={ id } field={ field } parent={ parent } updateFieldType={ updateFieldType } />
				}
			</>
		}
	/>;
};

export default memo( Node, ( prevProps, nextProps ) => prevProps.id === nextProps.id && prevProps.field.type === nextProps.field.type );
