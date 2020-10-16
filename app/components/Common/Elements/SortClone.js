import Checkbox from '../Checkbox';

const { __ } = wp.i18n;

const SortClone = props => <Checkbox {...props} className='clone-setting' label={ __( 'Sortable', 'meta-box-builder' ) } tooltip={ __( 'Allows to drag-and-drop reorder clones', 'meta-box-builder' ) } />
export default SortClone;