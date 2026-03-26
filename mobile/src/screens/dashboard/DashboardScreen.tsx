import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Text} from 'react-native-paper';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import type {DashboardStackParamList} from '../../navigation/types';
import {DEV_TEST} from '../../config/devFlags';
import {HomeScreen} from '../HomeScreen';

export type DashboardScreenProps = NativeStackScreenProps<
  DashboardStackParamList,
  'Dashboard'
>;

/**
 * Dashboard root. When `DEV_TEST` is enabled, renders the legacy Home dummy-testing
 * surface (DB / Redux / backend) so existing manual checks still work from this tab.
 */
export const DashboardScreen: React.FC<DashboardScreenProps> = () => {
  if (DEV_TEST) {
    return (
      <View style={styles.devTestWrap}>
        {/*
          DEV_TEST: legacy “main screen” testing harness (was the old Home stack).
          Toggle in src/config/devFlags.ts
        */}
        <HomeScreen />
      </View>
    );
  }

  return (
    <View style={styles.centered}>
      <Text variant="headlineSmall">Dashboard</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  devTestWrap: {
    flex: 1,
  },
});
