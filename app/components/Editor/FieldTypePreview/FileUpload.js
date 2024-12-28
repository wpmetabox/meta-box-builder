import { __ } from '@wordpress/i18n';

const FileUpload = ( { field } ) => (
	<>
		{
			field.max_status && field.max_file_uploads > 1 &&
			<div className="rwmb-media-status">0/{ field.max_file_uploads } { __( 'files', 'meta-box-builder' ) }</div>
		}
		<div className="rwmb-upload-area">
			<div className="rwmb-upload-inside">
				<h3>{ __( 'Drop files here to upload', 'meta-box-builder' ) }</h3>
				<p>{ __( 'or', 'meta-box-builder' ) }</p>
				<button className="rwmb-browse-button browser button button-hero">{ __( 'Select Files', 'meta-box-builder' ) }</button>
			</div>
		</div>
	</>
);

export default FileUpload;