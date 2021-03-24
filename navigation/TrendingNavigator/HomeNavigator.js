import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Dashboard } from '../../screens/Dashboard/Dashboard';
import { Trending } from '../../screens/Trending';
import { EnrolledCourseProgress } from '../../screens/EnrolledCourseProgress';

const Stack = createStackNavigator();
const HomeNavigator = () => {
    return (
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Home" component={Dashboard}/>
                <Stack.Screen name="Trending" component={Trending}/>
                <Stack.Screen name="EnrolledCourseProgress" component={EnrolledCourseProgress}/>
            </Stack.Navigator>
    );
};

export { HomeNavigator };
