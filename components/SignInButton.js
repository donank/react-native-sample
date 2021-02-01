import React from "react";
import { StyleSheet, TouchableOpacity, Text, Platform, ToastAndroid } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { loginWithEmail } from './firebase';

const SignInButton = ({ email, password }) => {
    const navigation = useNavigation();

    return (
        <TouchableOpacity style={styles.container} onPress={() => {
            handleOnLogin({email, password}).then((result) => {
                result ? navigation.navigate('BottomTabNavigator') : ToastAndroid.show('Login Failed', ToastAndroid.SHORT)
            })
        }}>
            <Text>Sign In</Text>
        </TouchableOpacity>
    );
}

const handleOnLogin = async (values) => {
    const { email, password } = values;
    console.log(email)
    let flag = true
    try {
        await loginWithEmail(email, password);
    } catch (error) {
        console.log(error)
        flag = false
    }
    return flag
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
