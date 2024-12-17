import { __ } from "@wordpress/i18n";
import { getOptions } from "../../../functions";

const CheckboxList = ( { field } ) => {
	const doNothing = () => {};
	const options = getOptions( field.options || '' );
	const std = getOptions( field.std || '' );
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
						<label key={ option }>
							<input type="checkbox" checked={ std.includes( option ) } onChange={ doNothing } />
							{ option }
						</label>
					) )
				}
			</fieldset>
		</>
	);
};

export default CheckboxList;