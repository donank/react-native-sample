import React, { useEffect, useState } from "react";
import { SafeAreaView, Image, TextInput, StyleSheet, View, Dimensions, Text } from "react-native";
import { InterestCard } from "../../components/InterestCard";

const Interests = () => {


  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.tagContainer}>
        <InterestCard name="Economics" type="Academic" />
        <InterestCard name="Cooking" type="Vocational" />
        <InterestCard name="Taekwondo" type="Vocational" />
        <InterestCard name="Physics" type="Academic" />
        <InterestCard name="Programming" type="Professional" />
        <InterestCard name="Guitar" type="Vocational" />
        <InterestCard name="Data Science" type="Professional" />
        <InterestCard name="Lorem Ipsum" type="Vocational" />
        <InterestCard name="History" type="Academic" />
      </View>
      <Text>Select atleast 5 Interests</Text>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  },
  tagContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  }
});

export { Interests };