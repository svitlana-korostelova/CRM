import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Text} from 'react-native-paper';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import type {ActivitiesStackParamList} from '../../navigation/types';

export type ActivityListScreenProps = NativeStackScreenProps<
  ActivitiesStackParamList,
  'ActivityList'
>;

export const ActivityListScreen: React.FC<ActivityListScreenProps> = () => (
  <View style={styles.centered}>
    <Text variant="headlineSmall">Activities</Text>
  </View>
);

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
