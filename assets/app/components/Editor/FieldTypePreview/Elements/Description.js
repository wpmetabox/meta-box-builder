import { memo } from "@wordpress/element";

const Description = ( { field } ) => field.desc && <p className="description">{ field.desc }</p>;

export default memo( Description, ( prev, next ) => prev.field.desc === next.field.desc );