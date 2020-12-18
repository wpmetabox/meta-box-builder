import dotProp from 'dot-prop';
import { useFormContext } from 'react-hook-form';
import FieldSelected from './FieldSelected';
import Group from './Group';
import Header from './Header';
const { useState, memo } = wp.element;

const Node = ( { id, field, parent = '' } ) => {
	const [ expanded, setExpanded ] = useState( dotProp.get( field, 'expanded', true ) );
	const toggleSettings = () => setExpanded( prev => !prev );
	const { register } = useFormContext();

	return <div className={ `og-item og-item--${ field.type } og-collapsible${ expanded ? ' og-collapsible--expanded' : '' }` }>
		<input ref={ register } type="checkbox" readOnly style={ { display: 'none' } } name={ `fields[${ id }][expanded]` } checked={ expanded } />
		<input ref={ register } type="hidden" name={ `fields[${ id }][type]` } defaultValue={ field.type } />
		<Header type={ field.type } id={ id } toggleSettings={ toggleSettings } />
		{ field.type === 'group' ? <Group id={ id } field={ field } parent={ parent } /> : <FieldSelected id={ id } field={ field } parent={ parent } /> }
	</div>;
};

export default memo( Node, ( prevProps, nextProps ) => nextProps.field.type !== 'group' && prevProps.id === nextProps.id );
