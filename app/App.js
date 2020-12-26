import MainTabs from './components/MainTabs';
import { ConditionalLogicProvider } from './context/ConditionalLogicContext';
import { FieldsDataProvider } from './context/FieldsDataContext';

const { render } = wp.element;

const App = () => (
	<FieldsDataProvider>
		<ConditionalLogicProvider>
			<MainTabs />
		</ConditionalLogicProvider>
	</FieldsDataProvider>
);

render( <App />, document.getElementById( 'root' ) );