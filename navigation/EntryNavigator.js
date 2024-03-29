import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Login } from '../screens/Entry/Login';
import { SignUp } from '../screens/Entry/SignUp';
import { Register } from '../screens/Entry/Register';
import { DashboardNavigator } from './DashboardNavigator';
import { Interests } from '../screens/Entry/Interests';


const Stack = createStackNavigator();

const EntryNavigator = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen
                name="Login"
                component={Login}
            />
            <Stack.Screen
                name="SignUp"
                component={SignUp}
            />
            <Stack.Screen
                name="Register"
                component={Register}
            />
            <Stack.Screen
                name="Interests"
                component={Interests}
            />
            <Stack.Screen
                name="DashboardNavigator"
                component={DashboardNavigator}
            />
        </Stack.Navigator>
    );
};

export { EntryNavigator };