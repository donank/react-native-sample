import React, { useState, useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Login } from './Login';
import { BottomTabNavigator } from '../Dashboard/BottomTabNavigator';
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
                name="BottomTabNavigator"
                component={BottomTabNavigator}
            />
        </Stack.Navigator>
    );
};

export { EntryNavigator };