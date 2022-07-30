import React from 'react';
import Routes from './setup/routes';
import { AuthProvider } from '../src/setup/context/context';
import { AlertProvider } from '..//src/setup/context/alert-context';
import AlertPopup from './components/alert-popup';

function App() {
  return (
    <AlertProvider >
      <AuthProvider>
        <Routes />
        <AlertPopup />
      </AuthProvider>
    </AlertProvider>
  );
}

export default App;
