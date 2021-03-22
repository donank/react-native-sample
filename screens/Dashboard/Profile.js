import React, { useEffect, useState } from "react";
import { SafeAreaView, Image, StyleSheet, Text, ScrollView } from "react-native";
import { Toolbar } from "../../components/Toolbar";

const Profile = () => {
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
    backgroundColor: 'rgba(184, 210, 208, 0.44)'
  },
});

export { Profile };