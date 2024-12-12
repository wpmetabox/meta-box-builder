import { __ } from "@wordpress/i18n";
import { Icon, copy, dragHandle, trash } from "@wordpress/icons";
import clsx from "clsx";
import { inside } from "../../../functions";
import useFieldData from "../../../hooks/useFieldData";
import useFieldNameId from "../../../hooks/useFieldNameId";
import useFieldSettingsPanel from "../../../hooks/useFieldSettingsPanel";
import useLists from "../../../hooks/useLists";
import useSidebarPanel from "../../../hooks/useSidebarPanel";
import Field from './Field';
import Group from './Group';
import HeaderIcon from "./HeaderIcon";
import HeaderId from "./HeaderId";
import HeaderLabel from "./HeaderLabel";
import { Inserter } from "./Inserter";

const Node = ( { id, field, parent = '', removeField, updateField, duplicateField } ) => {
	const nameIdData = useFieldNameId( field );
	const { data, updateFieldData } = useFieldData( field );
	const { setActiveField } = useFieldSettingsPanel();
	const { setSidebarPanel } = useSidebarPanel();

	const toggleSettings = e => {
		if ( inside( e.target, '.og-item__action--toggle' ) || !inside( e.target, '.og-item__editable,.og-item__toggle,.og-item__actions,.og-column--label,.components-popover' ) ) {
			setActiveField( field );
			setSidebarPanel( 'field_settings' );
		}
	};

	const remove = () => {
		if ( confirm( __( 'Do you really want to remove this field?', 'meta-box-builder' ) ) ) {
			removeField( id );
		}
	};

	const duplicate = () => duplicateField( id );

	const { getForList } = useLists();
	const addField = field.type === 'group' ? getForList( id ).addField : undefined;

	return field.type && (
		<div className={ clsx(
			'og-item',
			`og-item--${ field.type }`,
		) }>
			<input type="hidden" name={ `fields${ parent }[${ id }][_id]` } defaultValue={ id } />
			<input type="hidden" name={ `fields${ parent }[${ id }][type]` } defaultValue={ field.type } />
			<div className="og-item__header og-collapsible__header" onClick={ toggleSettings } title={ __( 'Click to reveal field settings. Drag and drop to reorder fields.', 'meta-box-builder' ) }>
				<span className="og-column--drag"><Icon icon={ dragHandle } /></span>
				<span className="og-column--label">
					<HeaderIcon data={ data } />
					<HeaderLabel nameIdData={ nameIdData } />
				</span>
				<span className="og-column--space"></span>
				<HeaderId updateField={ updateField } fieldId={ id } defaultValue={ field.id || '' } />
				<span className="og-column--type">{ field.type }</span>
				<span className="og-column--actions og-item__actions">
					{
						field.type === 'group' && <Inserter addField={ addField } type="group" />
					}
					<span className="og-item__action og-item__action--duplicate" title={ __( 'Duplicate', 'meta-box-builder' ) } onClick={ duplicate }><Icon icon={ copy } /></span>
					<span className="og-item__action og-item__action--remove" title={ __( 'Remove', 'meta-box-builder' ) } onClick={ remove }><Icon icon={ trash } /></span>
				</span>
			</div>
			{
				field.type === 'group'
					? <Group id={ id } field={ field } parent={ parent } nameIdData={ nameIdData } updateField={ updateField } />
					: <Field id={ id } field={ field } parent={ parent } nameIdData={ nameIdData } updateFieldData={ updateFieldData } updateField={ updateField } />
			}
		</div>
	);
};

export default Node;
