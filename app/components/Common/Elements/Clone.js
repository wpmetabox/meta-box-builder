import Checkbox from '../Checkbox';

const { __ } = wp.i18n;

const Clone = props => <Checkbox {...props} setting="clone" label={ __( 'Cloneable', 'meta-box-builder' ) } tooltip={ __( 'Make field cloneable (repeatable)', 'meta-box-builder' ) } />
export default Clone;