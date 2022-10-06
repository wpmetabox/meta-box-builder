import { RawHTML } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import { ReactSortable } from 'react-sortablejs';
import { get } from "../../functions";
import useFields from "../../hooks/useFields";
import { Inserter } from './FieldsTab/Inserter';
import Node from './FieldsTab/Node';

const Fields = props => {
	const {
		fields,
		addField,
		removeField,
		duplicateField,
		updateFieldType,
		setFields,
	} = useFields( Object.values( props.fields ), 'fields' );

	// Don't render any field if fields data is not available.
	const fieldTypes = get( 'field-types' ) || {};
	if ( Object.keys( fieldTypes ).length === 0 ) {
		return <p className="og-none">{ __( 'Loading fields, please wait...', 'meta-box-builder' ) }</p>;
	}

	return (
		<>
			{
				fields.length === 0 &&
				<RawHTML className="og-none">{ __( 'There are no fields here. Click the <strong>+ Add Field</strong> to add a new field.', 'meta-box-builder' ) }</RawHTML>
			}
			<ReactSortable className="og-fields" list={ fields } setList={ setFields } handle=".og-item__header">
				{
					fields.map( ( field, index ) => <Node
						key={ field._id }
						id={ field._id }
						field={ field }
						removeField={ removeField }
						duplicateField={ duplicateField }
						updateFieldType={ updateFieldType }
					/> )
				}
			</ReactSortable>
			<Inserter addField={ addField } />
		</>
	);
};

export default Fields;