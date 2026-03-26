import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Text} from 'react-native-paper';

/** Placeholder for US1 — quick action modal (Phase 2). */
export const QuickActionScreen: React.FC = () => (
  <View style={styles.centered}>
    <Text variant="headlineSmall">Quick action</Text>
    <Text variant="bodyMedium" style={styles.hint}>
      Placeholder
    </Text>
  </View>
);

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  hint: {
    marginTop: 8,
    opacity: 0.7,
  },
});
