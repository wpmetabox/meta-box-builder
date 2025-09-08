const Required = ( { name, label, defaultValue, updateField } ) => (
	<label className="og-status">
		<input type="checkbox" checked={ defaultValue } value={ true } onChange={ e => updateField( name, e.target.checked ) } />
		{ label }
	</label>
);

export default Required;