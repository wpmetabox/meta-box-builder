import { __ } from "@wordpress/i18n";
import DivRow from './DivRow';

const AdminColumnsWidth = ( { defaultValue, componentId, updateField, ...rest } ) => {
	const updateWidth = e => updateField( 'admin_columns.width.number', e.target.value );
	const updateUnit = e => updateField( 'admin_columns.width.unit', e.target.value );

	return (
		<DivRow htmlFor={ componentId } { ...rest }>
			<div className="og-input-group og-input-group--small">
				<input
					type="number"
					min="0"
					id={ `${ componentId }-number` }
					defaultValue={ defaultValue.number || '' }
					onChange={ updateWidth }
				/>
				<select defaultValue={ defaultValue.unit || '%' } onChange={ updateUnit }>
					<option value="%">{ __( '%', 'meta-box-builder' ) }</option>
					<option value="px">{ __( 'px', 'meta-box-builder' ) }</option>
				</select>
			</div>
		</DivRow>
	);
};

export default AdminColumnsWidth;