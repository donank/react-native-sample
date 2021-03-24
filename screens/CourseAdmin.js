import React, { useEffect, useState } from "react";
import { SafeAreaView, Image, StyleSheet, Text, ScrollView, View, Pressable, ToastAndroid } from "react-native";
import AppLoading from 'expo-app-loading';
import {
    useFonts,
    Roboto_400Regular,
} from '@expo-google-fonts/roboto';
import { TouchableOpacity } from "react-native-gesture-handler";
import { AdminCourseCard } from "../components/AdminCourseCard";

const CourseAdmin = ({ navigation, route }) => {

    const [follow, setfollow] = useState('Follow')
    const { name, location, email, pfpurl } = route.params
    let [fontsLoaded] = useFonts({
        Roboto_400Regular,
    })
    if (!fontsLoaded) {
        return <AppLoading />;
    } else {
        return (
            <SafeAreaView style={styles.container}>
                <ScrollView>
                    <Image style={styles.profilePic} source={{ uri: pfpurl }} />
                    <Text style={styles.name}>{name}</Text>
                    <View style={styles.socialButtonContainer}>
                        <TouchableOpacity style={styles.followButton} onPress={() => follow == "Follow" ? setfollow("Following") : setfollow("Follow")}>
                            <Text style={styles.socialButtonText}>{follow}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.messageButton}>
                            <Text style={styles.socialButtonText}>Message</Text>
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.email}>{email}</Text>
                    <Text style={styles.location}>{location}</Text>

                    <View style={styles.numericalDetailsContainer}>
                        <View style={styles.numericalDetailsItemContainer}>
                            <Text style={styles.detailsItemTitle}>Total Score</Text>
                            <Text style={styles.detailsItemValue}>100</Text>
                        </View>
                        <View style={styles.numericalDetailsItemContainer}>
                            <Text style={styles.detailsItemTitle}>Enrolled</Text>
                            <Text style={styles.detailsItemValue}>4</Text>
                        </View>
                        <View style={styles.numericalDetailsItemContainer}>
                            <Text style={styles.detailsItemTitle}>Completed</Text>
                            <Text style={styles.detailsItemValue}>2</Text>
                        </View>
                    </View>
                    <View style={styles.courseListContainer}>
                        <AdminCourseCard
                            name={name} title="Learn Python Fundamentals"
                            description="Learn about the fundamentals of python from industry experts and pioneers who have established their name in the domain of python programming and software development."
                            enrolled={245} stars={3} type="Professional"
                            imageurl='https://www.impactplus.com/hs-fs/hubfs/Inbound%20Success%20Podcast/Blog%20Images/web-developer-characteristics.jpg?length=980&name=web-developer-characteristics.jpg'
                            pfpurl={pfpurl}
                            location={location}
                            time='5:00 pm - 7:00 pm CET'
                            email={email} />

                        <AdminCourseCard
                            name={name} title="Learn Python Fundamentals"
                            description="Learn about the fundamentals of python from industry experts and pioneers who have established their name in the domain of python programming and software development."
                            enrolled={245} stars={3} type="Professional"
                            imageurl='https://www.impactplus.com/hs-fs/hubfs/Inbound%20Success%20Podcast/Blog%20Images/web-developer-characteristics.jpg?length=980&name=web-developer-characteristics.jpg'
                            pfpurl={pfpurl}
                            location={location}
                            time='5:00 pm - 7:00 pm CET'
                            email={email} />
                    </View>
                </ScrollView>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(184, 210, 208, 0.44)',
        marginTop: 40
    },
    profilePic: {
        width: 120,
        height: 120,
        alignSelf: 'center',
        borderRadius: 60,
        borderWidth: 3,
        borderColor: '#549287',
        marginTop: 20
    },
    name: {
        alignSelf: 'center',
        color: 'black',
        ...Platform.select({
            ios: { fontFamily: 'Arial', },
            android: { fontFamily: 'Roboto_400Regular' }
        }),
        fontWeight: '400',
        fontSize: 30,
        marginVertical: 10
    },
    email: {
        alignSelf: 'center',
        color: 'black',
        ...Platform.select({
            ios: { fontFamily: 'Arial', },
            android: { fontFamily: 'Roboto_400Regular' }
        }),
        fontWeight: '400',
        fontSize: 18,
    },
    location: {
        alignSelf: 'center',
        color: 'black',
        ...Platform.select({
            ios: { fontFamily: 'Arial', },
            android: { fontFamily: 'Roboto_400Regular' }
        }),
        fontWeight: '400',
        fontSize: 18,
    },
    socialButtonContainer: {
        alignItems: 'center',
        flexDirection: 'row',
        alignSelf: 'center',
        width: '60%',
        justifyContent: 'center',
        marginBottom: 10
    },
    followButton: {
        backgroundColor: '#C4C4C4',
        paddingHorizontal: 16,
        paddingVertical: 6,
        marginHorizontal: 10,
        borderRadius: 20
    },
    messageButton: {
        backgroundColor: '#C4C4C4',
        paddingHorizontal: 16,
        paddingVertical: 6,
        marginHorizontal: 10,
        borderRadius: 20
    },
    socialButtonText: {
        color: 'black',
        ...Platform.select({
            ios: { fontFamily: 'Arial', },
            android: { fontFamily: 'Roboto_400Regular' }
        }),
        fontWeight: '400',
        fontSize: 16,
    },
    numericalDetailsContainer: {
        flexDirection: 'row',
        marginTop: 24,
        borderColor: '#C4C4C4',
        borderBottomWidth: 1,
    },
    numericalDetailsItemContainer: {
        flex: 1,
        alignItems: 'center',
    },
    detailsItemTitle: {
        color: 'black',
        ...Platform.select({
            ios: { fontFamily: 'Arial', },
            android: { fontFamily: 'Roboto_400Regular' }
        }),
        fontWeight: '400',
        fontSize: 16,
        marginTop: 10
    },
    detailsItemValue: {
        color: 'black',
        ...Platform.select({
            ios: { fontFamily: 'Arial', },
            android: { fontFamily: 'Roboto_400Regular' }
        }),
        fontWeight: '400',
        fontSize: 16,
        marginTop: 6,
        marginBottom: 10
    },
    courseListContainer: {
        padding: 20,
        flexDirection: 'row',
        flexWrap: 'wrap'
    }
});

export { CourseAdmin };