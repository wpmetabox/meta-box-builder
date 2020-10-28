import FieldSelected from './FieldSelected';
import Group from './Group';
const { memo } = wp.element;

const Node = ( props ) => {
	const { id, data, changeSelectedList, parent, index } = props;

	return data.type === 'group'
		?
		<Group
			{ ...data }
			id={ id }
			parent={ parent }
			index={ index }
			changeSelectedList={ changeSelectedList }
		/>
		: <FieldSelected
			{ ...data }
			id={ id }
			parent={ parent }
			index={ index }
			changeSelectedList={ changeSelectedList }
		/>;
};

export default memo( Node, ( prevProps, nextProps ) => prevProps.id === nextProps.id );
