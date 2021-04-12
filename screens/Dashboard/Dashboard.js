import React, { useState, useEffect } from "react";
import { SafeAreaView, Image, StyleSheet, Text, View, ScrollView, Dimensions } from "react-native";
import { OngoingCourses } from "../../components/OngoingCourses";
import { Toolbar } from "../../components/Toolbar";
import { fetchSeeker, fetchCourses } from '../../components/firebase';

const Dashboard = ({ navigation }) => {

  const [data, setData] = useState({})

  useEffect(() => {
    navigation.dangerouslyGetParent().setOptions({
      tabBarVisible: true
    });
    fetchData()
  }, []);

  /*const onGoingCoursesList = data.map((item, index) => {
    return (
      <OngoingCourses category={data[index].}
      />
    );
  });*/

  const fetchData = async () => {
    await fetchSeeker('seekers', 'aankit@iitk.ac.in').then((doc) => {
      console.log("Seeker:", doc.data())
      if (!doc.exists) {
        console.log('No matching documents.');
      }

      doc.data().ongoing_courses.forEach(item => {
        console.log(item)
        fetchCourses(item).then((doc) => {
          if (!doc.exists) {
            console.log('No matching documents.');
          }
          console.log(doc.data())
          setData(doc.data())
        })

      })

    })
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Toolbar />
        <Text style={styles.ongoingHeading}>Ongoing</Text>
        <View style={{

        }}>

        </View>
        <OngoingCourses category={data.category_type} title={data.name} heroImageUrl={data.heroImageUrl} />
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
    height: Dimensions.get('screen').height / 4,
    width: Dimensions.get('screen').height / 5,
    backgroundColor: 'red',
    marginHorizontal: 10,
    borderBottomLeftRadius: 6,
    borderTopRightRadius: 6
  }
});

export { Dashboard };