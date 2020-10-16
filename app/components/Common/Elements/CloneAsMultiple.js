import Checkbox from '../Checkbox';

const { __ } = wp.i18n;

const CloneAsMultiple = props => <Checkbox {...props} className='clone_optional' label={ __( 'Clone as multiple', 'meta-box-builder' ) } tooltip={ __( 'Save clones in multiple rows in the database', 'meta-box-builder' ) } />
export default CloneAsMultiple;