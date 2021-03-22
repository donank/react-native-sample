import React from "react";
import { StyleSheet, TouchableOpacity, Text, Platform, Image, View } from "react-native";
import { useNavigation } from '@react-navigation/native';

const SearchResultBGCard = () => {
    const navigation = useNavigation();

    return (
        <TouchableOpacity style={styles.container} onPress={() => { }}>
            <Image style={styles.hero} source={require('../assets/programming.jpg')} />
            <View style={styles.detailWrapper}>
                <Text style={styles.title}>Learn Python Fundamentals</Text>
                <View style={{flex: 1, flexDirection: 'row', marginTop: 4}}>
                    <Image style={styles.creatorPfp} source={require('../assets/pfp.png')} />
                    <Text style={styles.creator}>Guido Van Rossum</Text>
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
        width: 30
    }
});

export { SearchResultBGCard }
