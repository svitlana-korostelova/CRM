import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Text} from 'react-native-paper';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import type {DashboardStackParamList} from '../../navigation/types';

export type NotificationListScreenProps = NativeStackScreenProps<
  DashboardStackParamList,
  'NotificationList'
>;

/** Placeholder until dashboard notifications are implemented. */
export const NotificationListScreen: React.FC<
  NotificationListScreenProps
> = () => (
  <View style={styles.centered}>
    <Text variant="headlineSmall">Notifications</Text>
  </View>
);

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
