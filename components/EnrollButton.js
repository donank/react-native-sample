import React, { useState } from "react";
import { StyleSheet, TouchableOpacity, Text, Platform, ToastAndroid } from "react-native";
import { useNavigation } from '@react-navigation/native';
import AppLoading from 'expo-app-loading';
import {
    useFonts,
    Roboto_400Regular,
} from '@expo-google-fonts/roboto';

const EnrollButton = ({ }) => {
    const navigation = useNavigation();
    const [buttonText, setButtonText] = useState('Enroll');

    let [fontsLoaded] = useFonts({
        Roboto_400Regular,
    })
    if (!fontsLoaded) {
        return <AppLoading />;
    } else {
        return (
            <TouchableOpacity style={styles.container} onPress={() => {
                buttonText == "Enroll" ? setButtonText("Enrolled") : setButtonText("Enroll")
            }}>
                <Text style={styles.buttonText}>{buttonText}</Text>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#549287',
        width: 144,
        height: 46,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        bottom: 10,
        alignSelf: 'center'
    },
    buttonText: {
        fontFamily: 'Roboto_400Regular',
        fontSize: 20
    }
});

export { EnrollButton }
