import { RawHTML } from '@wordpress/element';
import { __ } from "@wordpress/i18n";
import { ReactSortable } from 'react-sortablejs';
import { useFetch } from "../../../hooks/useFetch";
import getList from "../../../list-functions";
import Node from './Node';

const Fields = () => {
	const { fields, setFields, ...fieldActions } = getList( 'root' )();

	// Don't render any field if fields data is not available.
	const { data: types } = useFetch( { api: 'field-types', defaultValue: {} } );
	const { data: categories } = useFetch( { api: 'field-categories', defaultValue: [] } );

	if ( Object.keys( types ).length === 0 || Object.keys( categories ).length === 0 ) {
		return <RawHTML className="og-none">{ __( 'Loading fields, please wait...', 'meta-box-builder' ) }</RawHTML>;
	}

	if ( !fields || fields.length === 0 ) {
		return <RawHTML className="og-none">{ __( 'There are no fields here. Click the <strong>+ Add Field</strong> to add a new field.', 'meta-box-builder' ) }</RawHTML>;
	}

	return (
		<ReactSortable
			delay={ 0 }
			delayOnTouchOnly={ false }
			touchStartThreshold={ 0 }
			animation={ 200 }
			invertSwap={ true }
			group={ {
				name: 'root',
				pull: true, // Allow to drag fields to other lists
				put: true, // Allow to receive fields from other lists
			} }
			list={ fields }
			setList={ setFields }
		>
			{
				fields.map( field => <Node
					key={ field._id }
					field={ field }
					{ ...fieldActions }
				/> )
			}
		</ReactSortable>
	);
};

export default Fields;