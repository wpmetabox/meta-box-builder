import Control from './Control';
import { Options } from './Options';
const { render } = wp.element;

const App = () => <>
	{ Options.map( field => <Control key={ field.name } field={ field } /> ) }
</>;

render( <App />, document.getElementById( 'root' ) );