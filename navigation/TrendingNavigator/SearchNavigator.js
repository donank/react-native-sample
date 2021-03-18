import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Trending } from '../../screens/Trending';
import { Search } from '../../screens/Dashboard/Search';

const Stack = createStackNavigator();
const SearchNavigator = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Search" component={Search} />
            <Stack.Screen name="Trending" component={Trending} />
        </Stack.Navigator>
    );
};

export { SearchNavigator };
