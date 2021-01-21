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

	const el = getElement( name );
	const wrapper = el ? el.closest( '.og-field' ) : null;
	const classList = wrapper ? wrapper.classList : '';

	useEffect( () => {
		const h = () => el && toggleDependants( el );
		setHandle( () => h );

		// Kick-off the first time.
		h();
	}, [ name, classList ] ); // Depends on classList in case it's set hidden by another field.

	return handle;
};

const getElement = nameOrElement => typeof nameOrElement === 'string' ? document.getElementById( nameOrElement ) : nameOrElement;

const toggleDependants = el => {
	const inputValue = el.type === 'checkbox' ? el.checked : el.value;
	const wrapper = el.closest( '.og-field' );

	getDependants( el ).forEach( dependant => {
		const dep = dependant.className.match( /dep:([^:]+):([^:\s]+)/ );
		const depValue = normalizeBool( dep[ 2 ] );

		// If current element is hidden, always hide the dependant.
		let isHidden = wrapper.classList.contains( 'og-is-hidden' ) || depValue !== inputValue;

		if ( isHidden ) {
			dependant.classList.add( 'og-is-hidden' );
		} else {
			dependant.classList.remove( 'og-is-hidden' );
		}

		// Toggle sub-dependants.
		dependant.querySelectorAll( '.og-input > input, .og-input > select' ).forEach( toggleDependants );
	} );
};

const getDependants = el => {
	let scope = el.closest( '.og-item' );
	scope = scope || el.closest( '.react-tabs__tab-panel' );
	scope = scope || el.closest( '.og' );

	const shortName = getShortName( el.id );
	return [ ...scope.querySelectorAll( `[class*="dep:${ shortName }:"]` ) ];
};

const getShortName = name => {
	// Get last `-name` part.
	const match = name.match( /-([^-]*)$/ );
	return match ? match[ 1 ] : name;
};