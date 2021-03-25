import React from "react";
import { StyleSheet, TouchableOpacity, Text, Platform, Image, View } from "react-native";
import { useNavigation, CommonActions } from '@react-navigation/native';

const SearchResultBGCard = ({courseTitle, courseCreator, heroImageUrl, pfpurl, description, enrolled, stars, type, location, time, email}) => {
    const navigation = useNavigation();

    return (
        <TouchableOpacity style={styles.container} onPress={() => {
            navigation.dispatch(CommonActions.navigate({name: 'Course', params: { 
                name: courseCreator, title: courseTitle, description: description, enrolled: enrolled, stars: stars, type: type, imageurl: heroImageUrl, pfpurl: pfpurl, location: location, time: time, email: email
            }} ))
         }}>
            <Image style={styles.hero} source={{uri:heroImageUrl}} />
            <View style={styles.detailWrapper}>
                <Text style={styles.title}>{courseTitle}</Text>
                <View style={{flex: 1, flexDirection: 'row', marginTop: 4}}>
                    <Image style={styles.creatorPfp} source={{uri: pfpurl}} />
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
        marginTop: 16
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
    }
});

export { SearchResultBGCard }
