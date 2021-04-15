import React from "react";
import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from '@react-navigation/native';


const Toolbar = () => {
    const navigation = useNavigation();
    return (
        <View>
            <View style={{ flex: 1, flexDirection: 'row', marginTop: 50, backgroundColor: '#549287', padding: 6, justifyContent: 'space-between' }}>
            <Ionicons
                name="md-menu"
                size={40}
                color="black"
                onPress={() => navigation.openDrawer()}
            />
            <Text style={{fontSize: 26}}>neshM</Text>
            <Ionicons
                name="chatbubbles"
                size={36}
                color="black"
                onPress={() => navigation.navigate('Messages')}
            />
        </View>
        </View>
    );
}

export { Toolbar };