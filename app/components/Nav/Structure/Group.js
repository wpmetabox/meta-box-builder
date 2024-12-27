import { ReactSortable } from 'react-sortablejs';
import useLists from "../../../hooks/useLists";
import Node from './Node';

const Group = ( { field, parent = '' } ) => {
	const { getForList } = useLists();
	const { fields, setFields, ...fieldActions } = getForList( field._id );

	return (
		<div className="og-group-fields">
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
				className="og-group-fields__inner"
			>
				{
					fields.map( f => <Node
						key={ f._id }
						field={ f }
						parent={ `${ parent }[${ field._id }][fields]` }
						{ ...fieldActions }
					/> )
				}
			</ReactSortable>
		</div>
	);
};

export default Group;
