import React, { useState, useEffect } from "react";
import { StyleSheet, TouchableOpacity, Text, Platform, Image, View, Dimensions } from "react-native";
import { useNavigation, CommonActions } from '@react-navigation/native';
import AppLoading from 'expo-app-loading';
import {
    useFonts,
    Roboto_400Regular,
} from '@expo-google-fonts/roboto';
import { Ionicons } from "@expo/vector-icons";

const OngoingCourses = ({ category, title, heroImageUrl }) => {
    const navigation = useNavigation();
    const [tagColor, setTagColor] = useState('')

    useEffect(() => {
        switch (category) {
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
    });

    let [fontsLoaded] = useFonts({
        Roboto_400Regular,
    })
    if (!fontsLoaded) {
        return <AppLoading />;
    } else {
        return (
            <TouchableOpacity style={styles.container} onPress={() => {
                navigation.dispatch(CommonActions.navigate({
                    name: 'EnrolledCourseProgress', params: {
                        title: title, heroImageUrl: heroImageUrl
                    }
                }))
            }}>
                <Image style={styles.hero} source={{ uri: heroImageUrl }} />
                <View style={styles.heroTint} />
                <View style={styles.detailWrapper}>
                    <View style={{
                        backgroundColor: tagColor,
                        padding: 6,
                        borderRadius: 2,
                        justifyContent: 'center',
                        alignItems: 'center',
                        margin: 6,
                        width: '60%',
                    }}>
                        <Text style={styles.categoryTagText}>{category}</Text>
                    </View>
                    <Text style={styles.title}>{title}</Text>
                </View>
                <View style={styles.timeContainer}>
                    <Ionicons name='time-outline' size={20} color='white' />
                    <Text style={styles.timeText}>10 am - 11 am</Text>
                </View>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: Dimensions.get('screen').height / 4,
        width: Dimensions.get('screen').height / 5,
        marginHorizontal: 10,
        borderBottomLeftRadius: 6,
        borderTopRightRadius: 6,
    },
    hero: {
        height: Dimensions.get('screen').height / 4,
        width: Dimensions.get('screen').height / 5,
        borderBottomLeftRadius: 6,
        borderTopRightRadius: 6,
        position: 'absolute'
    },
    heroTint: {
        height: Dimensions.get('screen').height / 4,
        width: Dimensions.get('screen').height / 5,
        borderBottomLeftRadius: 6,
        borderTopRightRadius: 6,
        backgroundColor: 'rgba(52, 52, 52, 0.8)',
        position: 'absolute'
    },
    detailWrapper: {

    },
    categoryTag: {
        width: '60%',
        backgroundColor: '#E28585',
        padding: 6,
        borderRadius: 2,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 6,
    },
    categoryTagText: {
        color: 'white',
        fontFamily: 'Roboto_400Regular',
        fontSize: 14
    },
    title: {
        color: 'white',
        fontFamily: 'Roboto_400Regular',
        fontSize: 18,
        margin: 10
    },
    timeContainer: {
        flexDirection: 'row',
        position: 'absolute',
        bottom: 10,
        left: 10
    },
    timeText: {
        color: 'white'
    }
})

export { OngoingCourses }