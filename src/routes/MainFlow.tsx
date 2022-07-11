import React, {useContext, useEffect} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createDrawerNavigator} from '@react-navigation/drawer';

import DashboardScreen from '../screens/Dashboard/DashboardScreen';
import metrics from '../constant/metrics';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const MainStack: React.FC = () => {
  return (
    <Stack.Navigator
      initialRouteName="AddNewDevicesScreen"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="Dashboard" component={DashboardScreen} />
    </Stack.Navigator>
  );
};

const MainFlow: React.FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="MainStack" component={MainStack} />
    </Stack.Navigator>
  );
};

export default MainFlow;
