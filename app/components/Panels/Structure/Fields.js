import { __ } from "@wordpress/i18n";
import { ReactSortable } from 'react-sortablejs';
import useApi from "../../../hooks/useApi";
import getList from "../../../list-functions";
import Node from './Node';

const Fields = () => {
	const { fields, setFields, ...fieldActions } = getList( 'root' )();

	// Don't render any field if fields data is not available.
	const types = useApi( 'field-types', {} );
	const categories = useApi( 'field-categories', [] );

	if ( Object.keys( types ).length === 0 || Object.keys( categories ).length === 0 ) {
		return <p className="og-none">{ __( 'Loading fields, please wait...', 'meta-box-builder' ) }</p>;
	}

	if ( !fields || fields.length === 0 ) {
		return <p className="og-none">{ __( 'There are no fields here. Add a new field from the list on the right panel.', 'meta-box-builder' ) }</p>;
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