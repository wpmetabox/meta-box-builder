import { useFormContext } from 'react-hook-form';
import FieldSelected from './FieldSelected';
import Group from './Group';
import Header from './Header';
const { useState, memo } = wp.element;

const Node = ( { item, changeSelectedList, parent, index, children } ) => {
	const [ expanded, setExpanded ] = useState( !!item.expanded );
	const toggleSettings = () => setExpanded( prev => !prev );
	const { register } = useFormContext();

	return <div className={ `og-item og-item--${ item.type } og-collapsible${ expanded ? ' og-collapsible--expanded' : '' }` }>
		<input ref={ register } type="checkbox" readOnly style={ { display: 'none' } } name={ `fields[${ item.id }][expanded]` } checked={ expanded } />
		<input ref={ register } type="hidden" name={ `fields[${ item.id }][type]` } defaultValue={ item.type } />
		<Header
			type={ item.type }
			id={ item.id }
			toggleSettings={ toggleSettings }
			changeSelectedList={ changeSelectedList }
			parent={ parent }
			index={ index }
		/>
		{
			item.type === 'group'
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
				/>
		}
	</div>;
};

export default memo( Node, ( prevProps, nextProps ) => nextProps.item.type !== 'group' && prevProps.id === nextProps.id );
