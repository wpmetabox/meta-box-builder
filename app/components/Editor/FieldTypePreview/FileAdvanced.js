import { memo } from "@wordpress/element";
import { __ } from '@wordpress/i18n';

const FileAdvanced = ( { field } ) => (
	<>
		{
			field.max_status && field.max_file_uploads > 1 &&
			<div className="rwmb-media-status">0/{ field.max_file_uploads } { __( 'files', 'meta-box-builder' ) }</div>
		}
		<a className="button">{ __( '+ Add Media', 'meta-box-builder' ) }</a>
	</>
);

export default memo( FileAdvanced, ( prev, next ) => prev.field.max_status === next.field.max_status && prev.field.max_file_uploads === next.field.max_file_uploads );