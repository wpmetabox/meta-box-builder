import { useEffect, useRef, useState } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import slugify from 'slugify';
import { useFieldIdsStore } from "../contexts/FieldIdsContext";
import DivRow from './DivRow';
import { getFieldValue } from '/functions';
import useDebounce from '/hooks/useDebounce';

const Name = ( { name, componentId, defaultValue, _new, ...rest } ) => {
	const updateFieldId = useFieldIdsStore( state => state.updateFieldId );
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
		updateTitle( e.target.value );

		// Auto generate ID only when edit the label first time. E.g. don't generate when it's blur or after save.
		if ( !isFirstEdit.current ) {
			return;
		}
		const idElement = document.getElementById( `fields-${ rest.fieldId }-id` );
		if ( idElement ) {
			idElement.value = slugify( e.target.value, { lower: true, replacement: '_' } );
		}
	};

	const updateTitle = value => {
		const titleElement = document.getElementById( `og-item__title__${ rest.fieldId }` );
		if ( !titleElement ) {
			return;
		}
		if ( value ) {
			titleElement.textContent = value;
			return;
		}

		// Use group title if needed.
		const groupTitleElement = document.getElementById( `fields-${ rest.fieldId }-group_title` );
		if ( groupTitleElement && groupTitleElement.value ) {
			titleElement.textContent = groupTitleElement.value || __( '(No label)', 'meta-box-builder' );
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