import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { SettingsScreen, EditProfileScreen, UpdateEmailScreen, UpdatePasswordScreen } from './../screens';

const stackOptions = () => ({
  headerTitleStyle: { fontWeight: "bold", color: "white", },
  headerBackTitleStyle: { color: "white", },
  headerTintColor: "white",
  headerStyle: { backgroundColor: Colors.PrimaryAppColor, }
});

// Setting mode="modal" makes the screens slide up from the bottom
const Stack = createStackNavigator();
export default function RootNavigation() {
    return (
        <Stack.Navigator options={stackOptions} mode="modal" headerMode="screen">
            <Stack.Screen name="Settings" component={SettingsScreen} options={{ title: "Settings" }} />
            <Stack.Screen name="EditProfile" component={EditProfileScreen} options={{ title: "Edit Profile" }} />
            <Stack.Screen name="UpdateEmail" component={UpdateEmailScreen} options={{ title: "Update Email" }} />
            <Stack.Screen name="UpdatePassword" component={UpdatePasswordScreen} options={{ title: "Update Password" }} />
        </Stack.Navigator>
    );    
}