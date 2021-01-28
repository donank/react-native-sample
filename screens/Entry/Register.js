import React, { useEffect, useState } from "react";
import { SafeAreaView, Image, TextInput, StyleSheet, View, Dimensions } from "react-native";
import { SubmitButton } from "../../components/SubmitButton";

const Register = ({navigation}) => {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.loginFormContainer}>
                <TextInput style={styles.textInput} placeholder="House No." placeholderTextColor='black' />
                <TextInput style={styles.textInput} placeholder="Street" placeholderTextColor='black' keyboardType='numeric' maxLength={10} />
                <TextInput style={styles.textInput} placeholder="Area" placeholderTextColor='black' />
                <TextInput style={styles.textInput} placeholder="City" placeholderTextColor='black' secureTextEntry={true}/>
                <TextInput style={styles.textInput} placeholder="Pincode" placeholderTextColor='black'/>
                <TextInput style={styles.textInput} placeholder="Landmark" placeholderTextColor='black'/>
                <TextInput style={styles.textInput} placeholder="State" placeholderTextColor='black'/>
            </View>
            <View style={styles.buttonContainer}>
                <SubmitButton/>
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
        marginVertical: 16,
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
        flex: 0.15,
        flexDirection: 'row',
        justifyContent: 'center',
    }
});

export { Register };