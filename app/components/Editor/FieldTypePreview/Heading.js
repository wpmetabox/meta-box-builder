const Heading = ( { field } ) => (
	<>
		{ field.name && <h4>{ field.name }</h4> }
		{ field.desc && <p className="description">{ field.desc }</p> }
	</>
);

export default Heading;