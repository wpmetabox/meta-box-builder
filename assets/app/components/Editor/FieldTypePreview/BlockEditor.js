import { __ } from '@wordpress/i18n';

const BlockEditor = () => (
	<div className="rwmb-block-editor-preview">
		<div className="rwmb-block-editor-preview__placeholder">
			{ __( 'Block Editor field preview', 'meta-box-builder' ) }
		</div>
	</div>
);

export default BlockEditor;

