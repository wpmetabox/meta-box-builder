import Input from '../Input';

const { __ } = wp.i18n;

const AddButton = props => <Input {...props} className='clone_optional' label={ __( 'Add more text', 'meta-box-builder' ) } tooltip={ __( 'Custom text for the the "+ Add more" button. Leave empty to use the default text.', 'meta-box-builder' ) } />
export default AddButton;