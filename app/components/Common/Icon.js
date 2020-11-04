import { useFormContext } from 'react-hook-form';
import DivRow from './DivRow';
const { Dashicon } = wp.components;
const { useState } = wp.element;

const Icon = ( { name, ...rest } ) => {
	const { register } = useFormContext();
	const [ selected, setSelected ] = useState();
	const updateIcon = e => e.target.checked && setSelected( e.target.value );

	return <DivRow htmlFor={ name } className="og-icon" { ...rest }>
		{
			MbbApp.icons.map( icon => (
				<label key={ icon } className={ `og-icon__select${ icon === selected ? ' og-icon__select--active' : '' }` }>
					<input type="radio" name={ name } value={ icon } onChange={ updateIcon }/>
					<Dashicon icon={ icon } />
				</label>
			) )
		}
	</DivRow>;
};

export default Icon;