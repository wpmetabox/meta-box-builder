import dotProp from 'dot-prop';
import { request } from '/functions';
const { lazy, render, Suspense, useEffect, useState } = wp.element;
const { __ } = wp.i18n;

const App = () => {
	const [ controls, setControls ] = useState( [] );

	useEffect( () => {
		request( 'settings-page-controls' ).then( setControls );
	}, [] );

	const getControlComponent = ( { name, setting, props, defaultValue } ) => {
		// Import control from current app first, then main app.
		const Control = lazy( () => import( `./controls/${ name }` ).catch( () => import( `/controls/${ name }` ) ) );

		// If API specifies input name, then use it. Otherwise use setting.
		const n = dotProp.get( props, 'name', setting );

		// Convert name, name[subfield] to [name], [name][subfield].
		const input = n.replace( /^([^\[]+)/, '[$1]' );

		// Convert name[subfield] to name.subfield to get default value.
		const key = n.replace( '[', '.' ).replace( ']', '' );

		return <Control
			componentId={ `settings-${ setting }` }
			{ ...props }
			name={ `settings${ input }` }
			defaultValue={ dotProp.get( MbbApp.settings, key, defaultValue ) }
		/>;
	};

	const loading = <p>{ __( 'Loading settings, please wait...', 'meta-box-builder' ) }</p>;

	return controls.length === 0
		? loading
		: <>
			{ controls.map( control => <Suspense fallback={ null } key={ control.setting }>{ getControlComponent( control ) }</Suspense> ) }
		</>;
};

render( <App />, document.getElementById( 'root' ) );