import React, { useEffect, useState } from "react";
import { SafeAreaView, Image, StyleSheet, Text, ScrollView } from "react-native";
import { Toolbar } from "../../components/Toolbar";

const Search = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Toolbar />
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

export { Search };