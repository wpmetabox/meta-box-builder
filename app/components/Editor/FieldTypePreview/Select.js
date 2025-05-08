import { __ } from "@wordpress/i18n";
import { doNothing, getOptions } from "../../../functions";

const Select = ( { field } ) => {
	const options = getOptions( field.options || '' );
	const std = field.multiple ? getOptions( field.std || '' ) : field.std;

	// For field preview: don't need to render all options.
	// Only render the selected option or the first option if nothing is selected.
	const renderedOption = std ? std : ( options.length > 0 ? options[ 0 ] : '' );

	return (
		<>
			<select multiple={ field.multiple } value={ std } onChange={ doNothing }>
				{
					!field.multiple && field.placeholder &&
					<option value="">{ field.placeholder }</option>
				}
				<option>{ renderedOption }</option>
			</select>
			{
				field.multiple && field.select_all_none &&
				<div className="rwmb-select-all-none">
					{ __( 'Select:', 'meta-box-builder' ) } &nbsp;
					<a href="#">{ __( 'All', 'meta-box-builder' ) }</a> | <a href="#">{ __( 'None', 'meta-box-builder' ) }</a>
				</div>
			}
		</>
	);
};

export default Select;