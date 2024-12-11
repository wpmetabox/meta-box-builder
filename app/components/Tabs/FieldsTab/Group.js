import clsx from "clsx";
import { ReactSortable } from 'react-sortablejs';
import useApi from "../../../hooks/useApi";
import FieldSettings from "../../Sidebar/FieldSettings";
import Node from './Node';

const Group = ( { id, field, parent = '', nameIdData, groupData } ) => {
	const {
		fields,
		removeField,
		duplicateField,
		setFields,
	} = groupData;

	const fieldTypes = useApi( 'field-types', {} );

	if ( !fieldTypes.hasOwnProperty( field.type ) ) {
		return;
	}

	const controls = [ ...fieldTypes[ field.type ].controls ];

	return (
		<>
			<FieldSettings
				id={ id }
				controls={ controls }
				field={ field }
				parent={ parent }
				nameIdData={ nameIdData }
			/>

			<div className={ clsx( 'og-group-fields', fields.length === 0 && 'og-group-fields--empty' ) }>
				{
					fields.length > 0 &&
					<>
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
									fields.map( ( field, index ) => <Node
										key={ field._id }
										id={ field._id }
										field={ field }
										parent={ `${ parent }[${ id }][fields]` }
										removeField={ removeField }
										duplicateField={ duplicateField }
									/> )
								}
							</ReactSortable>
						</div>
					</>
				}
			</div>
		</>
	);
};

export default Group;
