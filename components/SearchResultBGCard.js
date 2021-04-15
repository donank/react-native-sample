import React, { useState, useEffect } from "react";
import { StyleSheet, TouchableOpacity, Text, Platform, Image, View } from "react-native";
import { useNavigation, CommonActions } from '@react-navigation/native';
import { Ionicons } from "@expo/vector-icons";

const SearchResultBGCard = ({ courseTitle, courseCreator, heroImageUrl, pfpurl, description, enrolled, stars, type, location, time, email, coordinates }) => {
    const navigation = useNavigation();
    const [tagColor, setTagColor] = useState('')
    useEffect(() => {
        switch (type) {
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

    const starList = []
    var i;
    for (i = 0; i < stars; i++) {
        starList.push(
            <Ionicons name='star' size={16} color='black' />
        )
    }

    return (
        <TouchableOpacity style={styles.container} onPress={() => {
            navigation.dispatch(CommonActions.navigate({
                name: 'Course', params: {
                    name: courseCreator, title: courseTitle, description: description, enrolled: enrolled, stars: stars, 
                    type: type, imageurl: heroImageUrl, pfpurl: pfpurl, location: location, time: time, email: email,
                    coordinates: coordinates
                }
            }))
        }}>
            <View style={{
                backgroundColor: tagColor,
                paddingVertical: 2,
                paddingHorizontal: 6,
                borderRadius: 2,
                justifyContent: 'center',
                alignItems: 'center',
                position: 'absolute',
                left: -10,
                top: 4,
                elevation: 1
            }}>
                <Text style={styles.categoryTagText}>{type}</Text>
            </View>
            <Image style={styles.hero} source={{ uri: heroImageUrl }} />
            <View style={styles.detailWrapper}>
                <View style={{ flexDirection: 'row' }}>
                    {starList}
                </View>
                <Text style={styles.title}>{courseTitle}</Text>
                <View style={{ flex: 1, flexDirection: 'row', marginTop: 4 }}>
                    <Image style={styles.creatorPfp} source={{ uri: pfpurl }} />
                    <Text style={styles.creator}>{courseCreator}</Text>
                </View>

            </View>

        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#F6F3F3',
        width: '90%',
        height: 100,
        marginBottom: 10
    },
    detailWrapper: {
        flex: 1,
        justifyContent: 'center',
        marginLeft: 10,
        marginTop: 10,
    },
    title: {
        color: 'black',
        ...Platform.select({
            ios: { fontFamily: 'Arial', },
            android: { fontFamily: 'Roboto' }
        }),
        fontWeight: '400',
        fontSize: 18
    },
    creator: {
        color: 'black',
        ...Platform.select({
            ios: { fontFamily: 'Arial', },
            android: { fontFamily: 'Roboto' }
        }),
        marginTop: 2,
        marginLeft: 6,
        fontWeight: "400",
        fontSize: 16
    },
    hero: {
        height: 100,
        width: 100
    },
    creatorPfp: {
        height: 30,
        width: 30,
        borderRadius: 30
    },
    categoryTagText: {
        color: 'white',
        fontFamily: 'Roboto_400Regular',
        fontSize: 14
    },
});

export { SearchResultBGCard }
