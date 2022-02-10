import DivRow from './DivRow';
import { __ } from "@wordpress/i18n";

const GroupTitle = ( { name, componentId, defaultValue, ...rest } ) => {
	const onChange = e => {
		// Don't update field header bar if it has name.
		const nameElement = document.getElementById( `fields-${ rest.fieldId }-name` );
		if ( nameElement.value ) {
			return;
		}

		// Update field header bar.
		const titleElement = document.getElementById( `og-item__title__${ rest.fieldId }` );
		if ( titleElement ) {
			titleElement.textContent = e.target.value || __( '(No label)', 'meta-box-builder' );
		}
	};

	return (
		<DivRow htmlFor={ componentId } { ...rest }>
			<input type="text" id={ componentId } defaultValue={ defaultValue } name={ name } onChange={ onChange } />
		</DivRow>
	);
};
export default GroupTitle;