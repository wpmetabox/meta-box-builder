import { ReactSortable } from 'react-sortablejs';
import useApi from "../../../hooks/useApi";
import useLists from "../../../hooks/useLists";
import FieldSettings from "../../Sidebar/FieldSettings";
import Node from './Node';

const Group = ( { field, parent = '', updateField } ) => {
	const { getForList } = useLists();
	const { fields, removeField, updateField: updateSubField, duplicateField, setFields } = getForList( field._id );

	const fieldTypes = useApi( 'field-types', {} );

	if ( !fieldTypes.hasOwnProperty( field.type ) ) {
		return;
	}

	const controls = [ ...fieldTypes[ field.type ].controls ];

	return (
		<>
			<FieldSettings
				controls={ controls }
				field={ field }
				parent={ parent }
				updateField={ updateField }
			/>

			{
				fields.length > 0 &&
				<div className="og-group-fields">
					<div className="og-group-fields__inner">
						<ReactSortable
							group={ {
								name: 'nested',
								pull: true,
								put: [ 'root', 'nested' ],
							} }
							animation={ 200 }
							delayOnTouchStart={ true }
							delay={ 2 }
							list={ fields }
							setList={ setFields }
							handle=".og-item__header"
						>
							{
								fields.map( f => <Node
									key={ f._id }
									field={ f }
									parent={ `${ parent }[${ field._id }][fields]` }
									removeField={ removeField }
									duplicateField={ duplicateField }
									updateField={ updateSubField }
								/> )
							}
						</ReactSortable>
					</div>
				</div>
			}
		</>
	);
};

export default Group;
