import { Provider as GeneratorProvider } from './context/GeneratorContext';
import { Provider as UpdateSelectedProvider } from './context/UpdateSelected/UpdateSelectedContext';
import { Provider as FieldTypesProvider } from './context/FieldTypes/FieldTypesContext';
import MainTabs from './components/MainTabs/MainTabs';

const App = () => (
  <div className="og">
    <GeneratorProvider>
      <UpdateSelectedProvider>
        <FieldTypesProvider>
            <MainTabs />
        </FieldTypesProvider>
      </UpdateSelectedProvider>
    </GeneratorProvider>
  </div>
);

export default App;
