import { doNothing } from "../../../functions";
import { __ } from "@wordpress/i18n";

const File = ( { field } ) => {
	return (
		<div className="rwmb-file-new">
			<input type="file" />
			{
				field.max_file_uploads != 1 &&
				<a className="rwmb-file-add" href="#"><strong>{ __( '+ Add new file', 'meta-box-builder' ) }</strong></a>
			}
		</div>
	);
};

export default File;