import React from "react";
import { StyleSheet, TouchableOpacity, Text, Platform, ToastAndroid } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { registerWithEmail } from './firebase';

const RegisterButton = ({email, password}) => {
    const navigation = useNavigation();

    return (
        <TouchableOpacity style={styles.touchableContainer} onPress={() => {
            registerWithEmail(email,password).then(() => {
                navigation.navigate('Register')
            });
            }}>
            <Text style={styles.text}>Register</Text>
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

export { RegisterButton }
