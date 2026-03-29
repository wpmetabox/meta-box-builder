import { useEffect, useRef } from "@wordpress/element";
import { __, sprintf } from "@wordpress/i18n";
import { doNothing } from "../../../functions";

const normalizeJsOptions = ( options ) => {
	if ( ! options || typeof options !== 'object' ) {
		return {};
	}

	const result = {};

	Object.values( options ).forEach( ( item ) => {
		if ( item && item.key ) {
			result[ item.key ] = item.value;
		}
	} );

	return result;
};

const Datetime = ( { field } ) => {
	const inputRef = useRef();
	const inlineRef = useRef();

	useEffect( () => {
		if ( !inlineRef.current ) {
			return;
		}

		const $ = jQuery;
		const $inline = $( inlineRef.current );

		// Reset UI
		if ( $inline.hasClass('hasDatepicker') ) {
			$inline.datepicker('destroy');
		}

		$inline.datetimepicker( {
			showButtonPanel: true,
			changeYear: true,
			changeMonth: true,
			oneLine: true,
			controlType: 'select',
			altFieldTimeOnly: false,
		} );

		// Parse datetime with format "date time"
		const jsOptions = normalizeJsOptions( field.js_options );

		const separator = jsOptions.separator || ' ';
		const datetimeFormat = field.datetime_format || '';
		const pos = datetimeFormat.indexOf( separator );

		const fallbackDateFormat = pos !== -1 ? datetimeFormat.substring( 0, pos ) : datetimeFormat;
		const fallbackTimeFormat = pos !== -1 ? datetimeFormat.substring( pos + separator.length ) : '';

		const dateFormat = jsOptions.dateFormat || fallbackDateFormat;
		const timeFormat = jsOptions.timeFormat || fallbackTimeFormat;

		const std = field.std || '';
		const [ stdDate ] = std.split( separator );

		try {
			// Validate date
			if ( dateFormat && stdDate ) {
				$.datepicker.parseDate( dateFormat, stdDate );
			}

			if ( dateFormat ) {
				$inline.datetimepicker( 'option', 'dateFormat', dateFormat );
			}

			if ( timeFormat ) {
				$inline.datetimepicker( 'option', 'timeFormat', timeFormat );
			}

			// Set value
			if ( std ) {
				$inline.datetimepicker( 'setDate', std );
			}

		} catch ( error ) {
			console.error( `ERROR: Field ${ field.name }: invalid format for the datetime picker default value` );
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
