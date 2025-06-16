import { sanitizeId } from '../functions';
import DivRow from './DivRow';

const Name = ( { componentId, field, updateField, ...rest } ) => {
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

	return (
		<DivRow htmlFor={ componentId } { ...rest }>
			<input
				type="text"
				id={ componentId }
				value={ field.name }
				onBlur={ stopGeneratingId }
				onChange={ handleChange }
			/>
		</DivRow>
	);
};

export default Name;