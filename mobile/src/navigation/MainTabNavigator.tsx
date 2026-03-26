import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import type {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import type {RootTabParamList} from './types';
import {theme} from '../theme/theme';
import {DashboardStack} from './stacks/DashboardStack';
import {ClientsStack} from './stacks/ClientsStack';
import {DealsStack} from './stacks/DealsStack';
import {ActivitiesStack} from './stacks/ActivitiesStack';
import {MoreStack} from './stacks/MoreStack';

const Tab = createBottomTabNavigator<RootTabParamList>();

const tabRootScreen: Record<keyof RootTabParamList, string> = {
  DashboardTab: 'Dashboard',
  ClientsTab: 'ClientList',
  DealsTab: 'DealPipeline',
  ActivitiesTab: 'ActivityList',
  MoreTab: 'MoreMenu',
};

function tabIcon(name: string, color: string, size: number): React.ReactNode {
  return <MaterialCommunityIcons name={name} size={size} color={color} />;
}

/** When the user taps the already-active tab, pop nested stacks back to their root screen. */
function sameTabResetToRootListener(
  route: BottomTabScreenProps<RootTabParamList>['route'],
  navigation: BottomTabScreenProps<RootTabParamList>['navigation'],
) {
  return {
    tabPress: (e: {preventDefault: () => void}) => {
      const state = navigation.getState();
      const currentRoute = state.routes[state.index];
      if (currentRoute.name !== route.name) {
        return;
      }
      e.preventDefault();
      const rootScreen = tabRootScreen[route.name];
      navigation.navigate(route.name, {
        screen: rootScreen,
        params: {},
      } as never);
    },
  };
}

export const MainTabNavigator: React.FC = () => {
  const activeColor = theme.colors.primary;
  const inactiveColor = theme.colors.onSurfaceVariant ?? 'rgba(0, 0, 0, 0.54)';

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: activeColor,
        tabBarInactiveTintColor: inactiveColor,
        tabBarLabelStyle: {fontSize: 12},
      }}>
      <Tab.Screen
        name="DashboardTab"
        component={DashboardStack}
        options={{
          title: 'Dashboard',
          tabBarIcon: ({color, size}) => tabIcon('home', color, size),
        }}
        listeners={({route, navigation}) =>
          sameTabResetToRootListener(route, navigation)
        }
      />
      <Tab.Screen
        name="ClientsTab"
        component={ClientsStack}
        options={{
          title: 'Clients',
          tabBarIcon: ({color, size}) => tabIcon('account-group', color, size),
        }}
        listeners={({route, navigation}) =>
          sameTabResetToRootListener(route, navigation)
        }
      />
      <Tab.Screen
        name="DealsTab"
        component={DealsStack}
        options={{
          title: 'Deals',
          tabBarIcon: ({color, size}) => tabIcon('handshake', color, size),
        }}
        listeners={({route, navigation}) =>
          sameTabResetToRootListener(route, navigation)
        }
      />
      <Tab.Screen
        name="ActivitiesTab"
        component={ActivitiesStack}
        options={{
          title: 'Activities',
          tabBarIcon: ({color, size}) => tabIcon('calendar-check', color, size),
        }}
        listeners={({route, navigation}) =>
          sameTabResetToRootListener(route, navigation)
        }
      />
      <Tab.Screen
        name="MoreTab"
        component={MoreStack}
        options={{
          title: 'More',
          tabBarIcon: ({color, size}) =>
            tabIcon('dots-horizontal', color, size),
        }}
        listeners={({route, navigation}) =>
          sameTabResetToRootListener(route, navigation)
        }
      />
    </Tab.Navigator>
  );
};
