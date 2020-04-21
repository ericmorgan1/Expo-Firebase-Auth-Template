import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import TabBarIcon from '../components/TabBarIcon';
import { HomeScreen, TestScreen, GuestSignupScreen } from './../screens';
import SettingsStack from './SettingsStack';

const BottomTab = createBottomTabNavigator();
const INITIAL_ROUTE_NAME = 'Home';

// These are the main tabs of the application...
function MainTabNavigator({ navigation, route }) {
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

// Stack so that we can show other modal screens that aren't tabs (like the Guest Signup page)...
const Stack = createStackNavigator();
function MainTabStack() {
    return (
        <Stack.Navigator mode="modal" headerMode="none">
            <Stack.Screen name="MainTabs" component={MainTabNavigator} />
            <Stack.Screen name="GuestSignup" component={GuestSignupScreen} />
        </Stack.Navigator>
    );    
}

export default MainTabStack;