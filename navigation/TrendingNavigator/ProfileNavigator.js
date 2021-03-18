import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Trending } from '../../screens/Trending';
import { Profile } from '../../screens/Dashboard/Profile';

const Stack = createStackNavigator();
const ProfileNavigator = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Profile" component={Profile} />
            <Stack.Screen name="Trending" component={Trending} />
        </Stack.Navigator>
    );
};

export { ProfileNavigator };
