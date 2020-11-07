import { useFormContext } from 'react-hook-form';
import { useToggle } from '../useToggle';
import DivRow from './DivRow';

const Checkbox = ( { name, label, className, defaultValue, ...rest } ) => {
	const { register } = useFormContext();
	const toggle = useToggle( name );

	return <DivRow label={ label } className={ className } htmlFor={ name } { ...rest }>
		<input type="checkbox" id={ name } name={ name } onChange={ toggle } ref={ register } defaultChecked={ defaultValue } />
	</DivRow>;
};
export default Checkbox;