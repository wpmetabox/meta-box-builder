import { memo } from "@wordpress/element";
import { __ } from "@wordpress/i18n";

const Link = () => <a href="#">{ __( 'Add link', 'meta-box-builder' ) }</a>;

export default memo( Link );
