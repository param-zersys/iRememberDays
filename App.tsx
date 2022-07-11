import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import {Provider as AuthProvider} from './src/context/AuthContext';
import Index from './src/routes';

const App = () => {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <Index />
      </AuthProvider>
    </SafeAreaProvider>
  );
};
export default App;
