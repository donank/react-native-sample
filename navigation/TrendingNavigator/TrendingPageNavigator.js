import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Trending } from '../../screens/Trending';
import { CourseNavigator } from '../CourseNavigator';
import { Course } from '../../screens/Course';
import { CourseAdmin } from '../../screens/CourseAdmin';
import { Message } from '../../screens/Message';
import { DashboardNavigator } from '../DashboardNavigator';

const Stack = createStackNavigator();
const TrendingPageNavigator = () => {
    return (
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Trending" component={Trending} />
                <Stack.Screen name="Course" component={Course} />
                <Stack.Screen name="CourseAdmin" component={CourseAdmin} />
                <Stack.Screen name="Message" component={Message} />
                <Stack.Screen name="Dashboard" component={DashboardNavigator} />
            </Stack.Navigator>
    );
};

export { TrendingPageNavigator };
