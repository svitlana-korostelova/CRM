import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import type {DashboardStackParamList} from '../types';
import {theme} from '../../theme/theme';
import {DashboardScreen} from '../../screens/dashboard/DashboardScreen';
import {NotificationListScreen} from '../../screens/dashboard/NotificationListScreen';

const Stack = createNativeStackNavigator<DashboardStackParamList>();

export const DashboardStack: React.FC = () => (
  <Stack.Navigator
    initialRouteName="Dashboard"
    screenOptions={{
      headerStyle: {backgroundColor: theme.colors.primary},
      headerTintColor: '#fff',
      headerTitleStyle: {fontWeight: 'bold'},
    }}>
    <Stack.Screen
      name="Dashboard"
      component={DashboardScreen}
      options={{title: 'Dashboard'}}
    />
    <Stack.Screen
      name="NotificationList"
      component={NotificationListScreen}
      options={{title: 'Notifications'}}
    />
  </Stack.Navigator>
);
