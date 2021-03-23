import React from "react";
import { StyleSheet, TouchableOpacity, Text, Platform, ToastAndroid } from "react-native";
import { useNavigation } from '@react-navigation/native';

const EnrollButton = ({ }) => {
    const navigation = useNavigation();

    return (
        <TouchableOpacity style={styles.container} onPress={() => {
            ToastAndroid.show('Course Enrolled', ToastAndroid.SHORT)
        }}>
            <Text>Enroll</Text>
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

export { EnrollButton }
