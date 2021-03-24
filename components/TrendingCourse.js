import React, { useState, useEffect } from "react";
import { StyleSheet, TouchableOpacity, Text, Platform, Image, View, Dimensions } from "react-native";
import { useNavigation, CommonActions } from '@react-navigation/native';
import AppLoading from 'expo-app-loading';
import {
    useFonts,
    Roboto_400Regular,
} from '@expo-google-fonts/roboto';
import { Ionicons } from "@expo/vector-icons";

const TrendingCourse = ({ name, title, description, enrolled, stars, type, imageurl, pfpurl, location, time }) => {
    const navigation = useNavigation();
    const [tagColor, setTagColor] = useState('')

    useEffect(() => {
        switch(type){
            case "Professional": {
                setTagColor('#E28585')
                break;
            }
            case "Vocational": {
                setTagColor('#F0D07C')
                break;
            }
            case "Academic": {
                setTagColor('#71ABE5')
                break;
            }
        }
    }, [])
    const starList = []
    var i;
    for (i = 0; i < stars; i++) {
        starList.push(
            <Ionicons name='star' size={20} color='white' />
        )
    }

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
                <View style={{ flex: 0.13, backgroundColor: '#fff' }}>

                </View>
                <View style={{ flex: 0.7 }}>
                    <Image style={styles.pfp} source={{uri:pfpurl}} />
                    <Image style={styles.hero} source={{uri:imageurl}} />
                    <View style={styles.heroTint} />
                    <View style={{
                        backgroundColor: tagColor,
                        paddingVertical: 6,
                        paddingHorizontal: 10,
                        borderRadius: 2,
                        justifyContent: 'center',
                        alignItems: 'center',
                        position: 'absolute',
                        right: 10,
                        top: 10
                    }}>
                        <Text style={styles.categoryTagText}>{type}</Text>
                    </View>
                    <View style={styles.courseDetailsContainer}>
                        <Text style={styles.courseCreator}>{name}</Text>
                        <Text style={styles.courseTitle}>{title}</Text>
                        <Text style={styles.courseDescription}>{description}</Text>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
                            <Text style={styles.membersEnrolled}>Neshmer’s Enrolled: {enrolled}</Text>
                            <View style={{ flexDirection: 'row' }}>
                                {starList}
                            </View>
                        </View>
                    </View>

                </View>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: 300,
        width: Dimensions.get('screen').width - 10,
        borderBottomRightRadius: 6,
        borderTopRightRadius: 6,
        marginTop: 10
    },
    hero: {
        height: Dimensions.get('screen').height / 3,
        width: Dimensions.get('screen').width - 10,
        borderBottomRightRadius: 6,
        borderTopRightRadius: 6,
        position: 'absolute',
    },
    heroTint: {
        height: Dimensions.get('screen').height / 3,
        width: Dimensions.get('screen').width - 10,
        borderBottomRightRadius: 6,
        borderTopRightRadius: 6,
        backgroundColor: 'rgba(52, 52, 52, 0.8)',
        position: 'absolute',
    },
    pfp: {
        height: 70,
        width: 70,
        borderWidth: 2,
        borderColor: '#549287',
        borderRadius: 42,
        marginTop: -35,
        marginLeft: 10,
        position: 'absolute',
        elevation: 1
    },
    courseDetailsContainer: {
        padding: 10
    },
    courseCreator: {
        color: 'white',
        fontFamily: 'Roboto_400Regular',
        fontSize: 14,
        marginTop: 30
    },
    courseTitle: {
        color: 'white',
        fontFamily: 'Roboto_400Regular',
        fontSize: 24
    },
    courseDescription: {
        color: 'white',
        fontFamily: 'Roboto_400Regular',
        marginTop: 10
    },
    membersEnrolled: {
        color: 'white',
        fontFamily: 'Roboto_400Regular',
        textDecorationLine: 'underline'
    },
    categoryTagText: {
        color: 'white',
        fontFamily: 'Roboto_400Regular',
        fontSize: 14
    },
})

export { TrendingCourse }