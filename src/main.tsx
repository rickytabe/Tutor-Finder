import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './store/store'; // Import store and persistor
import { AppInit } from './components/Main/shared/AppInit.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <AppInit />
      <App />
      </PersistGate>
  </Provider>
</StrictMode>
)
