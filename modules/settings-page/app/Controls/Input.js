const Input = ( { label, name, value, update, description = '', required = false } ) => {
	return (
		<div className="mb-spui-field">
			<label className="mb-spui-label" htmlFor={ name }>
				{ label }
				{ required && <span className="mb-spui-required">*</span> }
			</label>
			<div className="mb-spui-input">
				<input type="text" required={ required } id={ name } data-name={ name } value={ value } onChange={ update } />
				{ description && <div className="mb-spui-description">{ description }</div> }
			</div>
		</div>
	);
};

export default Input;