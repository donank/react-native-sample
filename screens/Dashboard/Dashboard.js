import React, { useState, useEffect, useReducer } from "react";
import { SafeAreaView, Image, StyleSheet, Text, View, ScrollView, Dimensions, FlatList } from "react-native";
import { OngoingCourses } from "../../components/OngoingCourses";
import { Toolbar } from "../../components/Toolbar";
import { fetchSeeker, fetchCourses } from '../../components/firebase';

const Dashboard = ({ navigation }) => {

  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    navigation.dangerouslyGetParent().setOptions({
      tabBarVisible: true
    });
    fetchData()
    console.log("DAta:", data)
  }, []);

  /*
  const onGoingCoursesList = data.map((item, index) => {
    return (
      <OngoingCourses key={index} category={data[index].}
      />
    );
  });*/

  const renderItem2 = ({ item }) => (
    <OngoingCourses category={item.category_type} title={item.name} heroImageUrl={item.heroImageUrl} />
  );

  const fetchData = async () => {
    await fetchSeeker('seekers', 'aankit@iitk.ac.in').then((doc) => {
      if (!doc.exists) {
        console.log('No matching documents.');
      }
      doc.data().ongoing_courses.forEach(item => {
        console.log(item)
        fetchCourses(item).then((doc1) => {
          if (!doc1.exists) {
            console.log('No matching documents.');
          }
          setData([...data, doc1.data()])
        })
      })
    }).finally(() => setLoading(false))
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Toolbar />
        <Text style={styles.ongoingHeading}>Ongoing</Text>
        <View style={{

        }}>

        </View>
        {loading ? (
        <></>
        ) : (
          <OngoingCourses category="Vocational" title="Cooking" heroImageUrl="https://i2.wp.com/www.eatthis.com/wp-content/uploads/2020/07/cooking-with-olive-oil.jpg?resize=640%2C360&ssl=1" />
        )
        }
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