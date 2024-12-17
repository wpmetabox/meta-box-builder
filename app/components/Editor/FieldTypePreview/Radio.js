import { getOptions } from "../../../functions";

const Radio = ( { field } ) => {
	const doNothing = () => {};
	const options = getOptions( field.options || '' );
	const std = getOptions( field.std || '' );
	return (
		<fieldset className={ `rwmb-input-list ${ field.inline ? 'rwmb-inline' : '' }` }>
			{
				options.length > 0 && options.map( option => (
					<label key={ option }>
						<input type="radio" name={ `not_save[${ field._id }` } checked={ std.includes( option ) } onChange={ doNothing } />
						{ option }
					</label>
				) )
			}
		</fieldset>
	);
};

export default Radio;