import { Provider as GeneratorProvider } from './context/GeneratorContext';
import { Provider as UpdateSelectedProvider } from './context/UpdateSelected/UpdateSelectedContext';
import { Provider as FieldTypesProvider } from './context/FieldTypes/FieldTypesContext';
import MainTabs from './components/MainTabs';

const { render } = wp.element;

const App = () => (
  <GeneratorProvider>
    <UpdateSelectedProvider>
      <FieldTypesProvider>
        <MainTabs />
      </FieldTypesProvider>
    </UpdateSelectedProvider>
  </GeneratorProvider>
);

render( <App />, document.getElementById( 'root' ) );