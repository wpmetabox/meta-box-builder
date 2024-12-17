import { __ } from "@wordpress/i18n";
import { getOptions } from "../../../functions";

const Select = ( { field } ) => {
	const doNothing = () => {};
	const options = getOptions( field.options || '' );
	return (
		<>
			<select multiple={ field.multiple }>
				{
					!field.multiple && field.placeholder &&
					<option selected={ field.std !== '' }>{ field.placeholder }</option>
				}
				{ options.map( option => <option key={ option } selected={ option === field.std }>{ option }</option> ) }
			</select>
			{
				field.multiple && field.select_all_none &&
				<div class="rwmb-select-all-none">
					{ __( 'Select:', 'meta-box-builder' ) } &nbsp;
					<a href="#">{ __( 'All', 'meta-box-builder' ) }</a> | <a href="#">{ __( 'None', 'meta-box-builder' ) }</a>
				</div>
			}
		</>
	);
};

export default Select;