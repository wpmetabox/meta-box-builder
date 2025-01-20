import { useEffect, useRef } from "@wordpress/element";

const Color = ( { field } ) => {
	const ref = useRef();

	useEffect( () => {
		const $input = jQuery( ref.current );
		$input.wpColorPicker();
		$input.iris( 'color', field.std || '' );
	}, [ field.std ] );

	return <input ref={ ref } type="text" />;
};

export default Color;