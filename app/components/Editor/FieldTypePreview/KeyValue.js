const KeyValue = ( { field } ) => {
	return (
		<>
			<input type="text" placeholder={ field.placeholder_key } />
			<input type="text" placeholder={ field.placeholder_value } />
		</>
	);
};

export default KeyValue;