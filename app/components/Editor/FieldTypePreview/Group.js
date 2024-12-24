import { ReactSortable } from 'react-sortablejs';
import useLists from '../../../hooks/useLists';
import Node from '../Node';

const Group = ( { field, parent } ) => {
	const { getForList } = useLists();
	const { fields, setFields, ...fieldActions } = getForList( field._id );

	return (
		<>
			<CollapsibleElements field={ field } />

			{
				fields.length > 0 &&
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
							{ ...fieldActions }
						/> )
					}
				</ReactSortable>
			}
		</>
	);
};

const CollapsibleElements = ( { field } ) => {
};

export default Group;