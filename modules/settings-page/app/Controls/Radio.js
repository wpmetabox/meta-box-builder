const Radio = ( { label, name, update, options, value } ) => (
	<div className="mb-spui-field mb-spui-field--radio">
		<label className="mb-spui-label">{ label }</label>
		<div className="mb-spui-input">
			{
				options.map( option => (
					<label key={ option.value } className="mb-spui-choice">
						<input type="radio" data-name={ name } value={ option.value } checked={ option.value === value } onChange={ update } />
						{option.label }
					</label>
				) )
			}
		</div>
	</div>
);

export default Radio;