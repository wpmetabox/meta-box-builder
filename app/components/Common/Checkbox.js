import { useToggle } from '../../hooks/useToggle';
import DivRow from './DivRow';

const Checkbox = ( { name, componentId, label, className, defaultValue, ...rest } ) => {
	const toggle = useToggle( componentId );

	return <DivRow label={ label } className={ className } htmlFor={ componentId } { ...rest }>
		<input type="checkbox" id={ componentId } name={ name } onChange={ toggle } defaultChecked={ defaultValue } />
	</DivRow>;
};
export default Checkbox;