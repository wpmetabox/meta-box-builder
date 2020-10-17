import Input from '../Input';

const { __ } = wp.i18n;

const MaxClone = props => <Input { ...props } className='clone-setting' label={ __( 'Maximum number of clones', 'meta-box-builder' ) } tooltip={ __( 'Leave empty for unlimited clones', 'meta-box-builder' ) } />;
export default MaxClone;