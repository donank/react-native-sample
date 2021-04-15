import React, { useState, useEffect } from "react";
import { StyleSheet, Text, Platform, Image, View, Pressable, TouchableOpacity } from "react-native";
import { useNavigation, CommonActions } from '@react-navigation/native';
import AppLoading from 'expo-app-loading';
import {
    useFonts,
    Roboto_400Regular,
} from '@expo-google-fonts/roboto';

const InterestCard = ({ name, type }) => {
    const navigation = useNavigation();
    const [padding, setPadding] = useState(0);
    const [pressed, setPressed] = useState(false);
    const [tagColor, setTagColor] = useState('');
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
            case "Hobby": {
                setTagColor('#549287')
                break;
            }
        }
    }, []);

    let [fontsLoaded] = useFonts({
        Roboto_400Regular,
    })
    if (!fontsLoaded) {
        return <AppLoading />;
    } else {
        return (
            <Pressable style={{
                backgroundColor: tagColor,
                marginHorizontal: 4,
                marginTop: 6,
                borderTopLeftRadius: 8,
                borderBottomRightRadius: 8
            }} onPress={() => {
                setPressed(!pressed)
                pressed ? setPadding(0.0) : setPadding(0.4)
            }}>
                <View style={{
                    backgroundColor: `rgba(52, 52, 52, ${padding})`,
                    padding: 14,
                    borderTopLeftRadius: 8,
                    borderBottomRightRadius: 8
                }}>
                    <Text>{name}</Text>
                </View>
            </Pressable>
        );
    }
}

export { InterestCard }
