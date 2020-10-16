import Checkbox from '../Checkbox';

const { __ } = wp.i18n;

const Clone = props => <Checkbox {...props} label="Cloneable" tooltip={ __( 'Make field cloneable (repeatable)', 'meta-box-builder' ) } />
export default Clone;