import { doNothing, getFullOptions } from "../../../functions";

const Radio = ( { field } ) => {
	const options = getFullOptions( field.options || '' );
	return (
		<fieldset className={ `rwmb-input-list ${ field.inline ? 'rwmb-inline' : '' }` }>
			{
				options.length > 0 && options.map( option => (
					<label key={ option.value }>
						<input type="radio" checked={ field.std === option.value } onChange={ doNothing } />
						{ option.label }
					</label>
				) )
			}
		</fieldset>
	);
};

export default Radio;