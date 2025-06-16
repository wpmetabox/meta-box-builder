import { useEffect, useRef } from '@wordpress/element';
import { sanitizeId } from '../functions';
import DivRow from './DivRow';

const Name = ( { componentId, field, updateField, ...rest } ) => {
	const inputRef = useRef();

	const handleChange = e => {
		const value = e.target.value;
		updateField( 'name', value );

		// Only generate ID if it's a new field and hasn't been manually changed
		if ( field._new && !field._id_changed && ![ 'custom_html', 'divider', 'heading' ].includes( field.type ) ) {
			updateField( 'id', sanitizeId( value ) );
		}
	};

	// When done updating "name", don't auto generate ID.
	const stopGeneratingId = () => updateField( '_id_changed', true );

	// Use ref to manually update its value, avoid React touching the input value directly to avoid cursor jumping to the start.
	useEffect( () => {
		if ( inputRef.current && inputRef.current.value !== field.name ) {
			inputRef.current.value = field.name;
		}
	}, [ field.name ] );

	return (
		<DivRow htmlFor={ componentId } { ...rest }>
			<input
				ref={ inputRef }
				type="text"
				id={ componentId }
				defaultValue={ field.name }
				onBlur={ stopGeneratingId }
				onChange={ handleChange }
			/>
		</DivRow>
	);
};

export default Name;