import React, { useEffect, useState } from "react";
import { SafeAreaView, Image, StyleSheet, Text } from "react-native";

const History = () => {
    return (
        <SafeAreaView style={styles.container}>
            <Text>History</Text>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1, 
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

export { History };