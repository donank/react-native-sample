import React, { useState } from "react";
import { SafeAreaView, StyleSheet, ScrollView, TextInput, View, TouchableOpacity, Text, Image } from "react-native";
import AppLoading from 'expo-app-loading';
import {
    useFonts,
    Roboto_400Regular,
} from '@expo-google-fonts/roboto';
import { Ionicons } from "@expo/vector-icons";
import { TouchableHighlight } from "react-native-gesture-handler";

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
                <View style={styles.imageConainer}>
                    <Image style={styles.hero} source={require('../assets/programming.jpg')} />
                    {bookmark == true ? (
                        <TouchableOpacity style={{}} onPress={() => {
                            setBookmark(false)
                            console.log("Bookmark Clicked")
                        }}>
                            <Ionicons style={{ position: 'relative', left: 330, top: -110, elevation: 1 }} name='bookmark' size={32} color='white' />
                        </TouchableOpacity>
                    ) : (
                        <TouchableOpacity style={{}} onPress={() => {
                            setBookmark(true)
                            console.log("Bookmark Clicked")
                        }}>
                        <Ionicons style={{ position: 'relative', left: 330, top: -110, elevation: 1 }} name='bookmark-outline' size={32} color='white' />
                        </TouchableOpacity>
                    )}
                    <View style={styles.heroTint} />
                    <Image style={styles.creatorPfp} source={require('../assets/pfp.png')} />
                    <Text style={styles.title}>Learn Python Fundamentals</Text>
                    <Text style={styles.description}>Learn about the fundamentals of python from industry experts and pioneers who have established their name in the domain of python programming and software development.</Text>
                </View>
                <View style={styles.courseDetailsContainer}>

                </View>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(184, 210, 208, 0.44)'
    },
    imageConainer: {
        flex: 0.6,
        justifyContent: 'flex-end',
    },
    courseDetailsContainer: {
        flex: 0.4
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
        marginHorizontal: 10,
        backgroundColor: '#549287'
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