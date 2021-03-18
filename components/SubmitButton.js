import React from "react";
import { StyleSheet, TouchableOpacity, Text, Platform, ToastAndroid } from "react-native";
import { useNavigation } from '@react-navigation/native';

const SubmitButton = () => {
    const navigation = useNavigation();

    return (
        <TouchableOpacity style={styles.touchableContainer} onPress={() => {navigation.navigate('BottomTabNavigator')}}>
            <Text style={styles.text}>Submit</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    touchableContainer: {
        backgroundColor: '#E6E6E6',
        width: 144,
        height: 46,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 2
    },
    text: {
        fontSize: 18
    }
});

export { SubmitButton }
