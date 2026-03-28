import { useCopyToClipboard } from "@wordpress/compose";
import { RawHTML, useState } from "@wordpress/element";
import { __, sprintf } from "@wordpress/i18n";
import { getErrorMessage } from "react-error-boundary";

export default ( { error } ) => {
	const errorMessage = `ERROR: ${ getErrorMessage( error ) }\n\nStack:\n${ error.stack || 'No stack' }`;

	const [ copied, setCopied ] = useState( false );

	const copyRef = useCopyToClipboard( errorMessage, () => {
		setCopied( true );
		setTimeout( () => setCopied( false ), 2000 );
	} );

	return (
		<div className="mb-error-boundary">
			<h2>{ __( 'Something went wrong', 'meta-box-builder' ) }</h2>
			<RawHTML>
				{
					sprintf(
						__( 'Please copy the following error message and <a href="%s" target="_blank">send us</a> a support ticket.', 'meta-box-builder' ),
						'https://metabox.io/contact/'
					)
				}
			</RawHTML>

			<pre>{ errorMessage }</pre>

			<button type="button" className="button" text={ errorMessage } ref={ copyRef }>
				{ copied ? __( 'Copied!', 'meta-box-builder' ) : __( 'Copy to clipboard', 'meta-box-builder' ) }
			</button>
		</div>
	);
};
