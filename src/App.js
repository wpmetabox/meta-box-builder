import React, { lazy, Suspense } from 'react';
import { Provider } from './context/GeneratorContext';

function App() {
  const Result = lazy(() => import('./components/Result'))
  const MainTabs = lazy(() => import('./components/MainTabs/MainTabs'))
  return (
    <div className="og">
      <Provider>
        <Suspense fallback={null}>
          <MainTabs />
          <Result />
        </Suspense>
      </Provider>
    </div>
  );
}

export default App;
