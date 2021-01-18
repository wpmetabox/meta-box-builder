const Select = ( { label, name, update, description = '', options, value } ) => (
	<div className="mb-spui-field">
		<label className="mb-spui-label" htmlFor={ name }>{ label }</label>
		<div className="mb-spui-input">
			<select id={ name } data-name={ name } value={ value } onChange={ update }>
				{ options.map( ( option, key ) => <option key={ key } value={ option.value }>{ option.label }</option> ) }
			</select>
			{ description && <div className="mb-spui-description">{ description }</div> }
		</div>
	</div>
);

export default Select;