import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import type {DealsStackParamList} from '../types';
import {theme} from '../../theme/theme';
import {DealPipelineScreen} from '../../screens/deals/DealPipelineScreen';

const Stack = createNativeStackNavigator<DealsStackParamList>();

export const DealsStack: React.FC = () => (
  <Stack.Navigator
    initialRouteName="DealPipeline"
    screenOptions={{
      headerStyle: {backgroundColor: theme.colors.primary},
      headerTintColor: '#fff',
      headerTitleStyle: {fontWeight: 'bold'},
    }}>
    <Stack.Screen
      name="DealPipeline"
      component={DealPipelineScreen}
      options={{title: 'Deals'}}
    />
  </Stack.Navigator>
);
