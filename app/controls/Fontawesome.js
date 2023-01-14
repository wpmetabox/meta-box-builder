import { useState } from "@wordpress/element";
import DivRow from './DivRow';

const FontAwesome = ( { name, componentId, defaultValue, icons = MbbApp.icons, ...rest } ) => {
	const [ value, setValue ] = useState( defaultValue );
	return (
		<DivRow htmlFor={ componentId } className="og-icon" { ...rest }>
			<div className='og-icon-selected'>
				<span className={ `icon-fontawesome ${ value }` }></span>
				<input type="text" className="og-icon-search" name={ name } value={ value } onChange={ event => setValue( event.target.value ) } />
			</div>
		</DivRow >
	);
};

export default FontAwesome;