import { __ } from "@wordpress/i18n";

const Button = ( { field } ) => <button className="button">{ field.std || __( 'Click me', 'meta-box-builder' ) }</button>;

export default Button;