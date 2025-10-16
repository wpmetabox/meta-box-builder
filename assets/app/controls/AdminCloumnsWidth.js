import { useState } from 'react';
import { __ } from "@wordpress/i18n";
import DivRow from './DivRow';

const AdminColumnsWidth = ( { defaultValue = '', componentId, updateField, ...rest } ) => {

	const [ value, setValue ] = useState( parseInt( defaultValue ) || '' );
	const [ unit, setUnit ] = useState( defaultValue.includes( 'px' ) ? 'px' : '%' );

	const handleChange = ( e ) => {
		const { name, value: fieldValue } = e.target;
		const newValue = ( name === 'value' ) ? fieldValue : value;
		const newUnit = ( name === 'unit' ) ? fieldValue : unit;

		setValue( newValue );
		setUnit( newUnit );

		updateField( 'admin_columns.width', `${ newValue }${ newUnit }` );
	};

	return (
		<DivRow htmlFor={ componentId } { ...rest }>
			<div className="og-input-group og-input-group--small">
				<input
					type="number"
					min="0"
					name="value"
					id={ `${ componentId }-value` }
					value={ value }
					onChange={ handleChange }
				/>
				<select name="unit" value={ unit } onChange={ handleChange }>
					<option value="%">{ __( '%', 'meta-box-builder' ) }</option>
					<option value="px">{ __( 'px', 'meta-box-builder' ) }</option>
				</select>
			</div>
		</DivRow>
	);
};

export default AdminColumnsWidth;