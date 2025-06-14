import { memo } from "@wordpress/element";

const Heading = ( { field } ) => (
	<>
		{ field.name && <h4>{ field.name }</h4> }
		{ field.desc && <p className="description">{ field.desc }</p> }
	</>
);

export default memo( Heading, ( prev, next ) => prev.field.name === next.field.name && prev.field.desc === next.field.desc );