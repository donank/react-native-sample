import React, { useState, useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Login } from './Login';
import { Dashboard } from '../Dashboard/Dashboard';
import { SignUp } from './SignUp';
import { Register } from './Register';


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
                name="Dashboard"
                component={Dashboard}
            />
        </Stack.Navigator>
    );
};

export { EntryNavigator };