import MainTabs from './components/MainTabs';
import { Provider as CommonDataProvider } from './context/CommonData/CommonDataContext';
import { Provider as UpdateConditionalProvider } from './context/ConditionalList/ConditionalContext';
import { Provider as FieldTypesProvider } from './context/FieldTypes/FieldTypesContext';
import { Provider as GeneratorProvider } from './context/Generator/GeneratorContext';

const { render } = wp.element;

const App = () => (
  <CommonDataProvider>
    <GeneratorProvider>
      <UpdateConditionalProvider>
        <FieldTypesProvider>
          <MainTabs />
        </FieldTypesProvider>
      </UpdateConditionalProvider>
    </GeneratorProvider>
  </CommonDataProvider>
);

render( <App />, document.getElementById( 'root' ) );