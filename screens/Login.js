import React, { useEffect, useState } from "react";
import { SafeAreaView, Image, TextInput, StyleSheet, View, Dimensions } from "react-native";
import { SignInButton } from "../components/SignInButton";
import { SignUpButton } from "../components/SignUpButton";

const Login = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          style={{ width: 270, height: 240 }}
          source={require('../assets/login.png')}
        />
      </View>
      <View style={styles.loginFormContainer}>
        <TextInput style={styles.textInput} placeholder="Email" placeholderTextColor='black' />
        <TextInput style={styles.textInput} placeholder="Password" secureTextEntry={true} placeholderTextColor='black' />
        
      </View>
      <View style={styles.buttonContainer}>
          <SignInButton />
          <SignUpButton />
        </View>
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
    height: 50,
    marginVertical: 20,
    borderRadius: 5,
    color: 'black',
    padding: 10
  },
  imageContainer: {
    flex: 0.8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 60
  },
  loginFormContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -60
  },
  buttonContainer: {
    flex: 0.2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 30
  }
});

export { Login };