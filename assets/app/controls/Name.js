import { useEffect, useRef, useState } from '@wordpress/element';
import { sanitizeId } from '../functions';
import DivRow from './DivRow';

const Name = ( { componentId, field, updateField, ...rest } ) => {
	const inputRef = useRef();

	// Internal state to track if the field has been changed by this component.
	const [ changed, setChanged ] = useState( false );

	const handleChange = e => {
		const value = e.target.value;
		updateField( 'name', value );

		// Mark the field as changed by this component.
		setChanged( true );

		// Only generate ID if it's a new field and hasn't been manually changed
		if ( field._new && !field._id_changed && ![ 'custom_html', 'divider', 'heading' ].includes( field.type ) ) {
			updateField( 'id', sanitizeId( value ) );
		}
	};

	const handleBlur = () => {
		// Mark the field as not changed by this component.
		setChanged( false );

		// When done updating "name", don't auto generate ID.
		updateField( '_id_changed', true );
	};

	// Use ref to manually update its value from label in the preview area,
	// avoid React touching the input value directly to avoid cursor jumping to the start.
	useEffect( () => {
		// Don't update the value if the field has been changed internally (e.g. by this component).
		if ( changed ) {
			return;
		}
		// Update the value if the field name has changed from the label in the preview area.
		if ( inputRef.current && inputRef.current.value !== field.name ) {
			inputRef.current.value = field.name || '';
		}
	}, [ changed, field.name ] );

	return (
		<DivRow htmlFor={ componentId } { ...rest }>
			<input
				ref={ inputRef }
				type="text"
				id={ componentId }
				defaultValue={ field.name || '' }
				onBlur={ handleBlur }
				onChange={ handleChange }
			/>
		</DivRow>
	);
};

export default Name;