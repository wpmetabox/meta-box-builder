import Input from '../../Common/Input';
const { __ } = wp.i18n;

export const CustomTable = ( { objectType } ) => objectType !== 'setting' && <Input
	label={ `<a href="https://metabox.io/plugins/mb-custom-table/" target="_blank" rel="noopener noreferrer">${ __( 'Save data in a custom table', 'meta-box-builder' ) }</a>` }
	tooltip={ __( 'Use a custom table rather than meta table to save space and increase performance.', 'meta-box-builder' ) }
	placeholder={ __( 'Enter table name (with prefix)', 'meta-box-builder' ) }
/>;