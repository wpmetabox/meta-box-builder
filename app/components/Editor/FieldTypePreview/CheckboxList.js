import { __ } from "@wordpress/i18n";
import { doNothing, getFullOptions } from "../../../functions";

const CheckboxList = ( { field } ) => {
	const options = getFullOptions( field.options || '' );
	const std = getFullOptions( field.std || '' ).map( option => option.value );
	return (
		<>
			{
				field.select_all_none &&
				<p className="rwmb-toggle-all-wrapper">
					<button className="rwmb-input-list-select-all-none button">{ __( 'Toggle All', 'meta-box-builder' ) }</button>
				</p>
			}
			<fieldset className={ `rwmb-input-list ${ field.inline ? 'rwmb-inline' : '' }` }>
				{
					options.map( option => (
						<label key={ option.value }>
							<input type="checkbox" checked={ std.includes( option.value ) } onChange={ doNothing } />
							{ option.label }
						</label>
					) )
				}
			</fieldset>
		</>
	);
};

export default CheckboxList;