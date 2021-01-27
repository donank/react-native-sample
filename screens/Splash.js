import React, { useEffect, useState } from "react";
import { SafeAreaView, Image, StyleSheet, Text } from "react-native";

const Splash = () => {
    return (
        <SafeAreaView style={styles.container}>
            <Text>Splash</Text>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1, 
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      borderColor: 'black',
      borderWidth: 5
    },
  });

export { Splash };