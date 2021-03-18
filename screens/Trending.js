import React from "react";
import { SafeAreaView, Image, StyleSheet, Text, View, ScrollView } from "react-native";

const Trending = ({navigation}) => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Text>Trending</Text>
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

export { Trending };