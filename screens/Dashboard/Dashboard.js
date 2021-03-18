import React from "react";
import { SafeAreaView, Image, StyleSheet, Text, View, ScrollView } from "react-native";
import { Toolbar } from "../../components/Toolbar";

const Dashboard = ({navigation}) => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Toolbar/>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export { Dashboard };