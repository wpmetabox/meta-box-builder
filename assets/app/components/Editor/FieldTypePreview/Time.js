import { useEffect, useRef } from "@wordpress/element";
import { doNothing } from "../../../functions";

const Time = ( { field } ) => {
	const inputRef = useRef();
	const inlineRef = useRef();

	useEffect( () => {
		if ( !inlineRef.current ) {
			return;
		}

		const $ = jQuery;
		const $inline = $( inlineRef.current );
		$inline.timepicker( {
			showButtonPanel: true,
			oneLine: true,
			controlType: 'select',
			altFieldTimeOnly: false,
		} );
	}, [ field.inline ] );

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

export default Time;