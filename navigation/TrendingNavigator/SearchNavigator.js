import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Trending } from '../../screens/Trending';
import { Search } from '../../screens/Dashboard/Search';
import { Course } from '../../screens/Course';
import { CourseAdmin } from '../../screens/CourseAdmin';
import { Message } from '../../screens/Message';

const Stack = createStackNavigator();
const SearchNavigator = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Search" component={Search} />
            <Stack.Screen name="Trending" component={Trending} />
            <Stack.Screen name="Course" component={Course} />
            <Stack.Screen name="CourseAdmin" component={CourseAdmin} />
            <Stack.Screen name="Message" component={Message} />
        </Stack.Navigator>
    );
};

export { SearchNavigator };
