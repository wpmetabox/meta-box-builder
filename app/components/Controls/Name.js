import slugify from 'slugify';
import { FieldIdsContext } from '../../contexts/FieldIdsContext';
import { getFieldValue } from '../../functions';
import useDebounce from '../../hooks/useDebounce';
import DivRow from './DivRow';

const { __ } = wp.i18n;
const { useContext, useEffect, useRef, useState } = wp.element;

const Name = ( { name, componentId, defaultValue, _new, ...rest } ) => {
	const { updateFieldId } = useContext( FieldIdsContext );
	const [ value, setValue ] = useState( '' );
	const debounceValue = useDebounce( value );
	const isFirstEdit = useRef( _new );

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

		// Auto generate ID only when edit the label first time. E.g. don't generate when it's blur or after save.
		if ( ! isFirstEdit.current ) {
			return;
		}
		const idElement = document.getElementById( `fields-${ rest.fieldId }-id` );
		if ( idElement ) {
			idElement.value = slugify( e.target.value, { lower: true, replacement: '_' } );
		}
	};

	const onBlur = () => isFirstEdit.current = false;

	return (
		<DivRow htmlFor={ componentId } { ...rest }>
			<input autoFocus type="text" id={ componentId } defaultValue={ defaultValue } name={ name } onChange={ onChange } onBlur={ onBlur } />
		</DivRow>
	);
};
export default Name;