import React, { useEffect, useState } from "react";
import { SafeAreaView, Image, StyleSheet, Text, View, ScrollView, BackHandler } from "react-native";
import { fetchTrendingCourses } from "../components/firebase";
import { TrendingCourse } from "../components/TrendingCourse";

const Trending = ({ navigation }) => {

  const [trendingCourses, setTrendingCoruses] = useState([])

  useEffect(() => {
    /*navigation.dangerouslyGetParent().dangerouslyGetParent().setOptions({
      tabBarVisible: false
    });*/

    getTrends()
  }, [])

  const getTrends = async () => {
    const snap = await fetchTrendingCourses('skills').get().then((snapshot) => {
      let arr = []
      if (snapshot.empty) {
        console.log('No matching documents.');
      }
      snapshot.forEach(doc => {
        arr.push(doc.data())
      });
      setTrendingCoruses(arr)
    })
  }

  const trendingCourseList = trendingCourses.map((item, index) => {
    return (
      <TrendingCourse key={index}
        name={trendingCourses[index].creator_name} title={trendingCourses[index].name}
        description={trendingCourses[index].description}
        enrolled={trendingCourses[index].enrolled} stars={trendingCourses[index].rating} type={trendingCourses[index].category_type}
        imageurl={trendingCourses[index].heroImageUrl}
        pfpurl={trendingCourses[index].pfpurl}
        location={trendingCourses[index].location}
        time={trendingCourses[index].time}
        email={trendingCourses[index].email}
        coordinates={trendingCourses[index].coordinates} />
    )
  })

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={{marginTop: 60}}>
        {trendingCourseList}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
});

export { Trending };