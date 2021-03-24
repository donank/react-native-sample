import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Trending } from '../../screens/Trending';
import { Course } from '../../screens/Course';

const Stack = createStackNavigator();
const TrendingPageNavigator = () => {
    return (
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Trending" component={Trending} />
                <Stack.Screen name="Course" component={Course} />
            </Stack.Navigator>
    );
};

export { TrendingPageNavigator };
