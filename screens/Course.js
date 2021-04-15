import React, { useState, useEffect } from "react";
import { SafeAreaView, StyleSheet, ScrollView, TextInput, View, TouchableOpacity, Text, Image, Pressable, Dimensions, Platform } from "react-native";
import AppLoading from 'expo-app-loading';
import {
    useFonts,
    Roboto_400Regular,
} from '@expo-google-fonts/roboto';
import { Ionicons } from "@expo/vector-icons";
import { EnrollButton } from "../components/EnrollButton";
import { CommonActions } from '@react-navigation/native';
import MapView, { Marker } from 'react-native-maps';
import * as Linking from 'expo-linking';

const Course = ({ navigation, route }) => {
    const { name, title, description, enrolled, stars, type, imageurl, pfpurl, location, time, email, coordinates } = route.params
    const [search, setSearch] = useState('')
    const [bookmark, setBookmark] = useState(false)

    useEffect(()=> {
        console.log("Coordinates: ", coordinates)
    }, [])
    let [fontsLoaded] = useFonts({
        Roboto_400Regular,
    })
    if (!fontsLoaded) {
        return <AppLoading />;
    } else {
        return (
            <SafeAreaView style={styles.container}>
                <ScrollView style={{ flexGrow: 1 }}>
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
                            navigation.dispatch(CommonActions.navigate({
                                name: 'CourseAdmin', params: {
                                    name: name, pfpurl: pfpurl, location: location, email: email
                                }
                            }))
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
                        <MapView style={styles.map}
                            onPress={() => {
                                let lat = coordinates.U
                                let lng = coordinates.k
                                const scheme = Platform.select({ ios: 'maps:0,0?q=', android: 'geo:0,0?q=' });
                                const latLng = `${lat},${lng}`;
                                const label = 'Custom Label';
                                const url = Platform.select({
                                    ios: `${scheme}${label}@${latLng}`,
                                    android: `${scheme}${latLng}(${label})`
                                });
                                Linking.openURL(url);
                            }}
                            initialRegion={{
                                latitude: coordinates.U,
                                longitude: coordinates.k,
                                latitudeDelta: 0.0922,
                                longitudeDelta: 0.0421,
                            }}>
                            <Marker style={styles.map} title="Marker"
                                coordinate={{ latitude: coordinates.U, longitude: coordinates.k }}
                            />
                        </MapView>

                    </View>
                </ScrollView>
                <EnrollButton />

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
        height: 460,
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
    },
    map: {
        width: '90%',
        height: 200,
        alignSelf: 'center',
        marginBottom: 70,
        marginTop: 20
    },
});

export { Course };