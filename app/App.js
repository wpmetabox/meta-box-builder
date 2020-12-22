import MainTabs from './components/MainTabs';
import { Provider as UpdateConditionalProvider } from './context/ConditionalList/ConditionalContext';
import { FieldsDataProvider } from './context/FieldsDataContext';

const { render } = wp.element;

const App = () => (
	<FieldsDataProvider>
		<UpdateConditionalProvider>
			<MainTabs />
		</UpdateConditionalProvider>
	</FieldsDataProvider>
);

render( <App />, document.getElementById( 'root' ) );