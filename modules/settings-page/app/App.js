import Control from './Controls/Control';
import DefaultSettings from './DefaultSettings';
import { Options } from './Options';
import { SettingsProvider } from './SettingsContext';

const { render } = wp.element;
const settings = MBSPUI.settings ? MBSPUI.settings : DefaultSettings;

const App = () => (
	<SettingsProvider initialValue={ settings }>
		{ Options.map( field => <Control key={ field.name } field={ field } /> ) }
	</SettingsProvider>
);

render( <App />, document.getElementById( 'root' ) );