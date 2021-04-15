import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Dashboard } from '../../screens/Dashboard/Dashboard';
import { EnrolledCourseProgress } from '../../screens/EnrolledCourseProgress';
import { Messages } from '../../screens/Messages';

const Stack = createStackNavigator();
const HomeNavigator = () => {
    return (
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Home" component={Dashboard}/>
                <Stack.Screen name="Messages" component={Messages}/>
                <Stack.Screen name="EnrolledCourseProgress" component={EnrolledCourseProgress}/>
            </Stack.Navigator>
    );
};

export { HomeNavigator };
