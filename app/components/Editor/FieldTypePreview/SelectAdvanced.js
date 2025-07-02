import { useEffect, useRef } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import { arrayUniqueByKey, doNothing, getFullOptions } from "../../../functions";

const SelectAdvanced = ( { field } ) => {
	const options = arrayUniqueByKey( getFullOptions( field.options || '' ), 'value' );
	let std = getFullOptions( field.std || '' ).map( option => option.value );
	std = field.multiple ? std : std[ 0 ];

	const ref = useRef();

	useEffect( () => {
		const $select = jQuery( ref.current );

		// Remove previous select2 instance, like in "post" field, when changing field_type.
		$select.siblings( '.select2-container' ).remove();

		$select.select2( {
			allowClear: true,
			dropdownAutoWidth: true,
			placeholder: field.placeholder || __( 'Select an item', 'meta-box-builder' ),
			width: 'style',
		} );
	}, [ field.multiple, field.std, field.placeholder ] );

	return (
		<>
			<select multiple={ field.multiple } ref={ ref } value={ std } onChange={ doNothing }>
				<option value="">{ field.placeholder || __( 'Select an item', 'meta-box-builder' ) }</option>
				{ options.map( option => <option key={ option.value } value={ option.value }>{ option.label }</option> ) }
			</select>
			{
				field.multiple && field.select_all_none &&
				<div className="rwmb-select-all-none">
					{ __( 'Select:', 'meta-box-builder' ) } &nbsp;
					<a href="#">{ __( 'All', 'meta-box-builder' ) }</a> | <a href="#">{ __( 'None', 'meta-box-builder' ) }</a>
				</div>
			}
		</>
	);
};

export default SelectAdvanced;