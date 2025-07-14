import { useEffect, useRef } from "@wordpress/element";

const Slider = ( { field } ) => {
	const ref = useRef();
	useEffect( () => {
		jQuery( ref.current ).slider( {
			range: 'min',
			value: field.std,
		} );
	}, [ field.prefix, field.std, field.suffix ] );

	return (
		<div className="rwmb-slider-inner">
			<div className="rwmb-slider-ui" ref={ ref }></div>
			<span className="rwmb-slider-label">{ field.prefix }<span>{ field.std }</span>{ field.suffix }</span>
		</div>
	);
};

export default Slider;