import { useState } from '@wordpress/element';

const useToolbar = () => {
	const [ position, setPosition ] = useState( {
		x: 0,
		y: 0,
		width: 0,
		height: 0,
	} );

	const showToolbar = e => {
		const parent = e.target.closest( '.mb-field' );
		if ( !parent ) {
			return;
		}

		const rect = parent.getBoundingClientRect();

		e.preventDefault();
		e.stopPropagation();
		setPosition( rect );
	};

	return {
		showToolbar,
		toolbarPosition: position,
	};
};

export default useToolbar;
