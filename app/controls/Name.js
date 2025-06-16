import { sanitizeId } from '../functions';
import DivRow from './DivRow';

const Name = ( { componentId, field, updateField, ...rest } ) => {
	const handleChange = e => {
		updateField( 'name', e.target.value );
		maybeGenerateId( e.target.value );
	};

	const maybeGenerateId = value => {
		// No ID?
		if ( [ 'custom_html', 'divider', 'heading' ].includes( field.type ) ) {
			return;
		}

		// Only do for new fields that haven't been manually changed.
		if ( field._new && !field._id_changed ) {
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