import React from "react";
import { StyleSheet, TouchableOpacity, Text, Platform, Image, View } from "react-native";
import { useNavigation, CommonActions } from '@react-navigation/native';
import AppLoading from 'expo-app-loading';
import {
    useFonts,
    Roboto_400Regular,
} from '@expo-google-fonts/roboto';

const CategoryCard = ({name, title, description, enrolled, stars, type, imageurl, pfpurl, location, time}) => {
    const navigation = useNavigation();
    let [fontsLoaded] = useFonts({
        Roboto_400Regular,
    })
    if (!fontsLoaded) {
        return <AppLoading />;
    } else {
        return (
            <TouchableOpacity style={styles.container} onPress={() => { 
                navigation.dispatch(CommonActions.navigate({name: 'Course', params: { 
                    name: name, title: title, description: description, enrolled: enrolled, stars: stars, type: type, imageurl: imageurl, pfpurl: pfpurl, location: location, time: time
                }} ))
             }}>
                <Image style={styles.hero} source={require('../assets/programming.jpg')} />
                <View style={styles.heroTint} />
                <View style={styles.detailWrapper}>
                    <Text style={styles.title}>{title}</Text>
                    <Text style={styles.creator}>{name}</Text>
                </View>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F6F3F3',
        width: '100%',
        height: 100,
        marginBottom: 4
    },
    detailWrapper: {
        flex: 1,
        justifyContent: 'center',
        marginLeft: 10,
    },
    title: {
        color: 'white',
        ...Platform.select({
            ios: { fontFamily: 'Arial', },
            android: { fontFamily: 'Roboto_400Regular' }
        }),
        fontWeight: '400',
        fontSize: 18
    },
    creator: {
        color: 'white',
        ...Platform.select({
            ios: { fontFamily: 'Arial', },
            android: { fontFamily: 'Roboto_400Regular' }
        }),
        marginTop: 2,
        fontWeight: "400",
        fontSize: 16
    },
    heroTint: {
        backgroundColor: 'rgba(52, 52, 52, 0.8)',
        height: 100,
        width: '100%',
        position: 'absolute'
    },
    hero: {
        height: 100,
        width: '100%',
        position: 'absolute'
    },
    creatorPfp: {
        height: 30,
        width: 30
    }
});

export { CategoryCard }
