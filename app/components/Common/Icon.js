import { useFormContext } from 'react-hook-form';
import DivRow from './DivRow';
const { Dashicon } = wp.components;

const Icon = ( { name, componentId, ...rest } ) => {
	const { register } = useFormContext();

	return <DivRow htmlFor={ componentId } className="og-icon" { ...rest }>
		{
			MbbApp.icons.map( icon => (
				<label key={ icon } className="og-icon__select">
					<input type="radio" id={ componentId } name={ name } value={ icon } ref={ register } />
					<Dashicon icon={ icon } />
				</label>
			) )
		}
	</DivRow>;
};

export default Icon;