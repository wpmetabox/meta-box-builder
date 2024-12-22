import { useRef, useEffect } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import { doNothing, getOptions } from "../../../functions";

const SelectAdvanced = ( { field } ) => {
	const options = getOptions( field.options || '' );
	let std = field.std || '';
	std = field.multiple ? getOptions( std ) : std;
	const ref = useRef();

	useEffect( () => {
		jQuery( ref.current ).select2( {
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
				{ options.map( option => <option key={ option } value={ option }>{ option }</option> ) }
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