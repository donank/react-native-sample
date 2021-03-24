import React, { useState } from "react";
import { SafeAreaView, StyleSheet, ScrollView, TextInput, View, TouchableOpacity, Text, Image, Button } from "react-native";
import AppLoading from 'expo-app-loading';
import {
    useFonts,
    Roboto_400Regular,
} from '@expo-google-fonts/roboto';
import { Ionicons } from "@expo/vector-icons";
import { EnrollButton } from "../components/EnrollButton";

const Course = () => {
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
                        <TouchableOpacity style={{ position: 'absolute', top: 60, elevation: 2, right: 20  }} onPress={() => {
                            console.log("Bookmarkt Clicked")
                        }}>
                            <Ionicons style={{}} name='bookmark' size={32} color='white' onPress={() => console.log("Icon Clicked")} />
                        </TouchableOpacity>
                    ) : (
                        <TouchableOpacity style={{ position: 'absolute', top: 60, right: 20, elevation: 2 }} onPress={() => {
                            console.log("Bookmarkt Clicked")
                        }}>
                            <Ionicons style={{}} name='bookmark-outline' size={32} color='white' onPress={() => console.log("Icon Clicked")}/>
                        </TouchableOpacity>
                    )}
                <View style={styles.imageConainer}>
                    <Image style={styles.hero} source={require('../assets/programming.jpg')} />
                    <View style={styles.heroTint} />
                    <Image style={styles.creatorPfp} source={require('../assets/pfp.png')} />
                    <Text style={styles.title}>
                        Learn Python Fundamentals
                    </Text>
                    <Text style={styles.description}>
                        Learn about the fundamentals of python from industry experts and pioneers who have established their name in the domain of python programming and software development.
                    </Text>
                </View>
                <View style={styles.courseDetailsContainer}>
                    <Text style={styles.locationHeading}>Location</Text>
                    <View style={styles.detailItemContainer}>
                        <Ionicons style={{}} name='location' size={24} color='black' />
                        <Text style={styles.detailItemText}>Bengaluru, India</Text>
                    </View>
                    <View style={styles.detailItemContainer}>
                        <Ionicons style={{}} name='time' size={24} color='black' />
                        <Text style={styles.detailItemText}>12:00 pm - 4:00 pm</Text>
                    </View>
                    <EnrollButton />

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
        margin: 10
    }
});

export { Course };