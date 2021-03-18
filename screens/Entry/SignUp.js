import React from "react";
import { SafeAreaView, TouchableOpacity, TextInput, StyleSheet, View, Dimensions, Text } from "react-native";
import { Formik } from 'formik';
import * as yup from 'yup';
import { registerWithEmail } from '../../components/firebase';
import { CommonActions } from '@react-navigation/native';

const SignUp = ({ navigation }) => {
    return (
        <SafeAreaView style={styles.container}>

            <Formik
                initialValues={{ username: '', phone: '', email: '', password: '', confirmPassword: '' }}
                onSubmit={(values) => {
                    console.log("Register Button Pressed!", values)
                    //navigation.dispatch(CommonActions.reset({ index: 0, routes: [{name: 'Register', params: { username: values.username, phone: values.phone, email: values.email }}] }))
                    registerWithEmail(values.email, values.password).then(() => {
                            navigation.dispatch(CommonActions.reset({ index: 0, routes: [{name: 'Register', params: { username: values.username, phone: values.phone, email: values.email }}] }))
                    });
                }}
                validationSchema={
                    yup.object().shape({
                        username: yup.string().required("Username is required"),
                        phone: yup.number().required("Phone Number is required").moreThan(10, "Enter a valid phone number"),
                        email: yup.string().email("Input Valid Email Id").required("Email is required"),
                        password: yup.string().required().min(8, 'Must be a minimum of 8 characters'),
                        confirmPassword: yup.string().required("Confirm Password is required").oneOf([yup.ref('password'), null], 'Passwords do not match')
                    })
                }
            >
                {({ handleSubmit, handleChange, values, errors }) => (
                    <>
                        <View style={styles.loginFormContainer}>
                            <View style={styles.inputWrapper}>
                                <TextInput name='username' style={styles.textInput} placeholder="Name" placeholderTextColor='black' onChangeText={handleChange('username')} value={values.username} />
                                {errors.username && (
                                    <Text style={styles.errorInput}>
                                        {errors.username}
                                    </Text>
                                )}
                            </View>
                            <View style={styles.inputWrapper}>
                                <TextInput name='phone' style={styles.textInput} placeholder="Phone Number" placeholderTextColor='black' keyboardType='numeric' onChangeText={handleChange('phone')} value={values.phone} />
                                {errors.phone && (
                                    <Text style={styles.errorInput}>
                                        {errors.phone}
                                    </Text>
                                )}
                            </View>
                            <View style={styles.inputWrapper}>
                                <TextInput name='email' style={styles.textInput} placeholder="Email" placeholderTextColor='black' onChangeText={email => setEmail(email)} onChangeText={handleChange('email')} value={values.email} />
                                {errors.email && (
                                    <Text style={styles.errorInput}>
                                        {errors.email}
                                    </Text>
                                )}
                            </View>
                            <View style={styles.inputWrapper}>
                                <TextInput name='password' style={styles.textInput} placeholder="Password" placeholderTextColor='black' secureTextEntry={true} onChangeText={handleChange('password')} value={values.password} />
                                {errors.password && (
                                    <Text style={styles.errorInput}>
                                        {errors.password}
                                    </Text>
                                )}
                            </View>
                            <View style={styles.inputWrapper}>
                                <TextInput name='confirm_password' style={styles.textInput} placeholder="Confirm Password" placeholderTextColor='black' secureTextEntry={true} onChangeText={handleChange('confirmPassword')} value={values.confirmPassword} />
                                {errors.confirmPassword && (
                                    <Text style={styles.errorInput}>
                                        {errors.confirmPassword}
                                    </Text>
                                )}
                            </View>
                        </View>
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity style={styles.touchableContainer} onPress={handleSubmit}>
                                <Text style={styles.text}>Register</Text>
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
        marginVertical: 20,
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
        flex: 0.2,
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

export { SignUp };