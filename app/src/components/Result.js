import React, { useContext, useState } from 'react';
import Highlight from 'react-highlight';
import Clipboard from 'react-clipboard.js';
import { Context } from '../context/GeneratorContext';

const ResultCode = () => {
	const state = useContext(Context);
	const { data } = state.state;
	const [copied, setCopied] = useState(false);
	const copy = () => {
		setCopied(true);
		setTimeout(() => setCopied(false), 1000);
	}

	return data && (
		<div className="og-result">
			<div className="og-result__body">
				<Highlight language='php'>{data}</Highlight>
				<Clipboard title="Click to copy the code" button-class="button" data-clipboard-text={data} onSuccess={copy}>{copied ? 'Copied' : 'Copy'}</Clipboard>
			</div>
		</div>
	);
}

export default ResultCode;