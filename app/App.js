import MainTabs from './components/MainTabs';
import { Provider as CommonDataProvider } from './context/CommonData/CommonDataContext';
import { Provider as FieldTypesProvider } from './context/FieldTypes/FieldTypesContext';
import { Provider as GeneratorProvider } from './context/Generator/GeneratorContext';
import { Provider as UpdateSelectedProvider } from './context/UpdateSelected/UpdateSelectedContext';

const { render } = wp.element;

const App = () => (
  <CommonDataProvider>
    <GeneratorProvider>
      <UpdateSelectedProvider>
        <FieldTypesProvider>
          <MainTabs />
        </FieldTypesProvider>
      </UpdateSelectedProvider>
    </GeneratorProvider>
  </CommonDataProvider>
);

render( <App />, document.getElementById( 'root' ) );