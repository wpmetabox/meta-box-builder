import dotProp from 'dot-prop';
import DivRow from './DivRow';
const { __ } = wp.i18n;

const AdminColumnsPosition = ( { name, defaultValue, ...rest } ) => (
	<DivRow { ...rest }>
		<select name={ `${ name }[type]` } defaultValue={ dotProp.get( defaultValue, 'type', 'after' ) }>
			<option value="after">{ __( 'After', 'meta-box-builder' ) }</option>
			<option value="before">{ __( 'Before', 'meta-box-builder' ) }</option>
			<option value="replace">{ __( 'Replace', 'meta-box-builder' ) }</option>
		</select>
		<input type="text" name={ `${ name }[column]` } defaultValue={ dotProp.get( defaultValue, 'column', '' ) } list="admin-columns" />
	</DivRow>
);

export default AdminColumnsPosition;