import { getFullOptions } from "../../../functions";

const ButtonGroup = ( { field } ) => {
	const options = getFullOptions( field.options || '' );
	const std = getFullOptions( field.std || '' ).map( option => option.value );
	return (
		<fieldset className={ `rwmb-button-input-list ${ field.inline === undefined || field.inline ? 'rwmb-inline' : '' }` }>
			{
				options.map( option => (
					<label key={ option.value } className={ std.includes( option.value ) ? "selected" : "" }>
						{ option.label }
					</label>
				) )
			}
		</fieldset>
	);
};

export default ButtonGroup;