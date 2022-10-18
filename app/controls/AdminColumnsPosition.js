import { __ } from "@wordpress/i18n";
import useObjectType from "../hooks/useObjectType";
import DivRow from './DivRow';

const AdminColumnsPosition = ( { name, defaultValue, ...rest } ) => {
	const objectType = useObjectType( state => state.type );
	const defaultColumns = {
		term: 'name',
		user: 'username'
	}
	const defaultColumn = defaultColumns[ objectType ] || 'title';

	return (
		<DivRow { ...rest }>
			<select name={ `${ name }[type]` } defaultValue={ defaultValue.type || 'after' }>
				<option value="after">{ __( 'After', 'meta-box-builder' ) }</option>
				<option value="before">{ __( 'Before', 'meta-box-builder' ) }</option>
				<option value="replace">{ __( 'Replace', 'meta-box-builder' ) }</option>
			</select>
			<input type="text" name={ `${ name }[column]` } defaultValue={ defaultValue.column || defaultColumn } list="admin-columns" />
		</DivRow>
	);
};

export default AdminColumnsPosition;