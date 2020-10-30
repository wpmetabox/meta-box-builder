import { useFormContext } from 'react-hook-form';
import DivRow from './DivRow';
const { Dashicon } = wp.components;
const { useState } = wp.element;

const Icons = ( { name, ...rest } ) => {
	const { register } = useFormContext();
	const [ selected, setSelected ] = useState();
	const updateIcon = e => e.target.checked && setSelected( e.target.value );

	return <DivRow htmlFor={ name } className="og-icons" { ...rest }>
		{
			MbbApp.icons.map( icon => (
				<label key={ icon } className={ `og-icon-select${ icon === selected ? ' og-icon-select--active' : '' }` }>
					<Dashicon icon={ icon } />
					<input type="radio" name={ name } value={ icon } className="hidden" onChange={ updateIcon }/>
				</label>
			) )
		}
	</DivRow>;
};

export default Icons;