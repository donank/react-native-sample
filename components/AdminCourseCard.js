import React, { useState, useEffect } from "react";
import { StyleSheet, TouchableOpacity, Text, Platform, Image, View, Dimensions } from "react-native";
import { useNavigation, CommonActions } from '@react-navigation/native';
import AppLoading from 'expo-app-loading';
import {
    useFonts,
    Roboto_400Regular,
} from '@expo-google-fonts/roboto';
import { Ionicons } from "@expo/vector-icons";

const AdminCourseCard = ({ name, title, description, enrolled, stars, type, imageurl, pfpurl, location, time, email, category, coordinates }) => {
    const navigation = useNavigation();

    const [tagColor, setTagColor] = useState('');
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
            case "Hobby": {
                setTagColor('#549287')
                break;
            }
        }
    }, []);

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
                navigation.dispatch(CommonActions.navigate({
                    name: 'Course', params: {
                        name: name, title: title, description: description, enrolled: enrolled, stars: stars, type: category,
                        imageurl: imageurl, pfpurl: pfpurl, location: location, time: time, email: email,
                        coordinates: coordinates
                    }
                }))
            }}>
                <Image style={styles.hero} source={{ uri: imageurl }} />
                <View style={styles.heroTint} />
                <View style={styles.detailWrapper}>
                    <View style={{
                        width: '60%',
                        backgroundColor: tagColor,
                        padding: 6,
                        borderRadius: 2,
                        justifyContent: 'center',
                        alignItems: 'center',
                        margin: 6,
                    }}>
                        <Text style={styles.categoryTagText}>{category}</Text>
                    </View>
                    
                    <Text style={styles.title}>{title}</Text>
                    <View style={{ flexDirection: 'row', marginLeft: 10 }}>
                    {starList}
                </View>

                </View>
                
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        height: 220,
        width: 170,
        marginHorizontal: 10,
        marginVertical: 10,
        borderBottomLeftRadius: 6,
        borderTopRightRadius: 6,
    },
    hero: {
        height: '100%',
        width: '100%',
        borderBottomLeftRadius: 6,
        borderTopRightRadius: 6,
        position: 'absolute'
    },
    heroTint: {
        height: '100%',
        width: '100%',
        borderBottomLeftRadius: 6,
        borderTopRightRadius: 6,
        backgroundColor: 'rgba(52, 52, 52, 0.8)',
        position: 'absolute'
    },
    detailWrapper: {

    },
    categoryTag: {

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

export { AdminCourseCard }