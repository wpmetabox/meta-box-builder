import dotProp from 'dot-prop';
import { useFormContext } from 'react-hook-form';
import FieldSelected from './FieldSelected';
import Group from './Group';
import Header from './Header';
const { useState, memo } = wp.element;

const Node = ( { id, field, parent = '', removeField, duplicateField } ) => {
	const [ expanded, setExpanded ] = useState( dotProp.get( field, 'expanded', true ) );
	const toggleSettings = () => setExpanded( prev => !prev );
	const { register } = useFormContext();

	return <div className={ `og-item og-item--${ field.type } og-collapsible${ expanded ? ' og-collapsible--expanded' : '' }` }>
		<input ref={ register } type="checkbox" readOnly style={ { display: 'none' } } name={ `fields${ parent }[${ id }][expanded]` } checked={ expanded } />
		<input ref={ register } type="hidden" name={ `fields${ parent }[${ id }][type]` } defaultValue={ field.type } />
		<Header
			id={ id }
			type={ field.type }
			name={ field.name || __( '(No label)', 'meta-box-builder' ) }
			toggleSettings={ toggleSettings }
			removeField={ removeField }
			duplicateField={ duplicateField }
		/>
		{
			field.type === 'group'
				? <Group id={ id } field={ field } parent={ parent } />
				: <FieldSelected id={ id } field={ field } parent={ parent } />
		}
	</div>;
};

export default memo( Node, ( prevProps, nextProps ) => nextProps.field.type !== 'group' && prevProps.id === nextProps.id );
