import { ClipboardButton } from "@wordpress/components";
import { useState } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import { UnControlled as CodeMirror } from 'react-codemirror2';
import Input from '/controls/Input';
// TODO: replace with useCopyToClipboard from @wordpress/compose.
const { withState } = wp.compose;

const ResultCode = ( { settings, endPoint } ) => {
	const [ data, setData ] = useState( '' );
	const [ isGenerating, setIsGenerating ] = useState( false );

	const onClick = () => {
		setData( '' );
		setIsGenerating( true );

		/**
		 * Get all form fields, including WordPress fields.
		 * Remove WordPress nonce to have correct permission.
		 */
		const formData = new FormData( document.querySelector( '#post' ) );
		formData.delete( '_wpnonce' );

		fetch( `${ MbbApp.rest }/mbb/${ endPoint }`, {
			method: 'POST',
			body: formData,
			headers: { 'X-WP-Nonce': MbbApp.nonce }
		} ).then( response => response.json() ).then( response => {
			setData( response );
			setIsGenerating( false );
		} );
	};

	const Button = withState( { hasCopied: false } )( ( { hasCopied, setState } ) => (
		<ClipboardButton className="button" text={ data } onCopy={ () => setState( { hasCopied: true } ) } onFinishCopy={ () => setState( { hasCopied: false } ) }>
			{ hasCopied ? __( 'Copied!', 'meta-box-builder' ) : __( 'Copy', 'meta-box-builder' ) }
		</ClipboardButton>
	) );

	return <>
		<Input
			name="settings[text_domain]"
			label={ __( 'Text domain', 'meta-box-builder' ) }
			tooltip={ __( 'Required for multilingual website. Used in the exported code only.', 'meta-box-builder' ) }
			defaultValue={ settings.text_domain || 'your-text-domain' }
			componentId="text-domain"
		/>
		<Input
			name="settings[function_name]"
			label={ __( 'Function name', 'meta-box-builder' ) }
			defaultValue={ settings.function_name || 'your_prefix_function_name' }
			componentId="function-name"
		/>
		<button type="button" className="button" onClick={ onClick } disabled={ isGenerating }>{ __( 'Generate', 'meta-box-builder' ) }</button>
		{ isGenerating && <p>{ __( 'Generating code, please wait...', 'meta-box-builder' ) }</p> }
		{
			data.length > 0 &&
			<div className="og-result">
				<p>{ __( 'Copy the code and paste into your theme\'s functions.php file.', 'meta-box-builder' ) }</p>
				<div className="og-result__body">
					<CodeMirror value={ data } options={ { mode: 'php', lineNumbers: true } } />
					<Button />
				</div>
			</div>
		}
	</>;
};

export default ResultCode;