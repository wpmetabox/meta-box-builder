import { useEffect, useRef } from "@wordpress/element";
import { __, sprintf } from "@wordpress/i18n";
import { doNothing } from "../../../functions";

const Date = ( { field } ) => {
	const inputRef = useRef();
	const inlineRef = useRef();

	useEffect( () => {
		if ( !inlineRef.current ) {
			return;
		}

		const $ = jQuery;
		const $inline = $( inlineRef.current );
		$inline.datepicker( {
			showButtonPanel: true,
			changeYear: true,
			changeMonth: true,
		} );

		try {
			$.datepicker.parseDate( field.format, field.std );
			$inline.datepicker( 'option', 'dateFormat', field.format );
			$inline.datepicker( 'setDate', field.std );
		} catch ( error ) {
			console.log( sprintf( __( 'Field %s: invalid format for the date picker default value', 'meta-box-builder' ), field.name ) );
		}
	}, [ field.format, field.std, field.inline ] );

	const prepend = field.prepend && <span className="rwmb-input-group-text">{ field.prepend }</span>;
	const append = field.append && <span className="rwmb-input-group-text">{ field.append }</span>;
	const input = <input
		ref={ inputRef }
		type="text"
		placeholder={ field.placeholder }
		size={ field.size }
		value={ field.std || '' }
		onChange={ doNothing }
	/>;

	return (
		<>
			{
				prepend || append
					? <div className="rwmb-input-group">{ prepend }{ input }{ append }</div>
					: input
			}
			{ field.inline && <div ref={ inlineRef } className="rwmb-datetime-inline"></div> }
		</>
	);
};

export default Date;