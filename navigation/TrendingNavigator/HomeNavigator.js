import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Dashboard } from '../../screens/Dashboard/Dashboard';
import { Messages } from '../../screens/Messages';
import { Message } from '../../screens/Message';

const Stack = createStackNavigator();
const HomeNavigator = () => {
    return (
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Home" component={Dashboard}/>
                <Stack.Screen name="Messages" component={Messages}/>
                <Stack.Screen name="Message" component={Message}/>
            </Stack.Navigator>
    );
};

export { HomeNavigator };
