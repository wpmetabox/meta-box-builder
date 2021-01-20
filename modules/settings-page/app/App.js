import Control from './Control';
import { Fields } from './Fields';
const { render } = wp.element;

const App = () => <>
	{ Fields.map( field => <Control key={ field.name } field={ field } /> ) }
</>;

render( <App />, document.getElementById( 'root' ) );