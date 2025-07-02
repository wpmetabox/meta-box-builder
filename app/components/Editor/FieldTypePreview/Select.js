import { __ } from "@wordpress/i18n";
import { arrayUniqueByKey, doNothing, getFullOptions } from "../../../functions";

const Select = ( { field } ) => field.multiple ? <MultipleSelect field={ field } /> : <SingleSelect field={ field } />;

const MultipleSelect = ( { field } ) => {
	const options = arrayUniqueByKey( getFullOptions( field.options || '' ), 'value' );
	let std = getFullOptions( field.std || '' ).map( option => option.value );

	return (
		<>
			<select multiple value={ std } onChange={ doNothing }>
				{
					options.map( option => (
						<option key={ option.value } value={ option.value }>{ option.label }</option>
					) )
				}
			</select>
			{
				field.select_all_none &&
				<div className="rwmb-select-all-none">
					{ __( 'Select:', 'meta-box-builder' ) } &nbsp;
					<a href="#">{ __( 'All', 'meta-box-builder' ) }</a> | <a href="#">{ __( 'None', 'meta-box-builder' ) }</a>
				</div>
			}
		</>
	);
};

const SingleSelect = ( { field } ) => {
	if ( field.placeholder ) {
		return (
			<select>
				<option value="">{ field.placeholder }</option>
			</select>
		);
	}

	const options = arrayUniqueByKey( getFullOptions( field.options || '' ), 'value' );
	let std = getFullOptions( field.std || '' ).map( option => option.value );

	std = std[ 0 ];

	// For field preview: don't need to render all options.
	// Only render the selected option or the first option if nothing is selected.
	const selectedOption = options.find( option => option.value === std );
	const renderedOption = selectedOption ? selectedOption.label : ( options.length > 0 ? options[ 0 ].label : '' );

	return (
		<select value="" onChange={ doNothing }>
			<option value="">{ renderedOption }</option>
		</select>
	);
};

export default Select;