import { useFormContext } from 'react-hook-form';
import DivRow from './DivRow';
const { Dashicon } = wp.components;

const Icon = ( { name, componentId, defaultValue, ...rest } ) => {
	const { register } = useFormContext();

	return <DivRow htmlFor={ componentId } className="og-icon" { ...rest }>
		{
			MbbApp.icons.map( icon => (
				<label key={ icon } className="og-icon__select">
					<input type="radio" className={ `fields-${ rest.fieldId }-icon` } name={ name } value={ icon } ref={ register } defaultChecked={ icon === defaultValue } />
					<Dashicon icon={ icon } />
				</label>
			) )
		}
	</DivRow>;
};

export default Icon;