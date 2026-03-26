import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import type {ClientsStackParamList} from '../types';
import {theme} from '../../theme/theme';
import {ClientListScreen} from '../../screens/clients/ClientListScreen';

const Stack = createNativeStackNavigator<ClientsStackParamList>();

export const ClientsStack: React.FC = () => (
  <Stack.Navigator
    initialRouteName="ClientList"
    screenOptions={{
      headerStyle: {backgroundColor: theme.colors.primary},
      headerTintColor: '#fff',
      headerTitleStyle: {fontWeight: 'bold'},
    }}>
    <Stack.Screen
      name="ClientList"
      component={ClientListScreen}
      options={{title: 'Clients'}}
    />
  </Stack.Navigator>
);
