import DivRow from '/components/Controls/DivRow';

const Checkbox = ( { name, defaultValue, update, ...rest } ) => {
	return <DivRow htmlFor={ name } { ...rest }>
		<input type="checkbox" id={ name } name={ name } onChange={ update } defaultChecked={ defaultValue } value={ true } />
	</DivRow>;
};
export default Checkbox;