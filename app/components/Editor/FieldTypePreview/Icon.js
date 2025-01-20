import { __ } from "@wordpress/i18n";
import { doNothing } from "../../../functions";

const Icon = ( { field } ) => (
	<select value={ field.std || '' } onChange={ doNothing }>
		<option value="">{ field.placeholder || __( 'Select an icon', 'meta-box-builder' ) }</option>
		{ field.std && <option value={ field.std }>{ field.std }</option> }
	</select>
);

export default Icon;