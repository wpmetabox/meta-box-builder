import { doNothing, getFullOptions } from "../../../functions";

const ImageSelect = ( { field } ) => {
	const options = getFullOptions( field.options || '' );
	const std = getFullOptions( field.std || '' ).map( option => option.value );
	return options.map( option => (
		<label key={ option.value } className="rwmb-image-select">
			<img src={ option.label } />
			<input className="rwmb-image_select" type={ field.multiple ? 'checkbox' : 'radio' } checked={ std.includes( option.value ) } onChange={ doNothing } />
		</label>
	) );
};

export default ImageSelect;