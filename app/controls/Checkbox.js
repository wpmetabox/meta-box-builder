import DivRow from './DivRow';
import { useToggle } from '/hooks/useToggle';

const Checkbox = ( { name, componentId, label, className, defaultValue, ...rest } ) => {
	const toggle = useToggle( componentId );

	return <DivRow label={ label } className={ className } htmlFor={ componentId } { ...rest }>
		<input type="checkbox" id={ componentId } name={ name } onChange={ toggle } defaultChecked={ defaultValue } value={ true } />
	</DivRow>;
};
export default Checkbox;