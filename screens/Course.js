import React, { useState } from "react";
import { SafeAreaView, StyleSheet, ScrollView, TextInput, View, TouchableOpacity, Text, Image, Pressable } from "react-native";
import AppLoading from 'expo-app-loading';
import {
    useFonts,
    Roboto_400Regular,
} from '@expo-google-fonts/roboto';
import { Ionicons } from "@expo/vector-icons";
import { EnrollButton } from "../components/EnrollButton";
import { CommonActions } from '@react-navigation/native';

const Course = ({ navigation, route }) => {
    const { name, title, description, enrolled, stars, type, imageurl, pfpurl, location, time, email } = route.params
    const [search, setSearch] = useState('')
    const [bookmark, setBookmark] = useState(false)
    let [fontsLoaded] = useFonts({
        Roboto_400Regular,
    })
    if (!fontsLoaded) {
        return <AppLoading />;
    } else {
        return (
            <SafeAreaView style={styles.container}>
                {bookmark == true ? (
                    <Pressable style={{ position: 'absolute', top: 60, elevation: 2, right: 20 }} onPress={() => {
                        console.log("Bookmarkt Clicked")
                    }}>
                        <Ionicons style={{}} name='bookmark' size={32} color='white' />
                    </Pressable>
                ) : (
                    <Pressable style={{ position: 'absolute', top: 60, right: 20, elevation: 2 }} onPress={() => {
                        console.log("Bookmarkt Clicked")
                    }}>
                        <Ionicons style={{}} name='bookmark-outline' size={32} color='white' />
                    </Pressable>
                )}
                <View style={styles.imageConainer}>
                    <Image style={styles.hero} source={{ uri: imageurl }} />
                    <View style={styles.heroTint} />
                    <Pressable onPress={() => {
                        navigation.dispatch(CommonActions.navigate({name: 'CourseAdmin', params: { 
                            name: name, pfpurl: pfpurl, location: location, email: email
                        }} ))
                    }}>
                        <Image style={styles.creatorPfp} source={{ uri: pfpurl }} />
                    </Pressable>
                    <Text style={styles.title}>
                        {title}
                    </Text>
                    <Text style={styles.description}>
                        {description}
                    </Text>
                </View>
                <View style={styles.courseDetailsContainer}>
                    <Text style={styles.locationHeading}>Location</Text>
                    <View style={styles.detailItemContainer}>
                        <Ionicons style={{}} name='location' size={24} color='black' />
                        <Text style={styles.detailItemText}>{location}</Text>
                    </View>
                    <View style={styles.detailItemContainer}>
                        <Ionicons style={{}} name='time' size={24} color='black' />
                        <Text style={styles.detailItemText}>{time}</Text>
                    </View>
                    <EnrollButton/>

                </View>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(184, 210, 208, 0.44)',
    },
    imageConainer: {
        flex: 0.6,
        justifyContent: 'flex-end',
    },
    courseDetailsContainer: {
        flex: 0.4
    },
    detailItemContainer: {
        flexDirection: 'row',
        marginLeft: 10,
        marginTop: 6
    },
    detailItemText: {
        color: 'black',
        ...Platform.select({
            ios: { fontFamily: 'Arial', },
            android: { fontFamily: 'Roboto_400Regular' }
        }),
        fontWeight: '400',
        marginLeft: 10
    },
    locationHeading: {
        color: 'black',
        ...Platform.select({
            ios: { fontFamily: 'Arial', },
            android: { fontFamily: 'Roboto_400Regular' }
        }),
        fontWeight: '400',
        fontSize: 26,
        marginHorizontal: 10,
    },
    hero: {
        height: '100%',
        width: '100%',
        position: 'absolute'
    },
    heroTint: {
        backgroundColor: 'rgba(52, 52, 52, 0.8)',
        height: '100%',
        width: '100%',
        position: 'absolute'
    },
    title: {
        color: 'white',
        ...Platform.select({
            ios: { fontFamily: 'Arial', },
            android: { fontFamily: 'Roboto_400Regular' }
        }),
        fontWeight: '400',
        fontSize: 26,
        backgroundColor: '#549287',
        marginHorizontal: 10
    },
    description: {
        color: 'white',
        ...Platform.select({
            ios: { fontFamily: 'Arial', },
            android: { fontFamily: 'Roboto_400Regular' }
        }),
        margin: 10,
        fontWeight: "400",
        fontSize: 16,
        backgroundColor: '#549287'
    },
    creatorPfp: {
        height: 90,
        width: 90,
        borderWidth: 2,
        borderColor: '#549287',
        borderRadius: 42,
        margin: 10,
    }
});

export { Course };