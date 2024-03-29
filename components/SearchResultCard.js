import React from "react";
import { StyleSheet, TouchableOpacity, Text, Platform, Image, View } from "react-native";
import { useNavigation } from '@react-navigation/native';

const SearchResultCard = () => {
    const navigation = useNavigation();

    return (
        <TouchableOpacity style={styles.container} onPress={() => { }}>
            <Image style={styles.hero} source={require('../assets/programming.jpg')} />
            <View style={styles.heroTint} />
            <View style={styles.detailWrapper}>
                <Text style={styles.title}>Learn Python Fundamentals</Text>
                <Text style={styles.creator}>Guido Van Rossum</Text>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F6F3F3',
        width: '90%',
        height: 100,
        marginVertical: 10
    },
    detailWrapper: {
        flex: 1,
        justifyContent: 'center',
        marginLeft: 10,
    },
    title: {
        color: 'white',
        ...Platform.select({
            ios: { fontFamily: 'Arial', },
            android: { fontFamily: 'Roboto' }
        }),
        fontWeight: '400',
        fontSize: 18
    },
    creator: {
        color: 'white',
        ...Platform.select({
            ios: { fontFamily: 'Arial', },
            android: { fontFamily: 'Roboto' }
        }),
        fontWeight: "400",
        fontSize: 16,
    },
    cityWrapper: {

    },
    city: {
        color: 'white',
        ...Platform.select({
            ios: { fontFamily: 'Arial', },
            android: { fontFamily: 'Roboto' }
        }),
        fontWeight: "400",
        fontSize: 14,
    },
    heroTint: {
        backgroundColor: 'rgba(52, 52, 52, 0.8)',
        height: 100,
        width: '100%',
        position: 'absolute'
    },
    hero: {
        height: 100,
        width: '100%',
        position: 'absolute'
    },
    creatorPfp: {
        height: 30,
        width: 30
    }
});

export { SearchResultCard }

/*
<View style={styles.cityWrapper}>
                    <Text>
                        <View style={{}}>
                            <Text style={styles.city}>
                                Bengaluru
                        </Text>
                        </View>
                    </Text>
                </View>

                */
