import { UnControlled as CodeMirror } from 'react-codemirror2';
import { Context } from '../context/Generator/GeneratorContext';
import Input from './Common/Input';
const { useContext } = wp.element;
const { __ } = wp.i18n;
const { ClipboardButton } = wp.components;
const { withState } = wp.compose;

const ResultCode = () => {
	const { data } = useContext( Context );

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
		/>
		<Input
			name="text_domain"
			label={ __( 'Text domain', 'meta-box-builder' ) }
			tooltip={ __( 'Required for multilingual website. Used in the exported code only.', 'meta-box-builder' ) }
		/>
		{ data &&
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