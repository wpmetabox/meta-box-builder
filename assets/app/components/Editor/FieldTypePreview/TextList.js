const TextList = ( { field } ) => {
	const options = Object.values( field.options || {} );
	return options.map( option => (
		<label key={ option.id }>
			<span className="rwmb-text-list-label">{ option.value }</span>
			<input type="text" className="rwmb-text_list" placeholder={ option.key } />
		</label>
	) );
};

export default TextList;