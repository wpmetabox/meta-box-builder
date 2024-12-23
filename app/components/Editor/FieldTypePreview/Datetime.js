import { useEffect, useRef } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import { doNothing } from "../../../functions";

const Datetime = ( { field } ) => {
	const inputRef = useRef();
	const inlineRef = useRef();

	useEffect( () => {
		if ( !inlineRef.current ) {
			return;
		}

		const $ = jQuery;
		const $inline = $( inlineRef.current );
		$inline.datetimepicker( {
			showButtonPanel: true,
			changeYear: true,
			changeMonth: true,
			oneLine: true,
			controlType: 'select',
			altFieldTimeOnly: false,
		} );

		const format = field.format || '';
		const std = field.std || '';
		const [ stdDate, stdTime ] = std.split( ' ' );

		try {
			$.datepicker.parseDate( format, stdDate );
			$inline.datetimepicker( 'option', 'dateFormat', format );
			$inline.datetimepicker( 'setDate', field.std );
		} catch ( error ) {
			console.debug( sprintf( __( 'Field %s: invalid format for the datetime picker default value', 'meta-box-builder' ), field.name ) );
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

export default Datetime;