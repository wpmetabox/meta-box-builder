import { ClipboardButton } from "@wordpress/components";
import { __ } from "@wordpress/i18n";
import { UnControlled as CodeMirror } from "react-codemirror2";
const { withState } = wp.compose;

const ThemeCode = ( { codeValue } ) => {
	const Button = withState( { hasCopied: false } )(
		( { hasCopied, setState, textCode } ) => (
			<ClipboardButton
				className="button"
				text={ textCode }
				onCopy={ () => setState( { hasCopied: true } ) }
				onFinishCopy={ () => setState( { hasCopied: false } ) }
			>
				{ hasCopied
					? __( "Copied!", "meta-box-builder" )
					: __( "Copy", "meta-box-builder" ) }
			</ClipboardButton>
		)
	);

	return (
		<>
			<CodeMirror
				value={ codeValue }
				editorDidMount={ ( editor ) => {
					editor.setSize( "", "100%" );
				} }
				options={ {
					mode: "php",
					lineNumbers: true,
					smartIndent: true,
					readOnly: true,
					lineWrapping: true,
					viewportMargin: Infinity,
				} }
			/>

			<Button textCode={ codeValue } />
		</>
	);
};

export default ThemeCode;
