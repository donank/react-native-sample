import React, { useEffect, useState } from "react";
import { SafeAreaView, Image, TextInput, StyleSheet, View, Dimensions } from "react-native";
import { RegisterButton } from "../../components/RegisterButton";

const SignUp = ({navigation}) => {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.loginFormContainer}>
                <TextInput style={styles.textInput} placeholder="Username" placeholderTextColor='black' />
                <TextInput style={styles.textInput} placeholder="Phone Number" placeholderTextColor='black' keyboardType='numeric' maxLength={10} />
                <TextInput style={styles.textInput} placeholder="Email" placeholderTextColor='black' />
                <TextInput style={styles.textInput} placeholder="Password" placeholderTextColor='black' secureTextEntry={true}/>
                <TextInput style={styles.textInput} placeholder="Confirm Password" placeholderTextColor='black' secureTextEntry={true}/>
            </View>
            <View style={styles.buttonContainer}>
                <RegisterButton/>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginVertical: 10
    },
    textInput: {
        backgroundColor: '#E5E5E5',
        width: Dimensions.get('window').width - 100,
        height: 46,
        marginVertical: 20,
        borderRadius: 5,
        color: 'black',
        padding: 10,
    },
    loginFormContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonContainer: {
        flex: 0.2,
        flexDirection: 'row',
        justifyContent: 'center',
    }
});

export { SignUp };