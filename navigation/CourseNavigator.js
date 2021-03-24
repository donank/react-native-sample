import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { CourseAdmin } from '../screens/CourseAdmin';
import { Course } from '../screens/Course';

const Stack = createStackNavigator();
const CourseNavigator = () => {
    return (
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Course" component={Course} />
                <Stack.Screen name="CourseAdmin" component={CourseAdmin} />
            </Stack.Navigator>
    );
};

export { CourseNavigator };
