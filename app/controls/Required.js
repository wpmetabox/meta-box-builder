const Required = ( { name, label, defaultValue, updateField, ...rest } ) => (
	<label className="og-status">
		<input type="hidden" name={ name } value={ false } />
		<input type="checkbox" name={ name } checked={ defaultValue } value={ true } onChange={ e => updateField( name, e.target.checked ) } />
		{ label }
	</label>
);

export default Required;