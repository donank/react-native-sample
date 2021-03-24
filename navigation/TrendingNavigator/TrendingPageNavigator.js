import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Trending } from '../../screens/Trending';
import { CourseNavigator } from '../CourseNavigator';
import { Course } from '../../screens/Course';
import { CourseAdmin } from '../../screens/CourseAdmin';

const Stack = createStackNavigator();
const TrendingPageNavigator = () => {
    return (
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Trending" component={Trending} />
                <Stack.Screen name="Course" component={Course} />
                <Stack.Screen name="CourseAdmin" component={CourseAdmin} />
            </Stack.Navigator>
    );
};

export { TrendingPageNavigator };
