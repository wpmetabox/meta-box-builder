import { ReactSortable } from 'react-sortablejs';
import getList from '../../../list-functions';
import Node from './Node';

const Group = ( { field, parent = '' } ) => {
	const { fields, setFields, ...fieldActions } = getList( field._id )();

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
