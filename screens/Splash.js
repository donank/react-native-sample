import React, { useEffect, useState } from "react";
import { SafeAreaView, Image, StyleSheet, Text } from "react-native";

const Splash = () => {
    return (
        <SafeAreaView style={styles.container}>
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