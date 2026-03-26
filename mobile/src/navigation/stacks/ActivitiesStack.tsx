import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import type {ActivitiesStackParamList} from '../types';
import {theme} from '../../theme/theme';
import {ActivityListScreen} from '../../screens/activities/ActivityListScreen';

const Stack = createNativeStackNavigator<ActivitiesStackParamList>();

export const ActivitiesStack: React.FC = () => (
  <Stack.Navigator
    initialRouteName="ActivityList"
    screenOptions={{
      headerStyle: {backgroundColor: theme.colors.primary},
      headerTintColor: '#fff',
      headerTitleStyle: {fontWeight: 'bold'},
    }}>
    <Stack.Screen
      name="ActivityList"
      component={ActivityListScreen}
      options={{title: 'Activities'}}
    />
  </Stack.Navigator>
);
