import { RawHTML } from "@wordpress/element";

export default ( { field } ) => field.after && <RawHTML>{ field.after }</RawHTML>;