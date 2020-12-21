import MainTabs from './components/MainTabs';
import { Provider as UpdateConditionalProvider } from './context/ConditionalList/ConditionalContext';
import { Provider as FieldsDataProvider } from './context/FieldsData/FieldsDataContext';
import { Provider as GeneratorProvider } from './context/Generator/GeneratorContext';

const { render } = wp.element;

const App = () => (
  <FieldsDataProvider>
    <GeneratorProvider>
      <UpdateConditionalProvider>
        <MainTabs />
      </UpdateConditionalProvider>
    </GeneratorProvider>
  </FieldsDataProvider>
);

render( <App />, document.getElementById( 'root' ) );