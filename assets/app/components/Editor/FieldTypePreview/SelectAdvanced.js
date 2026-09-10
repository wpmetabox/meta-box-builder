import { useLayoutEffect, useRef } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import { doNothing, getFullOptions } from "../../../functions";

const SelectAdvanced = ( { field } ) => {
	const options = getFullOptions( field.options || '' );
	let std = getFullOptions( field.std || '' ).map( option => option.value );
	std = field.multiple ? std : std[ 0 ];

	const ref = useRef();

	useLayoutEffect( () => {
		const select = ref.current;
		// select2 inserts .select2-container as a sibling outside React.
		// On unmount, React removes <select> before the cleanup runs, so keep parent to remove the .select2-container.
		const parent = select.parentElement;
		const $select = jQuery( select );

		$select.select2( {
			allowClear: true,
			dropdownAutoWidth: true,
			placeholder: field.placeholder || __( 'Select an item', 'meta-box-builder' ),
			width: 'style',
		} );

		return () => parent?.querySelector( '.select2-container' )?.remove();
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