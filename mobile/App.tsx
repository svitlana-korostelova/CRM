/**
 * CRM Mobile Application
 * 
 * Main entry point for the React Native CRM application
 */

import React, {useEffect, useState} from 'react';
import {Provider as PaperProvider} from 'react-native-paper';
import {Provider as ReduxProvider} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {View, ActivityIndicator, StyleSheet} from 'react-native';
import {store} from './src/store/store';
import {AppNavigator} from './src/navigation/AppNavigator';
import {theme} from './src/theme/theme';
import {databaseService} from './src/database/database';

const App: React.FC = () => {
  const [isDatabaseReady, setIsDatabaseReady] = useState(false);

  useEffect(() => {
    const initializeDatabase = async () => {
      try {
        await databaseService.initialize();
        setIsDatabaseReady(true);
        console.log('App: Database initialized successfully');
      } catch (error) {
        console.error('App: Database initialization failed:', error);
        // Still allow app to continue, but database won't work
        setIsDatabaseReady(true);
      }
    };

    initializeDatabase();
  }, []);

  if (!isDatabaseReady) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </View>
    );
  }

  return (
    <ReduxProvider store={store}>
      <PaperProvider theme={theme}>
        <SafeAreaProvider>
          <NavigationContainer>
            <AppNavigator />
          </NavigationContainer>
        </SafeAreaProvider>
      </PaperProvider>
    </ReduxProvider>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
});

export default App;
