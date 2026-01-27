/**
 * Home Screen
 * 
 * Main landing screen for the CRM application
 */

import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Text, Card, Button} from 'react-native-paper';

export const HomeScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Text variant="headlineMedium" style={styles.title}>
            Welcome to CRM
          </Text>
          <Text variant="bodyMedium" style={styles.subtitle}>
            Your mobile-first customer relationship management system
          </Text>
        </Card.Content>
        <Card.Actions>
          <Button mode="contained" onPress={() => {}}>
            Get Started
          </Button>
        </Card.Actions>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
  },
  card: {
    elevation: 4,
  },
  title: {
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    textAlign: 'center',
    color: '#666',
    marginBottom: 16,
  },
});
