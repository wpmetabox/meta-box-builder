import { useCopyToClipboard } from "@wordpress/compose";
import { useState } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import { UnControlled as CodeMirror } from "react-codemirror2";
const { withState } = wp.compose;

const Content = ( { show, codeValue } ) => {
	const [ copied, setCopied ] = useState( false );

	const copyRef = useCopyToClipboard( codeValue, () => {
		setCopied( true );
		setTimeout( () => setCopied( false ), 2000 );
	} );

	return (
		<div className="og-result__body">
			<CodeMirror
				value={ codeValue }
				editorDidMount={ editor => editor.setSize( '', '100%' ) }
				options={ {
					mode: 'php',
					lineNumbers: true,
					smartIndent: true,
					readOnly: true,
					lineWrapping: true,
					viewportMargin: Infinity,
				} }
			/>

			<button type="button" className="button" text={ codeValue } ref={ copyRef }>
				{ copied ? __( 'Copied!', 'meta-box-builder' ) : __( 'Copy', 'meta-box-builder' ) }
			</button>
		</div>
	);
};

export default Content;
