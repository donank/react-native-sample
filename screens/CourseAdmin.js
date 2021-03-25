import React, { useEffect, useState } from "react";
import { SafeAreaView, Image, StyleSheet, Text, ScrollView, View, Pressable, ToastAndroid } from "react-native";
import AppLoading from 'expo-app-loading';
import {
    useFonts,
    Roboto_400Regular,
} from '@expo-google-fonts/roboto';
import { TouchableOpacity } from "react-native-gesture-handler";
import { AdminCourseCard } from "../components/AdminCourseCard";
import { fetchTutor, fetchCourses } from "../components/firebase"
import { Ionicons } from "@expo/vector-icons";

const CourseAdmin = ({ navigation, route }) => {

    const { name, location, email, pfpurl } = route.params

    const [follow, setfollow] = useState('Follow')
    const [tutor, setTutor] = useState({})
    const [courses, setCourses] = useState([])
    useEffect(() => {
        fetchTutora()
        console.log("Courses Log: \n", courses)
    }, [])

    const starList = []
    var i;
    for (i = 0; i < tutor.avg_rating; i++) {
        starList.push(
            <Ionicons name='star' size={16} color='black' />
        )
    }

    const fetchTutora = async () => {
        await fetchTutor(email).then((doc) => {
            if (!doc.exists) {
                console.log('No matching documents.');
            }
            setTutor(doc.data())
            doc.data().courses.forEach(item => {
                let arr = []
                fetchCourses(item).then((course) => {
                    if (!course.exists) {
                        console.log('No matching documents.');
                    }
                    arr.push(course.data())
                    setCourses(arr)
                })
            })
        })
    }

    const courseList = courses.map((item, index) => {
        return (
            <AdminCourseCard key={index}
                name={courses[index].creator_name} title={courses[index].name}
                description={courses[index].description}
                enrolled={courses[index].enrolled} stars={courses[index].rating} type={courses[index].type}
                imageurl={courses[index].heroImageUrl}
                pfpurl={courses[index].pfpurl}
                location={courses[index].location}
                time={courses[index].time}
                email={courses[index].email} />
        )
    })

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
                            <Text style={styles.detailsItemValue}>{tutor.total_students_taught}</Text>
                        </View>
                        <View style={styles.numericalDetailsItemContainer}>
                            <Text style={styles.detailsItemTitle}>Courses Taught</Text>
                            <Text style={styles.detailsItemValue}>{tutor.total_courses_taught}</Text>
                        </View>
                        <View style={styles.numericalDetailsItemContainer}>
                            <Text style={styles.detailsItemTitle}>Ratings</Text>
                            <View style={{ flexDirection: 'row', marginTop: 6 }}>
                                {starList}
                            </View>
                        </View>
                    </View>
                    <View style={styles.courseListContainer}>
                        {courseList}
                       
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