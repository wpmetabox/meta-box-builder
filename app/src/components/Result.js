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
			<div className="alert alert-info">Copy the code and paste into your theme's <code>functions.php</code> file. Wanna more features or use inside the WordPress admin? <a href="https://metabox.io/pricing/" target="_blank" rel="noopener noreferrer">Become a premium user</a>.</div>
			<div className="og-result__body">
				<Highlight language='php'>{data}</Highlight>
				<Clipboard title="Click to copy the code" data-clipboard-text={data} onSuccess={copy}>{copied ? 'Copied' : 'Copy'}</Clipboard>
			</div>
		</div>
	);
}

export default ResultCode;