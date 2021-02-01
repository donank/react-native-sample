import React, { useEffect, useState } from "react";
import { SafeAreaView, Image, StyleSheet, Text } from "react-native";
import * as firebase from 'firebase'
import 'firebase/firestore';

const Dashboard = () => {
    return (
        <SafeAreaView style={styles.container}>
            <Text>Dashboard</Text>
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

export { Dashboard };