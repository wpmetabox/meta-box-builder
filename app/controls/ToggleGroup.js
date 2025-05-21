import DivRow from './DivRow';
const ToggleGroup = ( { name, options, defaultValue, updateField, ...rest } ) => {
	const handleChange = e => e.target.checked && updateField( name, e.target.value );

	return (
		<DivRow { ...rest }>
			<div className="og-toggle-group">
				{
					Object.entries( options ).map( ( [ value, label ] ) => (
						<label key={ value }>
							<input type="radio" defaultValue={ value } defaultChecked={ value === defaultValue } onChange={ handleChange } />
							<span className="dashicons dashicons-yes-alt"></span>
							<span>{ label }</span>
						</label>
					) )
				}
			</div>
		</DivRow>
	);
};

export default ToggleGroup;