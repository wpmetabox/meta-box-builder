import { useCallback, useEffect, useLayoutEffect, useRef, useState } from '@wordpress/element';
import { debounce } from 'lodash';
import { sanitizeId } from '../functions';
import DivRow from './DivRow';

/**
 * Fix cursor jumping to the end of the `<input>` after typing.
 * @link https://github.com/facebook/react/issues/18404#issuecomment-605294038
 */
const Name = ( { name, componentId, field, updateField, ...rest } ) => {
	const ref = useRef();
	const [ selection, setSelection ] = useState();
	const [ value, setValue ] = useState( field.name );

	// Live update to the input, and debounce update to the field.
	const handleChange = e => {
		setValue( e.target.value );
		setSelection( [ e.target.selectionStart, e.target.selectionEnd ] );
	};
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
		if ( field._id_changed ) {
			return;
		}

		updateField( 'id', sanitizeId( value ) );
	};

	// When done updating "name", don't auto generate ID.
	const stopGeneratingId = () => updateField( '_id_changed', true );

	useLayoutEffect( () => {
		if ( selection && ref.current ) {
			[ ref.current.selectionStart, ref.current.selectionEnd ] = selection;
		}
	}, [ selection ] );

	return (
		<DivRow htmlFor={ componentId } { ...rest }>
			<input
				ref={ ref }
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