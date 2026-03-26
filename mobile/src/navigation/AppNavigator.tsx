import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import type {RootStackParamList} from './types';
import {theme} from '../theme/theme';
import {MainTabNavigator} from './MainTabNavigator';
import {GlobalSearchScreen} from '../screens/search/GlobalSearchScreen';
import {QuickActionScreen} from '../screens/QuickActionScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const AppNavigator: React.FC = () => (
  <Stack.Navigator
    initialRouteName="MainTabs"
    screenOptions={{
      headerStyle: {backgroundColor: theme.colors.primary},
      headerTintColor: '#fff',
      headerTitleStyle: {fontWeight: 'bold'},
    }}>
    <Stack.Screen
      name="MainTabs"
      component={MainTabNavigator}
      options={{headerShown: false}}
    />
    <Stack.Group screenOptions={{presentation: 'modal'}}>
      <Stack.Screen
        name="GlobalSearch"
        component={GlobalSearchScreen}
        options={{title: 'Search'}}
      />
      <Stack.Screen
        name="QuickAction"
        component={QuickActionScreen}
        options={{title: 'Quick action'}}
      />
    </Stack.Group>
  </Stack.Navigator>
);
