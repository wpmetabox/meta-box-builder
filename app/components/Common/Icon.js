import { useFormContext } from 'react-hook-form';
import DivRow from './DivRow';
const { Dashicon } = wp.components;
const { useState } = wp.element;

const Icon = ( { name, ...rest } ) => {
	const { register } = useFormContext();

	return <DivRow htmlFor={ name } className="og-icon" { ...rest }>
		{
			MbbApp.icons.map( icon => (
				<label key={ icon } className="og-icon__select">
					<input type="radio" name={ name } value={ icon } ref={ register }/>
					<Dashicon icon={ icon } />
				</label>
			) )
		}
	</DivRow>;
};

export default Icon;