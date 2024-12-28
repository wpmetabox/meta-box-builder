import { __ } from "@wordpress/i18n";
import { isPositiveInteger } from "../../../../functions";

const TextLimiter = ( { field } ) => {
	if ( ![ 'text', 'textarea', 'wysiwyg' ].includes( field.type ) ) {
		return;
	}
	if ( !field.text_limiter?.limit || !isPositiveInteger( field.text_limiter.limit ) ) {
		return;
	}

	const type = field.text_limiter?.limit_type || 'character';
	const text = 'word' === type ? __( 'Word Count', 'meta-box-builder' ) : __( 'Character Count', 'meta-box-builder' );

	return (
		<div className="text-limiter">
			<span>
				{ text }:&nbsp;
				<span className="counter">0</span>/<span className="maximum">{ field.text_limiter.limit }</span>
			</span>
		</div>
	);
};

export default TextLimiter;