import { ReactSortable } from 'react-sortablejs';
import useLists from "../../../hooks/useLists";
import Node from './Node';

const Group = ( { field, parent = '' } ) => {
	const { getForList } = useLists();
	const { fields, setFields, ...fieldActions } = getForList( field._id );

	return (
		<div className="og-group-fields">
			<ReactSortable
				className="og-group-fields__inner"
				delay={ 0 }
				delayOnTouchOnly={ false }
				touchStartThreshold={ 0 }
				animation={ 200 }
				invertSwap={ true }
				group={ {
					name: 'nested',
					pull: true, // Allow to drag fields to other lists
					put: true, // Allow to receive fields from other lists
				} }
				list={ fields }
				setList={ setFields }
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
