import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Trending } from '../../screens/Trending';
import { Categories } from '../../screens/Dashboard/Categories';
import { Course } from '../../screens/Course';

const Stack = createStackNavigator();
const CategoriesNavigator = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Categories" component={Categories} />
            <Stack.Screen name="Trending" component={Trending} />
            <Stack.Screen name="Course" component={Course} />
        </Stack.Navigator>
    );
};

export { CategoriesNavigator };
