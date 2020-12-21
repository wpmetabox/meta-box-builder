import MainTabs from './components/MainTabs';
import { Provider as CommonDataProvider } from './context/CommonData/CommonDataContext';
import { Provider as UpdateConditionalProvider } from './context/ConditionalList/ConditionalContext';
import { Provider as GeneratorProvider } from './context/Generator/GeneratorContext';

const { render } = wp.element;

const App = () => (
  <CommonDataProvider>
    <GeneratorProvider>
      <UpdateConditionalProvider>
        <MainTabs />
      </UpdateConditionalProvider>
    </GeneratorProvider>
  </CommonDataProvider>
);

render( <App />, document.getElementById( 'root' ) );