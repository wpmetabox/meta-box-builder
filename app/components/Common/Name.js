import slugify from 'slugify';
import { FieldIdsContext } from '../../contexts/FieldIdsContext';
import { getFieldValue } from '../../functions';
import useDebounce from '../../hooks/useDebounce';
import DivRow from './DivRow';

const { __ } = wp.i18n;
const { useContext, useEffect, useState } = wp.element;

const Name = ( { name, componentId, defaultValue, ...rest } ) => {
	const { updateFieldId } = useContext( FieldIdsContext );
	const [ value, setValue ] = useState( '' );
	const debounceValue = useDebounce( value );

	// Update conditional logic.
	useEffect( () => {
		const key = name.replace( /\[[^\]]+?\]$/, '' );
		let field = getFieldValue( key );

		updateFieldId( rest.fieldId, field );
	}, [ debounceValue ] );

	const onChange = e => {
		setValue( e.target.value );

		// Update field header bar.
		const titleElement = document.getElementById( `og-item__title__${ rest.fieldId }` );
		if ( titleElement ) {
			titleElement.textContent = e.target.value || __( '(No label)', 'meta-box-builder' );
		}

		// Auto generate ID.
		const idElement = document.getElementById( `fields-${ rest.fieldId }-id` );
		if ( idElement ) {
			idElement.value = slugify( e.target.value, { lower: true, replacement: '_' } );
		}
	};

	return (
		<DivRow htmlFor={ componentId } { ...rest }>
			<input autoFocus type="text" id={ componentId } defaultValue={ defaultValue } name={ name } onChange={ onChange } />
		</DivRow>
	);
};
export default Name;