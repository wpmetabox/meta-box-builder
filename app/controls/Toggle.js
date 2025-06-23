import DivRow from './DivRow';
import Tooltip from './Tooltip';
import { useToggle } from '/hooks/useToggle';

const Toggle = ( { name, componentId, label, defaultValue, tooltip, updateField, ...rest } ) => {
	const toggleDependencies = useToggle( componentId );

	const handleChange = e => {
		toggleDependencies();
		updateField( name, e.target.checked );
	};

	return <DivRow { ...rest }>
		<label className="og-toggle">
			<input type="checkbox" id={ componentId } onChange={ handleChange } defaultChecked={ defaultValue } />
			<div className="og-toggle__switch"></div>
			{ label }
			{ tooltip && <Tooltip id={ componentId } content={ tooltip } /> }
		</label>
	</DivRow>;
};
export default Toggle;