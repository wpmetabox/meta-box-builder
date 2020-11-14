import { useFormContext } from 'react-hook-form';
import slugify from 'slugify';
import { actions as ConditionalActions } from '../../context/ConditionalList/ConditionalContext';
import DivRow from './DivRow';

const { __ } = wp.i18n;
const { useEffect } = wp.element;

const Name = ( { name, componentId, ...rest } ) => {
	const { register } = useFormContext();

	useEffect( () => {
		document.getElementById( `og-item__title__${ rest.fieldId }` ).textContent = rest.defaultValue || __( '(No label)', 'meta-box-builder' );
	}, [] );

	const onChange = e => {
		document.getElementById( `og-item__title__${ rest.fieldId }` ).textContent = e.target.value || __( '(No label)', 'meta-box-builder' );
		document.getElementById( `fields-${ rest.fieldId }-id` ).value = slugify( e.target.value, { lower: true, replacement: '_' } );
		ConditionalActions.updateConditionalList( { [ rest.fieldId ]: { label: e.target.value, id: e.target.value } } );

	};

	return (
		<DivRow htmlFor={ componentId } { ...rest }>
			<input type="text" id={ componentId } defaultValue={ rest.defaultValue } name={ name } ref={ register } onChange={ onChange } />
		</DivRow>
	);
};
export default Name;