import { useReducer, useRef } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import { Icon, copy, dragHandle, plus, trash } from "@wordpress/icons";
import clsx from "clsx";
import { elementIn } from '../../../functions';
import useFieldNameId from "../../../hooks/useFieldNameId";
import useFields from "../../../hooks/useFields";
import Field from './Field';
import Group from './Group';
import { Inserter } from "./Inserter";

const Node = ( { id, field, parent = '', removeField, duplicateField, updateFieldType } ) => {
	const [ expanded, toggle ] = useReducer( state => !state, false );
	const [ showSubfields, toggleSubfields ] = useReducer( show => !show, true );
	const nameIdData = useFieldNameId( field );
	const hiddenLabelRef = useRef();

	const toggleFieldSettings = e => {
		if ( !elementIn( e.target, [ 'og-item__action--remove', 'og-item__action--duplicate', 'og-inserter', 'og-item__toggle', 'og-item__title', 'dashicons' ] ) ) {
			toggle();
		}
	};

	const remove = () => {
		if ( confirm( __( 'Do you really want to remove this field?', 'meta-box-builder' ) ) ) {
			removeField( id );
		}
	};

	const duplicate = () => duplicateField( id );

	// Release when pressing "Enter" or "Escape".
	const maybeFinishEditing = e => {
		if ( ![ 'Enter', 'Escape' ].includes( e.key ) ) {
			return;
		}
		e.preventDefault();
		e.target.blur();
		nameIdData.noAutoGenerateId();
	};

	const label = [ 'hidden', 'divider' ].includes( field.type ) ? ucwords( field.type ) : nameIdData.name || field.group_title || __( '(No label)', 'meta-box-builder' );

	const groupData = field.type !== 'group' ? {} : useFields(
		Object.values( field.fields || {} ).filter( field => field.type ),
		`fields${ parent }[${ id }][fields]`
	);
	const groupHasFields = field.type === 'group' && groupData.fields.length > 0;

	return field.type && (
		<div className={ clsx(
			'og-item',
			`og-item--${ field.type }`,
			groupHasFields && 'og-item--group--has-fields',
			'og-collapsible',
			expanded && 'og-collapsible--expanded',
			!expanded && 'og-collapsible--collapsed',
			!showSubfields && 'og-item--hide-fields',
		) }>
			<input type="hidden" name={ `fields${ parent }[${ id }][_id]` } defaultValue={ id } />
			<div
				className="og-item__header og-collapsible__header"
				title={ __( 'Click to reveal field settings. Drag and drop to reorder fields.', 'meta-box-builder' ) }
				onClick={ toggleFieldSettings }
			>
				<span className="og-column--drag"><Icon icon={ dragHandle } /></span>
				<span className="og-column--label">
					<span className="og-item__hidden-label" ref={ hiddenLabelRef }>{ label }</span>
					<input
						type="text"
						className="og-item__title"
						title={ __( 'Click to edit', 'meta-box-builder' ) }
						value={ label }
						onKeyDown={ maybeFinishEditing }
						onChange={ e => nameIdData.updateName( e.target.value ) }
						onBlur={ () => nameIdData.noAutoGenerateId() }
						style={ {
							width: `${ hiddenLabelRef.current?.offsetWidth + 2}px`
						} }
					/>
					<span className="dashicons dashicons-edit"></span>
					{ groupHasFields && <span className="og-item__toggle" onClick={ toggleSubfields } title={ __( 'Toggle subfields', 'meta-box-builder' ) }>[{ showSubfields ? '-' : '+' }]</span> }
				</span>
				<span className="og-column--id">{ nameIdData.id }</span>
				<span className="og-column--type">{ field.type }</span>
				<span className="og-column--actions og-item__actions">
					{
						field.type === 'group' && <Inserter
							addField={ groupData.add }
							buttonType="secondary"
							buttonText={ <Icon icon={ plus } /> }
							title={ __( 'Add a new subfield', 'meta-box-builder' ) }
						/>
					}
					<span className="og-item__action og-item__action--duplicate" title={ __( 'Duplicate', 'meta-box-builder' ) } onClick={ duplicate }><Icon icon={ copy } /></span>
					<span className="og-item__action og-item__action--remove" title={ __( 'Remove', 'meta-box-builder' ) } onClick={ remove }><Icon icon={ trash } /></span>
				</span>
			</div>
			{
				field.type === 'group'
					? <Group id={ id } field={ field } parent={ parent } updateFieldType={ updateFieldType } nameIdData={ nameIdData } groupData={ groupData } />
					: <Field id={ id } field={ field } parent={ parent } updateFieldType={ updateFieldType } nameIdData={ nameIdData } />
			}
		</div>
	);
};

export default Node;
