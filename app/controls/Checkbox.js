import DivRow from './DivRow';
import { useToggle } from '/hooks/useToggle';

const Checkbox = ( { name, componentId, label, className, defaultValue, updateField, ...rest } ) => {
	const toggleDependencies = useToggle( componentId );

	const handleChange = e => {
		toggleDependencies();
		updateField( name, e.target.checked );
	};

	return <DivRow label={ label } className={ `og-field--checkbox ${ className }` } htmlFor={ componentId } { ...rest }>
		<label className="og-toggle">
			<input type="checkbox" id={ componentId } onChange={ handleChange } defaultChecked={ defaultValue } />
			<div className="og-toggle__switch"></div>
		</label>
	</DivRow>;
};
export default Checkbox;