const $ = jQuery;
let editor;

const setupEditor = () => {
	let settings = $.extend( true, {}, wp.codeEditor.defaultSettings );
	settings.codemirror.theme = 'oceanic-next';
	editor = wp.codeEditor.initialize( 'mbb-export-code', settings ).codemirror;
	editor.setSize( null, '480px' );
	editor.focus();
}

const copyToClipboard = () => {
	const clipboard = new ClipboardJS( '.mbb-copy', {
			text: () => editor.getDoc().getValue()
		} ),
		text = document.querySelector( '.mbb-copy__text' );

	clipboard.on( 'success', e => {
		text.innerHTML = 'Copied';
		setTimeout( () => text.innerHTML = 'Copy', 3000 );
	} );
	clipboard.on( 'error', () => alert( 'Press Ctrl-C to copy' ) );
}

copyToClipboard();
setupEditor();