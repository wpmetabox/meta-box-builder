import { useCopyToClipboard } from '@wordpress/compose';
import { useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { UnControlled as CodeMirror } from 'react-codemirror2';
import Input from '../../../../../assets/app/controls/Input';
import useSettings from '../../../../../assets/app/hooks/useSettings';
import PhpCode from '../constants/PhpCode';

const PHP = () => {
	const { getSetting, updateSetting, settings } = useSettings();
	const code = PhpCode( settings );
	const [ copied, setCopied ] = useState( false );

	const copyRef = useCopyToClipboard( code, () => {
		setCopied( true );
		setTimeout( () => setCopied( false ), 2000 );
	} );

	return (
		<div className="mb-content mb-php">
			<Input
				name="function_name"
				componentId="function-name"
				label={ __( 'Function name', 'meta-box-builder' ) }
				tooltip={ __( 'Your function name that registers the model', 'meta-box-builder' ) }
				defaultValue={ getSetting( 'function_name', 'your_prefix_register_model' ) }
				updateField={ updateSetting }
			/>
			<Input
				name="text_domain"
				componentId="text-domain"
				label={ __( 'Text domain', 'meta-box-builder' ) }
				tooltip={ __( 'Required for multilingual website. Used in the exported code only.', 'meta-box-builder' ) }
				defaultValue={ getSetting( 'text_domain', 'your-textdomain' ) }
				updateField={ updateSetting }
			/>
			<div className="og-result">
				<p>{ __( 'Copy and paste the following code into your theme\'s functions.php file.', 'meta-box-builder' ) }</p>
				<div className="og-result__body">
					<CodeMirror value={ code } options={ { mode: 'php', lineNumbers: true, readOnly: true } } />
					<button type="button" className="button" ref={ copyRef }>
						{ copied ? __( 'Copied!', 'meta-box-builder' ) : __( 'Copy', 'meta-box-builder' ) }
					</button>
				</div>
			</div>
		</div>
	);
};

export default PHP;
