import { useState } from 'react';
import { __ } from "@wordpress/i18n";
import DivRow from './DivRow';

const AdminColumnsWidth = ( { defaultValue = '', componentId, updateField, ...rest } ) => {

	const [ number, setNumber ] = useState( parseInt( defaultValue ) || '' );
	const [ unit, setUnit ] = useState( defaultValue.includes( 'px' ) ? 'px' : '%' );

	const handleChange = ( e ) => {
		const { name, value } = e.target;
		const newNumber = ( name === 'number' ) ? value : number;
		const newUnit = ( name === 'unit' ) ? value : unit;

		setNumber( newNumber );
		setUnit( newUnit );

		updateField( 'admin_columns.width', `${ newNumber }${ newUnit }` );
	};

	return (
		<DivRow htmlFor={ componentId } { ...rest }>
			<div className="og-input-group og-input-group--small">
				<input
					type="number"
					min="0"
					name="number"
					id={ `${ componentId }-number` }
					value={ number }
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