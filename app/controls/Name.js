import { useCallback, useEffect, useRef, useState } from '@wordpress/element';
import { debounce } from 'lodash';
import { sanitizeId } from '../functions';
import DivRow from './DivRow';

/**
 * Fix cursor jumping to the end of the `<input>` after typing.
 * @link https://github.com/facebook/react/issues/18404#issuecomment-605294038
 */
const Name = ( { name, componentId, field, updateField, ...rest } ) => {
	const [ value, setValue ] = useState( field.name );

	// Use ref to stored latest `_id_changed` value. When this value changes, don't trigger rerender.
	const idChangedRef = useRef( field._id_changed );

	// Keep them updated when field changes
	useEffect( () => {
		idChangedRef.current = field._id_changed;
	}, [ field._id_changed ] );

	// Live update to the input, and debounce update to the field.
	const handleChange = e => setValue( e.target.value );
	const debouncedUpdate = useCallback(
		debounce( val => {
			maybeGenerateId( val );
			updateField( 'name', val );
		}, 300 ),
		[] // empty deps means it runs once
	);
	useEffect( () => {
		debouncedUpdate( value );
	}, [ value, debouncedUpdate ] );

	const maybeGenerateId = value => {
		// No ID?
		if ( [ 'custom_html', 'divider', 'heading' ].includes( field.type ) ) {
			return;
		}

		// Only do for new fields.
		if ( !field._new ) {
			return;
		}

		// If ID is already manually changed, do nothing.
		if ( idChangedRef.current ) {
			return;
		}

		updateField( 'id', sanitizeId( value ) );
	};

	// When done updating "name", don't auto generate ID.
	const stopGeneratingId = () => updateField( '_id_changed', true );

	return (
		<DivRow htmlFor={ componentId } { ...rest }>
			<input
				type="text"
				id={ componentId }
				name={ name }
				value={ value }
				onBlur={ stopGeneratingId }
				onInput={ handleChange }
			/>
		</DivRow>
	);
};

export default Name;