import { UnControlled as CodeMirror } from 'react-codemirror2';
import Clipboard from 'react-clipboard.js';
import { Context } from '../context/GeneratorContext';
const { useState, useContext } = wp.element;
const { __ } = wp.i18n;

const ResultCode = () => {
	const state = useContext( Context );
	const { data } = state.state;
	const [ copied, setCopied ] = useState( false );
	const changeText = () => {
		setCopied( true );
		setTimeout( () => setCopied( false ), 1000 );
	}

	return data && (
		<div className="og-result">
			<p>{ __( 'Copy the code and paste into your theme\'s functions.php file.', 'meta-box-builder' ) }</p>
			<div className="og-result__body">
				<CodeMirror value={ data } options={ { mode: 'php', lineNumbers: true } }/>
				<Clipboard title="Click to copy the code" button-class="button" data-clipboard-text={ data } onSuccess={ changeText }>{ copied ? __( 'Copied', 'meta-box-builder' ) : __( 'Copy', 'meta-box-builder' ) }</Clipboard>
			</div>
		</div>
	);
}

export default ResultCode;