import { doNothing, getOptions } from "../../../functions";

const Radio = ( { field } ) => {
	const options = getOptions( field.options || '' );
	return (
		<fieldset className={ `rwmb-input-list ${ field.inline ? 'rwmb-inline' : '' }` }>
			{
				options.length > 0 && options.map( option => (
					<label key={ option }>
						<input type="radio" checked={ field.std === option } onChange={ doNothing } />
						{ option }
					</label>
				) )
			}
		</fieldset>
	);
};

export default Radio;