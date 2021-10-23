import dotProp from 'dot-prop';
import DivRow from './DivRow';
const { __ } = wp.i18n;

const AdminColumnsPosition = ( { name, defaultValue, ...rest } ) => {
	let value        = jQuery(document).find("#settings-object_type").val();
	let valueColumn  = 'title';
	jQuery(document).on('change','#settings-object_type', function() {
		value = jQuery(this).val();
	});
	if ( value == 'term') {
		valueColumn = 'name';
	} else if ( value == 'user' ) {
		valueColumn = 'username';
	}
	return (
	    <DivRow { ...rest }>
		    <select name={ `${ name }[type]` } defaultValue={ dotProp.get( defaultValue, 'type', 'after' ) }>
			    <option value="after">{ __( 'After', 'meta-box-builder' ) }</option>
			    <option value="before">{ __( 'Before', 'meta-box-builder' ) }</option>
			    <option value="replace">{ __( 'Replace', 'meta-box-builder' ) }</option>
		    </select>
		    <input type="text" name={ `${ name }[column]` } defaultValue={ dotProp.get( defaultValue, 'column', valueColumn ) } list="admin-columns" />
	    </DivRow>
	);
};

export default AdminColumnsPosition;