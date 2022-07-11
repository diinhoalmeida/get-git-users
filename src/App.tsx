import React from 'react';
import Routes from './setup/routes';
import { AuthProvider } from '../src/setup/context/context';

function App() {
  return (
    <AuthProvider>
      <Routes />
    </AuthProvider>
  );
}

export default App;
