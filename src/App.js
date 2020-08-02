import React, { lazy, Suspense } from 'react';
import { Provider as GeneratorProvider } from './context/GeneratorContext';
import { Provider as UpdateSelectedProvider } from './context/UpdateSelected/UpdateSelectedContext';

function App() {
  const Result = lazy(() => import('./components/Result'))
  const MainTabs = lazy(() => import('./components/MainTabs/MainTabs'))
  return (
    <div className="og">
      <GeneratorProvider>
        <UpdateSelectedProvider>
          <Suspense fallback={null}>
            <MainTabs />
            <Result />
          </Suspense>
        </UpdateSelectedProvider>
      </GeneratorProvider>
    </div>
  );
}

export default App;
