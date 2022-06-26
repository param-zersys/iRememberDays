import 'react-native-gesture-handler';
import React, {useEffect, useContext} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

//USER DEFINED IMPORTS
import {Context as AuthContext} from '../context/AuthContext';
import MainFlow from './MainFlow';
import {navigationRef} from '../../RootNavigation';

const Stack = createNativeStackNavigator();

const Index: React.FC = () => {
  const {state, localSignIn} = useContext(AuthContext);

  useEffect(() => {
    localSignIn();
  }, []);

  if (state.isLoading) {
    return <></>;
  }

  if (!state.isLoading) {
    return (
      <NavigationContainer ref={navigationRef}>
        <>
          <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name="MainFlow" component={MainFlow} />
          </Stack.Navigator>
          {/* <Toast /> */}
        </>
      </NavigationContainer>
    );
  } else {
    return <></>;
  }
};

export default Index;
