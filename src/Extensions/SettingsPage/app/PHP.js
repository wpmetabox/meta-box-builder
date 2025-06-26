import { useCopyToClipboard } from "@wordpress/compose";
import { useState } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import { UnControlled as CodeMirror } from 'react-codemirror2';
import Input from '../../../../app/controls/Input';
import { fetcher } from "../../../../app/hooks/useFetch";
import useSettings from "../../../../app/hooks/useSettings";

const PHP = () => {
	const { getSetting, updateSetting, settings } = useSettings();

	const [ data, setData ] = useState( '' );
	const [ generating, setGenerating ] = useState( false );
	const [ copied, setCopied ] = useState( false );

	const copyRef = useCopyToClipboard( data, () => {
		setCopied( true );
		setTimeout( () => setCopied( false ), 2000 );
	} );

	const onClick = () => {
		setData( '' );
		setGenerating( true );

		fetcher( {
			api: 'settings-page/generate',
			params: {
				post_title: document.querySelector( '#title' )?.value,
				settings
			},
			method: 'POST',
		} ).then( response => {
			setData( response );
			setGenerating( false );
		} );
	};

	return (
		<div className="mb-php">
			<Input
				name="text_domain"
				label={ __( 'Text domain', 'meta-box-builder' ) }
				tooltip={ __( 'Required for multilingual website. Used in the exported code only.', 'meta-box-builder' ) }
				defaultValue={ getSetting( 'text_domain', 'your-text-domain' ) }
				componentId="text-domain"
				updateField={ updateSetting }
			/>
			<Input
				name="function_name"
				label={ __( 'Function name', 'meta-box-builder' ) }
				defaultValue={ getSetting( 'function_name', 'your_prefix_function_name' ) }
				componentId="function-name"
				updateField={ updateSetting }
			/>
			<button type="button" className="button" onClick={ onClick } disabled={ generating }>{ __( 'Generate', 'meta-box-builder' ) }</button>
			{ generating && <p>{ __( 'Generating code, please wait...', 'meta-box-builder' ) }</p> }
			{
				data.length > 0 &&
				<div className="og-result">
					<p>{ __( 'Copy the code and paste into your theme\'s functions.php file.', 'meta-box-builder' ) }</p>
					<div className="og-result__body">
						<CodeMirror
							value={ data }
							options={ {
								mode: 'php',
								lineNumbers: true,
								readOnly: true
							} }
						/>
						<button type="button" className="button" text={ data } ref={ copyRef }>
							{ copied ? __( 'Copied!', 'meta-box-builder' ) : __( 'Copy', 'meta-box-builder' ) }
						</button>
					</div>
				</div>
			}
		</div>
	);
};

export default PHP;