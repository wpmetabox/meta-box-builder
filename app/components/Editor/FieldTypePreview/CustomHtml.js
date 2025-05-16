import { memo, RawHTML } from "@wordpress/element";

const CustomHtml = ( { field } ) => <RawHTML>{ field.std }</RawHTML>;

export default memo( CustomHtml, ( prev, next ) => prev.field.std === next.field.std );