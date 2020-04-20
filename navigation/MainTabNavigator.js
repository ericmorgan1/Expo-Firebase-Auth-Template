import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as React from 'react';
import TabBarIcon from '../components/TabBarIcon';
import { HomeScreen, TestScreen } from './../screens';
import SettingsStack from './SettingsStack';

const BottomTab = createBottomTabNavigator();
const INITIAL_ROUTE_NAME = 'Home';

export default function MainTabNavigator({ navigation, route }) {
  return (
    <BottomTab.Navigator initialRouteName={INITIAL_ROUTE_NAME}>
      <BottomTab.Screen
        name="Home" component={HomeScreen}
        options={{ title: "Home", tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-home" /> }}
      />
      
      <BottomTab.Screen
        name="Test" component={TestScreen}
        options={{ title: "Test", tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-code-working" />, }}
      />
      
      <BottomTab.Screen
        name="Settings" component={SettingsStack}
        options={{ title: "Settings", tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-settings" />, }}
      />
    </BottomTab.Navigator>
  );
}
