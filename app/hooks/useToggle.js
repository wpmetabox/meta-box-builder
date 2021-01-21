const { useState, useEffect } = wp.element;

const normalizeBool = value => {
	if ( 'true' === value ) {
		return true;
	}
	if ( 'false' === value ) {
		return false;
	}
	return value;
};


export const useToggle = name => {
	const [ handle, setHandle ] = useState( () => () => {} );

	useEffect( () => {
		const h = () => {
			toggleDependants( getElement( name ) );
		};
		setHandle( () => h );

		// Kick-off the first time.
		h();
	}, [ name ] );

	return handle;
};

const getElement = nameOrElement => typeof nameOrElement === 'string' ? document.getElementById( nameOrElement ) : nameOrElement;

const toggleDependants = ( el, isElHidden = false ) => {
	const deps = getDependants( el );
	deps.forEach( dependant => {
		const dep = dependant.className.match( /dep:([^:]+):([^:\s]+)/ );
		const depValue = normalizeBool( dep[ 2 ] );
		const inputValue = el.type === 'checkbox' ? el.checked : el.value;

		// If el is hidden, always hide the dependant.
		let isHidden = isElHidden || el.classList.contains( 'og-is-hidden' ) || depValue !== inputValue;

		if ( isHidden ) {
			dependant.classList.add( 'og-is-hidden' );
		} else {
			dependant.classList.remove( 'og-is-hidden' );
		}

		// Toggle sub-dependants.
		dependant.querySelectorAll( '.og-input > input, .og-input > select' ).forEach( subEl => {
			toggleDependants( subEl, isHidden );
		 } );
	} );
};

const getDependants = el => {
	if ( !el ) {
		return [];
	}

	let scope = el.closest( '.og-item' );
	scope = scope || el.closest( '.react-tabs__tab-panel' );
	scope = scope || el.closest( '.og' );
	if ( !scope ) {
		return [];
	}

	const shortName = getShortName( el.id );
	return [ ...scope.querySelectorAll( `[class*="dep:${ shortName }:"]` ) ];
};

const getShortName = name => {
	// Get last `-name` part.
	const match = name.match( /-([^-]*)$/ );
	return match ? match[ 1 ] : name;
};