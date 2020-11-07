const { useState, useEffect } = wp.element;

const normalizeBool = value => {
	if ( 'true' === value ) {
		value = true;
	} else if ( 'false' === value ) {
		value = false;
	}
	return value;
};
const normalizeNumber = value => isNaN( parseInt( value ) ) ? value : parseInt( value );

export const useToggle = name => {
	const [ handle, setHandle ] = useState( () => () => {} );

	useEffect( () => {
		const el = document.getElementById( name );
		if ( !el ) {
			return;
		}

		const scope = el.closest( '.og-item' );
		if ( !scope ) {
			return;
		}

		// Strip `fields-uniqueId-` prefix.
		const match = name.match( /-([^-]*)$/ );
		const shortName = match ? match[ 1 ] : name;
		const dependants = scope.querySelectorAll( `[class*="dep:${ shortName }:"]` );
		if ( !dependants.length ) {
			return;
		}

		const h = () => {
			dependants.forEach( dependant => {
				const dep = dependant.className.match( /dep:([^:]+):([^:]+)/ );
				const depValue = normalizeBool( dep[ 2 ] );
				const inputValue = el.type === 'checkbox' ? el.checked : el.value;

				dependant.style.display = depValue === inputValue ? 'flex' : 'none';
			} );
		};
		setHandle( () => h );

		// Kick-off the first time.
		h();
	}, [ name ] );

	return handle;
};