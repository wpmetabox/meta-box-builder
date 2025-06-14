import { useCallback, useEffect, useRef, useState } from '@wordpress/element';
import { debounce } from 'lodash';
import { sanitizeId } from '../functions';
import DivRow from './DivRow';

const Name = ( { componentId, field, updateField, ...rest } ) => {
	const [ value, setValue ] = useState( field.name );

	// Live update value with incoming change, which can happen when the field is changed from FieldLabel in live preview.
	useEffect( () => {
		setValue( field.name );
	}, [ field.name ] );

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
		}, 100 ),
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
				value={ value }
				onBlur={ stopGeneratingId }
				onInput={ handleChange }
			/>
		</DivRow>
	);
};

export default Name;