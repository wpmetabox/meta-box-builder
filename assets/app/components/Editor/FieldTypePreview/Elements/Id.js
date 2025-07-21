import { Tooltip } from '@wordpress/components';
import { useEffect, useRef } from '@wordpress/element';
import { __ } from "@wordpress/i18n";

const Id = ( { field, updateField } ) => {
	const spanRef = useRef();

	// Check if this is a post field (has _original_type)
	const isPostField = field._original_type && field._original_type.startsWith( 'post_' );

	// Prevent the default behavior of "Enter" key.
	const preventEnter = e => {
		if ( e.key === 'Enter' ) {
			e.preventDefault();
		}
	};

	const handleChange = e => {
		// Don't allow changes for post fields
		if ( isPostField ) {
			return;
		}

		updateField( 'id', e.target.textContent );
		updateField( '_id_changed', true );
	};

	// Only update the content if it's different from the current value
	// Don't use {field.id} because it's directly controlled by React's rendering to avoid cursor jumping to the start.
	useEffect( () => {
		if ( spanRef.current && spanRef.current.textContent !== field.id ) {
			spanRef.current.textContent = field.id || '';
		}
	}, [ field.id ] );

	return (
		<span className="mb-field__id">
			{ __( 'ID', 'meta-box-builder' ) }:&nbsp;
			{
				isPostField
					? <span ref={ spanRef } />
					: (
						<Tooltip text={ __( 'Click to edit', 'meta-box-builder' ) } delay={ 0 } placement="bottom">
							<span
								ref={ spanRef }
								contentEditable
								suppressContentEditableWarning={ true }
								onKeyDown={ preventEnter }
								onInput={ handleChange }
							/>
						</Tooltip>
					)
			}
		</span>
	);
};

export default Id;