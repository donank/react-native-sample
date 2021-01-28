import React, { useEffect, useState } from "react";
import { SafeAreaView, Image, StyleSheet, Text } from "react-native";

const Splash = ({ navigation }) => {
  useEffect(()=>{
    setTimeout(() => {  navigation.navigate('Entry') }, 3000);
  },[]);

  return (
    <SafeAreaView style={styles.container}>
      <Image
          style={{ width: 270, height: 240 }}
          source={require('../assets/login.png')}
        />
      <Text style={styles.text}>neshM</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#549287',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: 'white',
    fontSize: 64
  }
});

export { Splash };