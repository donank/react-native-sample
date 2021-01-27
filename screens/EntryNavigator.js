import React, { useState, useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Login } from './Login';
import { Dashboard } from './Dashboard';


const Stack = createStackNavigator();

const EntryNavigator = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen
                name="Login"
                component={Login}
            />
            <Stack.Screen
                name="Dashboard"
                component={Dashboard}
            />
        </Stack.Navigator>
    );
};

export { EntryNavigator };