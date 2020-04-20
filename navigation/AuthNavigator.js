import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { LoginScreen, SignupScreen, ForgotPasswordScreen } from '../screens';

// Options for each screen...
const screenOptions = { 
    cardStyleInterpolator: ({ current, closing }) => ({ })      // Function that does nothing so there will be no transition 
};

const Stack = createStackNavigator();
export default function AuthNavigator() {
    return (
        <Stack.Navigator mode="modal" headerMode="none">
            <Stack.Screen name="Login"          component={LoginScreen}             options={screenOptions} />
            <Stack.Screen name="Signup"         component={SignupScreen}            options={screenOptions} />
            <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen}    options={screenOptions} />
        </Stack.Navigator>
    );    
}