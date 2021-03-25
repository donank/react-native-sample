import React, { useState, useEffect } from "react";
import { StyleSheet, TouchableOpacity, Text, Platform, ToastAndroid } from "react-native";
import { useNavigation } from '@react-navigation/native';
import AppLoading from 'expo-app-loading';
import {
    useFonts,
    Roboto_400Regular,
} from '@expo-google-fonts/roboto';

const CourseTag = ({ type, name }) => {
    const [colour, setColour] = useState("#393456")
    const navigation = useNavigation();
    useEffect(() => {
        switch(type){
            case "Professional": {
                setColour('#E28585')
                break;
            }
            case "Vocational": {
                setColour('#F0D07C')
                break;
            }
            case "Academic": {
                setColour('#71ABE5')
                break;
            }
        }
    })
    let [fontsLoaded] = useFonts({
        Roboto_400Regular,
    })
    if (!fontsLoaded) {
        return <AppLoading />;
    } else {


        return (
            <TouchableOpacity style={{
                backgroundColor: colour,
                padding: 6,
                height: 36,
                borderTopLeftRadius: 4,
                borderBottomRightRadius: 4,
                justifyContent: 'center',
                alignItems: 'center',
                margin: 2
            }} onPress={() => {
                ToastAndroid.show('Course Tag Clicked', ToastAndroid.SHORT)
            }}>
                <Text style={styles.tagText}>{name}</Text>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    tagText: {

    }
});

export { CourseTag }
