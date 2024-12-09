import DivRow from './DivRow';
import Tooltip from './Tooltip';
import { useToggle } from '/hooks/useToggle';

const Toggle = ( { name, componentId, label, defaultValue, tooltip, ...rest } ) => {
	const toggle = useToggle( componentId );

	return <DivRow { ...rest }>
		<label className="og-toggle">
			<input type="hidden" name={ name } value={ false } />
			<input type="checkbox" id={ componentId } name={ name } onChange={ toggle } defaultChecked={ defaultValue } value={ true } />
			<div className="og-toggle__switch"></div>
			{ label }
			{ tooltip && <Tooltip id={ componentId } content={ tooltip } /> }
		</label>
	</DivRow>;
};
export default Toggle;