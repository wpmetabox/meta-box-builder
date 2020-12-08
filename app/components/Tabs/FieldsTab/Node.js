import FieldSelected from './FieldSelected';
import Group from './Group';
const { memo } = wp.element;

const Node = ( { item, changeSelectedList, parent, index } ) => {
	return item.type === 'group'
		? <Group
			{ ...item }
			parent={ parent }
			index={ index }
			changeSelectedList={ changeSelectedList }
		/>
		: <FieldSelected
			{ ...item }
			parent={ parent }
			index={ index }
			changeSelectedList={ changeSelectedList }
		/>;
};

export default memo( Node, ( prevProps, nextProps ) => nextProps.item.type !== 'group' && prevProps.id === nextProps.id );
