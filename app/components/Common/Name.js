import { useFormContext } from 'react-hook-form';
import slugify from 'slugify';
import { actions as ConditionalActions } from '../../context/ConditionalList/ConditionalContext';
import useDebounce from '../../hooks/useDebounce';
import DivRow from './DivRow';

const { __ } = wp.i18n;
const { useEffect, useState } = wp.element;

const Name = ( { name, componentId, ...rest } ) => {
	const { register } = useFormContext();
	const [ value, setValue ] = useState( '' );
	const debounceValue = useDebounce( value );

	useEffect( () => {
		document.getElementById( `og-item__title__${ rest.fieldId }` ).textContent = rest.defaultValue || __( '(No label)', 'meta-box-builder' );
	}, [] );

	useEffect( () => {
		const idElement = document.getElementById( `fields-${ rest.fieldId }-id` );
		if ( idElement && ( debounceValue || rest.defaultValue ) ) {
			ConditionalActions.updateConditionalList( 'add', { [ rest.fieldId ]: { label: debounceValue || rest.defaultValue, id: idElement.value } } );
		}
	}, [ debounceValue ] );

	const onChange = e => {
		setValue( e.target.value );
		const idElement = document.getElementById( `fields-${ rest.fieldId }-id` );
		const titleElement = document.getElementById( `og-item__title__${ rest.fieldId }` );
		if ( titleElement ) {
			titleElement.textContent = e.target.value || __( '(No label)', 'meta-box-builder' );
		}
		if ( idElement ) {
			idElement.value = slugify( e.target.value, { lower: true, replacement: '_' } );
		}

	};

	return (
		<DivRow htmlFor={ componentId } { ...rest }>
			<input autoFocus type="text" id={ componentId } defaultValue={ rest.defaultValue } name={ name } ref={ register } onChange={ onChange } />
		</DivRow>
	);
};
export default Name;