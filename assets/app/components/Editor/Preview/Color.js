import { memo } from "@wordpress/element";
import { __ } from "@wordpress/i18n";

const Color = ( { field } ) => (
	<div className="wp-picker-container">
		<button type="button" className="button wp-color-result" style={ { backgroundColor: field.std || '' } }>
			<span className="wp-color-result-text">{ __( 'Select Color', 'meta-box-builder' ) }</span>
		</button>
	</div>
);

export default memo( Color, ( prev, next ) => prev.field.std === next.field.std );