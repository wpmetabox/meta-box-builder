import { RawHTML } from "@wordpress/element";

export default ( { field } ) => field.before && <RawHTML>{ field.before }</RawHTML>;