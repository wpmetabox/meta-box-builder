import { useFormContext } from 'react-hook-form';
import slugify from 'slugify';
import { ConditionalLogicContext } from '../../contexts/ConditionalLogicContext';
import useDebounce from '../../hooks/useDebounce';
import DivRow from './DivRow';

const { __ } = wp.i18n;
const { useContext, useEffect, useState } = wp.element;

const Name = ( { name, componentId, defaultValue, ...rest } ) => {
	const { register } = useFormContext();
	const { updateConditionalLogic } = useContext( ConditionalLogicContext );
	const [ value, setValue ] = useState( '' );
	const debounceValue = useDebounce( value );

	useEffect( () => {
		const idElement = document.getElementById( `fields-${ rest.fieldId }-id` );
		if ( idElement && ( debounceValue || defaultValue ) ) {
			updateConditionalLogic( rest.fieldId, { id: idElement.value, name: debounceValue || defaultValue } );
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
			<input autoFocus type="text" id={ componentId } defaultValue={ defaultValue } name={ name } ref={ register } onChange={ onChange } />
		</DivRow>
	);
};
export default Name;