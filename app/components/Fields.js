import { RawHTML } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import { ReactSortable } from 'react-sortablejs';
import useApi from "../hooks/useApi";
import useLists from "../hooks/useLists";
import Header from "./Tabs/FieldsTab/Header";
import { Inserter } from './Tabs/FieldsTab/Inserter';
import Node from './Tabs/FieldsTab/Node';

const Fields = () => {
	const { getForList } = useLists();
	const { fields, setFields, addField, ...fieldActions } = getForList( 'root' );

	// Don't render any field if fields data is not available.
	const types = useApi( 'field-types', {} );
	const categories = useApi( 'field-categories', [] );

	if ( Object.keys( types ).length === 0 || Object.keys( categories ).length === 0 ) {
		return <p className="og-none">{ __( 'Loading fields, please wait...', 'meta-box-builder' ) }</p>;
	}

	return !fields || fields.length === 0 ?
		<>
			<RawHTML className="og-none">{ __( 'There are no fields here. Click the <strong>+ Add Field</strong> to add a new field.', 'meta-box-builder' ) }</RawHTML>
			<Inserter addField={ addField } />
		</>
		: <>
			<Header />
			<ReactSortable group={ {
				name: 'root',
				pull: true,
				put: true,
			} }
				animation={ 200 }
				delayOnTouchStart={ true }
				delay={ 2 }
				className="og-fields"
				list={ fields }
				setList={ setFields }
				handle=".og-column--drag"
			>
				{
					fields.map( field => <Node
						key={ field._id }
						field={ field }
						{ ...fieldActions }
					/> )
				}
			</ReactSortable>
			<Inserter addField={ addField } />
		</>;
};

export default Fields;