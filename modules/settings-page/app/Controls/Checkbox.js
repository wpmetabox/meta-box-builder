const Checkbox = ( { label, name, description, update, checked } ) => (
	<div className="mb-spui-field">
		{label && <label className="mb-spui-label" htmlFor={ name }>{ label }</label> }
		<div className="mb-spui-input">
			{
				description
					? <label className="mb-spui-description"><input type="checkbox" id={ name } data-name={ name } checked={ checked } onChange={ update } /> { description }</label>
					: <input type="checkbox" id={ name } data-name={ name } checked={ checked } onChange={ update } />
			}
		</div>
	</div>
);

export default Checkbox;