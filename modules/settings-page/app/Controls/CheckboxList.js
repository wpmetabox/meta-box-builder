const CheckboxList = ( { name, label, options, description } ) => {
	return (
		<div className="mb-spui-field">
			<label className="mb-spui-label" htmlFor={ name }>
				{ label }
			</label>
			<div className="mb-spui-input">
				{ description && <div className="mb-spui-description">{ description }</div> }
				<ul className="mb-spui-input-list">
					{ options.map( ( option, key ) => (
						<li key={ key }>
							<label>
								<input type="checkbox" value={ option.value } onChange={ onChange } />
								{ option.label }
							</label>
						</li>
					) ) }
				</ul>
			</div>
		</div>
	);
};

export default CheckboxList;