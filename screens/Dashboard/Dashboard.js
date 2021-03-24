import React from "react";
import { SafeAreaView, Image, StyleSheet, Text, View, ScrollView, Dimensions } from "react-native";
import { OngoingCourses } from "../../components/OngoingCourses";
import { Toolbar } from "../../components/Toolbar";

const Dashboard = ({navigation}) => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Toolbar/>
        <Text style={styles.ongoingHeading}>Ongoing</Text>
        <View style={{}}>

        </View>
        <OngoingCourses/>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(184, 210, 208, 0.44)'
  },
  ongoingHeading: {
    margin: 10
  },
  courseContainer: {
    height: Dimensions.get('screen').height/4,
    width: Dimensions.get('screen').height/5,
    backgroundColor: 'red',
    marginHorizontal: 10,
    borderBottomLeftRadius: 6,
    borderTopRightRadius: 6
  }
});

export { Dashboard };