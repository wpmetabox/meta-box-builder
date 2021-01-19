import DivRow from '/components/Controls/DivRow';

const Select = ( { name, options, value, update, ...rest } ) => {
	return <DivRow htmlFor={ name } { ...rest }>
		<select id={ name } name={ name } value={ value } onChange={ update }>
			{ !value && <option value=""></option> }
			{
				Object.entries( options ).map( ( [ value, label ] ) => <option key={ value } value={ value }>{ label }</option> )
			}
		</select>
	</DivRow>;
};

export default Select;