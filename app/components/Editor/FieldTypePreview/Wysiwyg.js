import { useEffect, useRef } from "@wordpress/element";
import { __ } from "@wordpress/i18n";

const Wysiwyg = ( { field } ) => {
	const ref = useRef();

	const settings = getDefaultEditorSettings();

	useEffect( () => {
		const selector = `#${ field._id }`;
		const input = document.querySelector( selector );
		const editor = input.closest( '.rwmb-input' ).querySelector( '.mce-container' );
		if ( editor ) {
			editor.remove();
		}

		tinymce.remove( selector );
		settings.tinymce.selector = selector;
		tinymce.init( settings.tinymce );
	}, [ field.clone ] );

	return (
		<div className="wp-core-ui wp-editor-wrap tmce-active">
			<div className="wp-editor-tools">
				<div className="wp-media-buttons">
					<button className="button insert-media add_media">
						<span className="wp-media-buttons-icon"></span>
						{ __( 'Add Media', 'meta-box-builder' ) }
					</button>
				</div>
				<div className="wp-editor-tabs">
					<button aria-pressed="true" className="wp-switch-editor switch-tmce">{ __( 'Visual', 'meta-box-builder' ) }</button>
					<button className="wp-switch-editor switch-html">{ __( 'Text', 'meta-box-builder' ) }</button>
				</div>
			</div>
			<div className="wp-editor-container">
				<textarea id={ field._id } />
			</div>
		</div>
	);
};

const getDefaultEditorSettings = () => {
	let settings = wp.editor.getDefaultSettings();

	settings.tinymce.toolbar1 = 'formatselect,bold,italic,bullist,numlist,blockquote,alignleft,aligncenter,alignright,link,unlink,wp_more,spellchecker,fullscreen,wp_adv';
	settings.tinymce.toolbar2 = 'strikethrough,hr,forecolor,pastetext,removeformat,charmap,outdent,indent,undo,redo,wp_help';

	settings.quicktags.buttons = 'strong,em,link,block,del,ins,img,ul,ol,li,code,more,close';

	return settings;
};

export default Wysiwyg;