import { getOptions } from "../../../functions";

const ButtonGroup = ( { field } ) => {
	const options = getOptions( field.options || '' );
	const std = getOptions( field.std || '' );
	return (
		<fieldset className={ `rwmb-button-input-list ${ field.inline === undefined || field.inline ? 'rwmb-inline' : '' }` }>
			{
				options.map( option => (
					<label key={ option } className={ std.includes( option ) ? "selected" : "" }>
						{ option }
					</label>
				) )
			}
		</fieldset>
	);
};

export default ButtonGroup;