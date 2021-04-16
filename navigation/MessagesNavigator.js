import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Messages } from '../screens/Messages';
import { Message } from '../screens/Message';

const Stack = createStackNavigator();
const MessagesNavigator = () => {
    return (
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Messages" component={Messages} />
                <Stack.Screen name="Message" component={Message} />
            </Stack.Navigator>
    );
};

export { MessagesNavigator };
