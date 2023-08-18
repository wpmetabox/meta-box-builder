import { useReducer } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import { Icon, copy, dragHandle, plus, reset, trash } from "@wordpress/icons";
import clsx from "clsx";
import useFieldNameId from "../../../hooks/useFieldNameId";
import useFields from "../../../hooks/useFields";
import Field from './Field';
import Group from './Group';
import HeaderId from "./HeaderId";
import HeaderLabel from "./HeaderLabel";
import { Inserter } from "./Inserter";

const Node = ( { id, field, parent = '', removeField, duplicateField, updateFieldType } ) => {
	const [ expanded, toggle ] = useReducer( state => !state, false );
	const [ showSubfields, toggleSubfields ] = useReducer( show => !show, true );
	const nameIdData = useFieldNameId( field );

	const remove = () => {
		if ( confirm( __( 'Do you really want to remove this field?', 'meta-box-builder' ) ) ) {
			removeField( id );
		}
	};

	const duplicate = () => duplicateField( id );

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
			<div className="og-item__header og-collapsible__header">
				<span className="og-column--drag og-item__move"><Icon icon={ dragHandle } /></span>
				<span className="og-column--label">
					<HeaderLabel nameIdData={ nameIdData } />
					{ groupHasFields && <span className="og-item__toggle" onClick={ toggleSubfields } title={ __( 'Toggle subfields', 'meta-box-builder' ) }>[{ showSubfields ? '-' : '+' }]</span> }
				</span>
				<span className="og-column--space og-item__move" onClick={ toggle } title={ __( 'Click to reveal field settings. Drag and drop to reorder fields.', 'meta-box-builder' ) }></span>
				<HeaderId nameIdData={ nameIdData } />
				<span className="og-column--type og-item__move" onClick={ toggle } title={ __( 'Click to reveal field settings. Drag and drop to reorder fields.', 'meta-box-builder' ) }>{ field.type }</span>
				<span className="og-column--actions og-item__actions">
					{
						field.type === 'group' && <Inserter
							addField={ groupData.add }
							type="group"
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
