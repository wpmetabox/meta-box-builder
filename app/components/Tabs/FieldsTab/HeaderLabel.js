import { useRef } from "@wordpress/element";
import { __ } from "@wordpress/i18n";

// Output field label on the header bar.
const HeaderLabel = ( { field, nameIdData } ) => {
	const hiddenLabelRef = useRef();

	const label = [ 'hidden', 'divider' ].includes( field.type ) ? ucwords( field.type ) : nameIdData.name || field.group_title || __( '(No label)', 'meta-box-builder' );

	// Release when pressing "Enter" or "Escape".
	const maybeFinishEditing = e => {
		if ( ![ 'Enter', 'Escape' ].includes( e.key ) ) {
			return;
		}
		e.preventDefault();
		e.target.blur();
		nameIdData.noAutoGenerateId();
	};

	return (
		<>
			<span className="og-item__hidden-label" ref={ hiddenLabelRef }>{ label }</span>
			<input
				type="text"
				className="og-item__title"
				title={ __( 'Click to edit', 'meta-box-builder' ) }
				value={ label }
				onKeyDown={ maybeFinishEditing }
				onChange={ e => nameIdData.updateName( e.target.value ) }
				onBlur={ () => nameIdData.noAutoGenerateId() }
				style={ {
					width: `${ hiddenLabelRef.current?.offsetWidth }px`
				} }
			/>
		</>
	);
};

const HeaderLabel2 = ( { field, nameIdData } ) => {
	const label = [ 'hidden', 'divider' ].includes( field.type ) ? ucwords( field.type ) : nameIdData.name || field.group_title || __( '(No label)', 'meta-box-builder' );

	// Release when pressing "Enter" or "Escape".
	const maybeFinishEditing = e => {
		if ( ![ 'Enter', 'Escape' ].includes( e.key ) ) {
			return;
		}
		e.preventDefault();
		e.target.blur();
		nameIdData.noAutoGenerateId();
	};

	return (
		<span
			className="og-item__title"
			title={ __( 'Click to edit', 'meta-box-builder' ) }
			contentEditable
			suppressContentEditableWarning={ true }
			onKeyDown={ maybeFinishEditing }
			onKeyUp={ e => nameIdData.updateName( e.target.textContent ) }
		>
			{ label }
		</span>
	);
};

export default HeaderLabel;