const Textarea = ( { label, name, placeholder, value, update, description = '', required = false } ) => (
	<div className="mb-spui-field">
		<label className="mb-spui-label" htmlFor={ name }>
			{ label }
			{ required && <span className="mb-spui-required">*</span> }
		</label>
		<div className="mb-spui-input">
			<textarea id={ name } data-name={ name } placeholder={ placeholder } value={ value } onChange={ update } />
			{ description && <div className="mb-spui-description">{ description }</div> }
		</div>
	</div>
);

export default Textarea;