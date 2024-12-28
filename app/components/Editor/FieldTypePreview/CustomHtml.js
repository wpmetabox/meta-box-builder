import { RawHTML } from "@wordpress/element";

const CustomHtml = ( { field } ) => <RawHTML>{ field.std }</RawHTML>;

export default CustomHtml;