import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import type {MoreStackParamList} from '../types';
import {theme} from '../../theme/theme';
import {MoreMenuScreen} from '../../screens/more/MoreMenuScreen';

const Stack = createNativeStackNavigator<MoreStackParamList>();

export const MoreStack: React.FC = () => (
  <Stack.Navigator
    initialRouteName="MoreMenu"
    screenOptions={{
      headerStyle: {backgroundColor: theme.colors.primary},
      headerTintColor: '#fff',
      headerTitleStyle: {fontWeight: 'bold'},
    }}>
    <Stack.Screen
      name="MoreMenu"
      component={MoreMenuScreen}
      options={{title: 'More'}}
    />
  </Stack.Navigator>
);
