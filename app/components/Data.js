import { useFormContext } from 'react-hook-form';
const { useEffect, useRef } = wp.element;

export const Data = () => {
	const { getValues } = useFormContext();
	const inputRef = useRef();

	useEffect( () => {
		document.querySelector( '#publish' ).addEventListener( 'click', () => inputRef.current.value = JSON.stringify( getValues() ) );
	}, [] );

	return <input type="hidden" name="data_raw" ref={ inputRef } />;
};
