import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { EntryNavigator } from './EntryNavigator';
import { Splash } from '../screens/Splash/Splash';

const Stack = createStackNavigator();
const SplashNavigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Splash" component={Splash}/>
                <Stack.Screen name="Entry" component={EntryNavigator}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export { SplashNavigator };