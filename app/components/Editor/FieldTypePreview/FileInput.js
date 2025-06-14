import { __ } from "@wordpress/i18n";
import Text from "./Text";

const FileInput = ( { field } ) => (
	<div className="rwmb-file-input-inner">
		<Text field={ field } />
		<a href="#" className="rwmb-file-input-select button">{ __( 'Select', 'meta-box-builder' ) }</a>
	</div>
);

export default FileInput;