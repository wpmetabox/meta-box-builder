import { useRef, useState } from "@wordpress/element";
import { __ } from "@wordpress/i18n";

// Output field label on the header bar.
const HeaderLabel = ( { field, nameIdData } ) => {
	const hiddenRef = useRef();
	const [ label, setLabel ] = useState( [ 'hidden', 'divider' ].includes( field.type ) ? ucwords( field.type ) : nameIdData.name || field.group_title || __( '(No label)', 'meta-box-builder' ) );

	// Release when pressing "Enter" or "Escape".
	const maybeFinishEditing = e => {
		if ( ![ 'Enter', 'Escape' ].includes( e.key ) ) {
			return;
		}
		e.preventDefault();
		e.target.blur();
		nameIdData.noAutoGenerateId();
	};

	const handleChange = e => {
		// Make update synchronous, to avoid caret jumping when the value doesn't change asynchronously.
		// @link https://dev.to/kwirke/solving-caret-jumping-in-react-inputs-36ic
		setLabel( e.target.value );
		hiddenRef.current.textContent = e.target.value;

		// Make the real update afterwards.
		nameIdData.updateName( e.target.value );
	};

	return (
		<>
			<span className="og-item__hidden-label" ref={ hiddenRef }>{ label }</span>
			<input
				type="text"
				className="og-item__title"
				title={ __( 'Click to edit', 'meta-box-builder' ) }
				value={ label }
				onKeyDown={ maybeFinishEditing }
				onChange={ handleChange }
				onBlur={ () => nameIdData.noAutoGenerateId() }
				style={ {
					// When toggling subfields, the hidden span has 0 width, so we have to fallback to a width based on string length.
					width: `${ hiddenRef.current?.offsetWidth || label.length * 7 }px`
				} }
			/>
		</>
	);
};

export default HeaderLabel;