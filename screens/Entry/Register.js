import React, { useEffect, useState } from "react";
import { SafeAreaView, TextInput, StyleSheet, View, Dimensions, TouchableOpacity, Text } from "react-native";
import { Formik } from 'formik';
import * as yup from 'yup';
import { addData } from '../../components/firebase';

const Register = ({ navigation, route }) => {
    const { username, phone, email } = route.params
    useEffect(() => {
        console.log("Username: ", username);
        console.log("Email", email);
        console.log("Phone", phone)
    })
    return (
        <SafeAreaView style={styles.container}>
            <Formik initialValues={{ houseno: '', street: '', area: '', city: '', pincode: '', landmark: '', state: '' }}
                onSubmit={(values) => {
                    console.log("Submit Button Pressed!", values)
                    addData('seekers', email, {
                        address: `${values.houseno}, ${values.street}, ${values.area}, ${values.landmark}`,
                        pincode: values.pincode,
                        city: values.city,
                        state: values.state,
                        name: username,
                        phone: phone,
                        email: email,
                        date_created: new Date().getTime(),
                        ranking: -1,
                        completed_course: 0,
                        total_courses_enrolled: 0
                    }).then(()=> {
                        navigation.navigate('BottomTabNavigator')
                    })
                }}
                validationSchema={
                    yup.object().shape({
                        houseno: yup.string().required("City is required"),
                        street: yup.string(),
                        city: yup.string().required("City is required"),
                        pincode: yup.string().required().min(6, 'Must be exactly 6 characters'),
                        landmark: yup.string(),
                        state: yup.string().required("State is required")
                    })
                }
            >
                {({ handleSubmit, handleChange, values, errors }) => (
                    <>
                        <View style={styles.loginFormContainer}>
                            <View style={styles.inputWrapper}>
                                <TextInput style={styles.textInput} placeholder="House No." placeholderTextColor='black' onChangeText={handleChange('houseno')} value={values.houseno} />
                                {errors.houseno && (
                                    <Text style={styles.errorInput}>
                                        {errors.houseno}
                                    </Text>
                                )}
                            </View>
                            <View style={styles.inputWrapper}>
                                <TextInput style={styles.textInput} placeholder="Street" placeholderTextColor='black' onChangeText={handleChange('street')} value={values.street} />
                                {errors.street && (
                                    <Text style={styles.errorInput}>
                                        {errors.street}
                                    </Text>
                                )}
                            </View>
                            <View style={styles.inputWrapper}>
                                <TextInput style={styles.textInput} placeholder="Area" placeholderTextColor='black' onChangeText={handleChange('area')} value={values.area} />
                                {errors.area && (
                                    <Text style={styles.errorInput}>
                                        {errors.area}
                                    </Text>
                                )}
                            </View>
                            <View style={styles.inputWrapper}>
                                <TextInput style={styles.textInput} placeholder="city" placeholderTextColor='black' onChangeText={handleChange('city')} value={values.city} />
                                {errors.city && (
                                    <Text style={styles.errorInput}>
                                        {errors.city}
                                    </Text>
                                )}
                            </View>
                            <View style={styles.inputWrapper}>
                                <TextInput style={styles.textInput} placeholder="pincode" placeholderTextColor='black' keyboardType='numeric' maxLength={6} onChangeText={handleChange('pincode')} value={values.pincode} />
                                {errors.pincode && (
                                    <Text style={styles.errorInput}>
                                        {errors.pincode}
                                    </Text>
                                )}
                            </View>
                            <View style={styles.inputWrapper}>
                                <TextInput style={styles.textInput} placeholder="landmark" placeholderTextColor='black' onChangeText={handleChange('landmark')} value={values.landmark} />
                                {errors.landmark && (
                                    <Text style={styles.errorInput}>
                                        {errors.landmark}
                                    </Text>
                                )}
                            </View>
                            <View style={styles.inputWrapper}>
                                <TextInput style={styles.textInput} placeholder="state" placeholderTextColor='black' onChangeText={handleChange('state')} value={values.state} />
                                {errors.state && (
                                    <Text style={styles.errorInput}>
                                        {errors.state}
                                    </Text>
                                )}
                            </View>
                        </View>
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity style={styles.touchableContainer} onPress={handleSubmit}>
                                <Text style={styles.text}>Submit</Text>
                            </TouchableOpacity>
                        </View>
                    </>
                )}
            </Formik>

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginVertical: 10
    },
    textInput: {
        backgroundColor: '#E5E5E5',
        width: Dimensions.get('window').width - 100,
        height: 46,
        marginVertical: 16,
        borderRadius: 5,
        color: 'black',
        padding: 10,
    },
    loginFormContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonContainer: {
        flex: 0.15,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    touchableContainer: {
        backgroundColor: '#E6E6E6',
        width: 144,
        height: 46,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 2
    },
    text: {
        fontSize: 18
    },
    inputWrapper: {

    },
    errorInput: {
        color: 'red'
    }
});

export { Register };