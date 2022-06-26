import React from 'react';

import {Provider as AuthProvider} from './src/context/AuthContext';
import Index from './src/routes';

const App = () => {
  return (
    <AuthProvider>
      <Index />
    </AuthProvider>
  );
};
export default App;
