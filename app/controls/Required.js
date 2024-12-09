const Required = ( { name, label, defaultValue, ...rest } ) => (
	<label className="og-status">
		<input type="hidden" name={ name } value={ false } />
		<input type="checkbox" name={ name } defaultChecked={ defaultValue } value={ true } />
		{ label }
	</label>
);

export default Required;