import Side from './Side';
import { request } from '/functions';
const { render, useEffect, useState } = wp.element;

const App = () => {
	const [ sides, setSides ] = useState( [] );

	useEffect( () => {
		request( 'relationships-sides' ).then( setSides );
	}, [] );

	return (
		<>
			{ sides.map( side => <Side key={ side.id } { ...side } /> ) }
		</>
	);
};

render( <App />, document.getElementById( 'root' ) );