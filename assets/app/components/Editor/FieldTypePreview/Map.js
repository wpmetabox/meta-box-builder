import { memo } from "@wordpress/element";

const Map = ( { field } ) => <img src={ `${ MbbApp.assetsBaseUrl }/img/${ field.type }.png` } />;

export default memo( Map );