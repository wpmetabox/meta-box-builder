import Checkbox from '../Checkbox';

const { __ } = wp.i18n;

const CloneDefault = props => <Checkbox {...props} className='clone_optional' label={ __( 'Clone default value', 'meta-box-builder' ) } />
export default CloneDefault;