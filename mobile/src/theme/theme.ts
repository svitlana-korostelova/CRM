/**
 * App Theme Configuration
 * 
 * React Native Paper theme customization
 */

import {MD3LightTheme} from 'react-native-paper';

export const theme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: '#6200ee',
    secondary: '#03dac6',
    error: '#b00020',
    background: '#ffffff',
    surface: '#ffffff',
  },
};
