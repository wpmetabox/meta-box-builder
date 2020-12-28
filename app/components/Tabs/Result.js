import { UnControlled as CodeMirror } from 'react-codemirror2';
import Input from '../Common/Input';
const { useContext, useState } = wp.element;
const { __ } = wp.i18n;
const { ClipboardButton } = wp.components;
const { withState } = wp.compose;

const ResultCode = () => {
	const [ data, setData ] = useState( '' );
	const [ isGenerating, setIsGenerating ] = useState( false );

	const generate = () => {
		setData( '' );
		setIsGenerating( true );

		/**
		 * Get all form fields, including WordPress fields.
		 * Remove WordPress nonce to have correct permission.
		 */
		const formData = new FormData( document.querySelector( '#post' ) );
		formData.delete( '_wpnonce' );

		fetch( `${ MbbApp.rest }/mbb/generate`, {
			method: 'POST',
			body: formData,
			headers: { 'X-WP-Nonce': MbbApp.nonce }
		} ).then( response => response.json() ).then( response => {
			setData( response );
			setIsGenerating( false );
		} );
	};

	const Button = withState( {
		hasCopied: false,
	} )( ( { hasCopied, setState } ) => (
		<ClipboardButton className="button" text={ data } onCopy={ () => setState( { hasCopied: true } ) } onFinishCopy={ () => setState( { hasCopied: false } ) }>
			{ hasCopied ? __( 'Copied!', 'meta-box-builder' ) : __( 'Copy', 'meta-box-builder' ) }
		</ClipboardButton>
	) );

	return <>
		<Input
			name="prefix"
			label={ __( 'Field ID prefix', 'meta-box-builder' ) }
			tooltip={ __( 'Auto add a prefix to all field IDs to keep them separated from other field groups or other plugins. Leave empty to ignore this or use underscore (_) to make the fields hidden.', 'meta-box-builder' ) }
			componentId="prefix"
		/>
		<Input
			name="text_domain"
			label={ __( 'Text domain', 'meta-box-builder' ) }
			tooltip={ __( 'Required for multilingual website. Used in the exported code only.', 'meta-box-builder' ) }
			defaultValue="your-text-domain"
			componentId="text-domain"
		/>
		<Input
			name="function_name"
			label={ __( 'Function name', 'meta-box-builder' ) }
			defaultValue="your_prefix_register_meta_boxes"
			componentId="function-name"
		/>
		<button type="button" className="button" onClick={ generate }>{ __( 'Generate', 'meta-box-builder' ) }</button>
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