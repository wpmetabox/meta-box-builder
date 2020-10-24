import FieldSelected from './FieldSelected';
import Group from './Group';
const { memo } = wp.element;

const Node = ( props ) => {
	const { item, changeSelectedList, parent, index } = props;

	return item.type === 'group'
		?
		<Group
			{ ...item }
			parent={ parent }
			indexVal={ index }
			changeSelectedList={ changeSelectedList }
		/>
		: <FieldSelected
			{ ...item }
			parent={ parent }
			indexVal={ index }
			changeSelectedList={ changeSelectedList }
		/>;
};

export default memo( Node, ( prevProps, nextProps ) => nextProps.item.type !== 'group' && prevProps.id === nextProps.id );
