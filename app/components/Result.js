import { UnControlled as CodeMirror } from 'react-codemirror2';
import { Context } from '../context/Generator/GeneratorContext';
const { useContext } = wp.element;
const { __ } = wp.i18n;
const { ClipboardButton } = wp.components;
const { withState }  = wp.compose;

const ResultCode = () => {
	const state = useContext( Context );
	const { data } = state.state;

	const Button = withState( {
		hasCopied: false,
	} )( ( { hasCopied, setState } ) => (
		<ClipboardButton className="button" text={ data } onCopy={ () => setState( { hasCopied: true } ) } onFinishCopy={ () => setState( { hasCopied: false } ) }>
			{ hasCopied ? __( 'Copied!', 'meta-box-builder' ) : __( 'Copy', 'meta-box-builder' ) }
		</ClipboardButton>
	) );

	return data && (
		<div className="og-result">
			<p>{ __( 'Copy the code and paste into your theme\'s functions.php file.', 'meta-box-builder' ) }</p>
			<div className="og-result__body">
				<CodeMirror value={ data } options={ { mode: 'php', lineNumbers: true } }/>
				<Button />
			</div>
		</div>
	);
}

export default ResultCode;