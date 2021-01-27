import React from "react";
import { StyleSheet, TouchableOpacity, Text, Platform, ToastAndroid } from "react-native";

const SignInButton = () => {
    return (
        <TouchableOpacity style={styles.container}>
            <Text>Sign In</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#E5E5E5',
        width: 144,
        height: 46,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export { SignInButton }
