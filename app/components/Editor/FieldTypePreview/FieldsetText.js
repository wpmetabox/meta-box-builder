const FieldsetText = ( { field } ) => {
	const options = Object.values( field.options || {} );
	return (
		<fieldset>
			{ field.desc && <legend>{ field.desc }</legend> }
			{
				options.map( option => (
					<p key={ option.id }>
						<label>{ option.value }</label>
						<input type="text" />
					</p>
				) )
			}
		</fieldset>
	);
};

export default FieldsetText;