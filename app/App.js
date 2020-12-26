import MainTabs from './components/MainTabs';
import { ConditionalLogicProvider } from './contexts/ConditionalLogicContext';
import { FieldsDataProvider } from './contexts/FieldsDataContext';

const { render } = wp.element;

const App = () => (
	<FieldsDataProvider>
		<ConditionalLogicProvider>
			<MainTabs />
		</ConditionalLogicProvider>
	</FieldsDataProvider>
);

render( <App />, document.getElementById( 'root' ) );