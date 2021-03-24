import React, { useState } from "react";
import { SafeAreaView, Image, StyleSheet, Text, View, ScrollView, Dimensions, FlatList, Modal, Pressable, TextInput } from "react-native";
import { Toolbar } from "../components/Toolbar";
import AppLoading from 'expo-app-loading';
import 'react-native-get-random-values';
import { v4 as uuid } from 'uuid';

import {
    useFonts,
    Roboto_400Regular,
} from '@expo-google-fonts/roboto';
import { Ionicons } from "@expo/vector-icons";

const Item = ({ title }) => (
    <View style={styles.item}>
        <View style={{justifyContent:'center', alignItems: 'center'}}>
        <Ionicons name='ellipse' size={16} color='#C4C4C4'/>
        </View>
        <Text style={styles.listTitle}>{title}</Text>
    </View>
);

const EnrolledCourseProgress = ({ navigation }) => {

    let [data, setData] = useState([]);
    const [todo, setTodo] = useState('');
    const [modalVisible, setModalVisible] = useState(false);

    const renderItem = ({ item }) => <Item title={item.title} />;

    let [fontsLoaded] = useFonts({
        Roboto_400Regular,
    })
    if (!fontsLoaded) {
        return <AppLoading />;
    } else {
        return (
            <SafeAreaView style={styles.container}>
                <ScrollView>
                    <Toolbar />
                    <View style={styles.heroContainer}>
                        <Image style={styles.hero} source={require('../assets/programming.jpg')} />
                        <View style={styles.heroTint} />
                        <Text style={styles.courseTitle}>Learn Python Fundamentals</Text>
                    </View>
                    <View style={styles.todoContainer}>
                        <View style={styles.todoHeadingContainer}>
                            <Text style={styles.todoHeading}>To Do</Text>
                        </View>
                        <View style={styles.todoListContainer}>
                            <Ionicons style={styles.addIcon} name='add-circle-outline' size={36} color='black' onPress={() => {
                                setModalVisible(true)
                            }} />
                            {data == "" ? (
                                <Image source={require('../assets/note.png')} style={styles.noTodoImage} />
                            ) : (
                                <FlatList data={data} renderItem={renderItem} keyExtractor={item => item.id} style={styles.todoList} />
                            )}
                        </View>
                    </View>

                    <Modal animationType="slide" transparent={true} visible={modalVisible} onRequestClose={() => {
                        setModalVisible(!modalVisible);
                    }}>
                        <View style={styles.modalView}>
                            <View style={styles.modalCard}>

                                <TextInput style={styles.modalTextInput} value={todo} onChangeText={(text) => setTodo(text)} multiline numberOfLines={4} />

                                <View style={styles.modalButtonContainer}>
                                    <Pressable
                                        style={styles.modalCloseButton}
                                        onPress={() => setModalVisible(!modalVisible)}
                                    >
                                        <Text style={styles.modalButtonText}>Close</Text>
                                    </Pressable>
                                    <Pressable
                                        style={styles.modalSaveButton}
                                        onPress={() => {
                                            let dataArr = data
                                            dataArr.push({
                                                id: uuid().toString(),
                                                title: todo
                                            })
                                            console.log(dataArr)
                                            setData(dataArr)
                                            setModalVisible(!modalVisible)
                                        }}
                                    >
                                        <Text style={styles.modalButtonText}>Save</Text>
                                    </Pressable>
                                </View>
                            </View>
                        </View>
                    </Modal>
                </ScrollView>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    heroContainer: {
        width: '100%',
        height: Dimensions.get('screen').height / 8
    },
    hero: {
        width: '100%',
        height: '100%'
    },
    heroTint: {
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(52, 52, 52, 0.8)',
        position: "absolute"
    },
    courseTitle: {
        color: 'white',
        position: 'absolute',
        bottom: 30,
        fontFamily: 'Roboto_400Regular',
        fontSize: 20,
        marginLeft: 10,
        backgroundColor: '#549287',
        paddingHorizontal: 6,
        paddingVertical: 2
    },
    todoContainer: {
        flexDirection: 'column',
        backgroundColor: '#E28585',
        minHeight: Dimensions.get('screen').height / 1.5,
        marginTop: 1
    },
    todoHeadingContainer: {
        backgroundColor: '#C4C4C4',
        width: 80,
        alignItems: 'center',
        marginTop: -20,
        marginLeft: 10,
        paddingHorizontal: 10,
        paddingVertical: 6
    },
    todoHeading: {
        fontFamily: 'Roboto_400Regular',
        fontSize: 18,
    },
    todoListContainer: {
        flex: 1
    },
    addIcon: {
        position: 'absolute',
        right: 14
    },
    listTitle: {
        color: 'black',
        fontFamily: 'Roboto_400Regular',
        fontSize: 18,
        marginLeft: 10
    },
    item: {
        flexDirection: 'row',
        marginTop: 10
    },
    todoList: {
        marginVertical: 40,
        marginLeft: 20
    },
    modalView: {
        flex: 1,
        justifyContent: "center",
        marginTop: 22,
    },
    modalCard: {
        alignSelf: 'center',
        width: '80%',
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        backgroundColor: "white",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    modalButtonContainer: {
        flexDirection: 'row'
    },
    modalCloseButton: {
        backgroundColor: '#E28585',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 20,
        margin: 10,
        width: '50%',
        height: 42,
        alignItems: 'center',
        justifyContent: 'center'
    },
    modalSaveButton: {
        backgroundColor: '#549287',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 20,
        margin: 10,
        width: '50%',
        height: 42,
        alignItems: 'center',
        justifyContent: 'center'
    },
    modalButtonText: {
        fontFamily: 'Roboto_400Regular',
        fontSize: 16,
    },
    modalTextInput: {
        backgroundColor: '#E5E5E5',
        width: '100%',
        color: 'black',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: 'black',
        fontFamily: 'Roboto_400Regular',
        fontSize: 16
    },
    noTodoImage: {
        marginTop: '40%',
        justifyContent: 'center',
        alignSelf: 'center'
    }
});

export { EnrolledCourseProgress };