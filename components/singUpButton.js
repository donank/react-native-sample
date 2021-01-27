import React from "react";
import { StyleSheet, TouchableOpacity, Text, Platform, ToastAndroid } from "react-native";

const SignUpButton = () => {
    return (
        <TouchableOpacity style={styles.container}>
            <Text>Sign Up</Text>
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

export { SignUpButton }
