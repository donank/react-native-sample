import React, { useEffect, useState } from "react";
import { SafeAreaView, Image, StyleSheet, Text, FlatList, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { AdminCourseCard } from "../components/AdminCourseCard";
import { searchSkill } from "../components/firebase";

const Settings = () => {
  const [academicData, setAcademicData] = useState([]);
  const [professionalData, setProfessionalData] = useState([]);
  const [vocationalData, setVocationalData] = useState([]);
  const [hobbyData, setHobbyData] = useState([]);

  const renderItem2 = ({ item }) => (
    <AdminCourseCard
      name={item.creator_name} title={item.name}
      description={item.description}
      enrolled={item.enrolled} stars={item.rating} type={item.type}
      imageurl={item.heroImageUrl}
      pfpurl={item.pfpurl}
      location={item.location}
      time={item.time}
      email={item.email}
      category={item.category_type}
      coordinates={item.coordinates} />
  );

  useEffect(() => {
    fetchCategorySearchData('Academic')
    fetchCategorySearchData('Professional')
    fetchCategorySearchData('Vocational')
    fetchCategorySearchData('Hobby')
  }, [])

  const fetchCategorySearchData = async (category) => {
    let snapshot = await searchSkill('skills', 'category_type', '==', category).get().then((snapshot) => {
      let arr = []
      if (snapshot.empty) {
        console.log('No matching documents.');
      }
      snapshot.forEach(doc => {
        arr.push(doc.data())
      });
      switch (category) {
        case "Professional": {
          setProfessionalData(arr)
          break;
        }
        case "Vocational": {
          setVocationalData(arr)
          break;
        }
        case "Academic": {
          setAcademicData(arr)
          console.log(arr)
          break;
        }
        case "Hobby": {
          setHobbyData(arr)
          break;
        }
      }
      console.log(arr)
    })
  }
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={{ backgroundColor: '#4A5568', padding: 10, }}><Text style={{ marginLeft: 10, color: 'white' }}>Academic</Text></View>
        <FlatList data={academicData} horizontal={true} renderItem={renderItem2} keyExtractor={item => item.id} />
        <View style={{ backgroundColor: '#4A5568', padding: 10, marginTop: 10 }}><Text style={{ marginLeft: 10, color: 'white' }}>Professional</Text></View>
        <FlatList data={professionalData} horizontal={true} renderItem={renderItem2} keyExtractor={item => item.id} />
        <View style={{ backgroundColor: '#4A5568', padding: 10, marginTop: 10 }}><Text style={{ marginLeft: 10, color: 'white' }}>Vocational</Text></View>
        <FlatList data={vocationalData} horizontal={true} renderItem={renderItem2} keyExtractor={item => item.id} />
        <View style={{ backgroundColor: '#4A5568', padding: 10, marginTop: 10 }}><Text style={{ marginLeft: 10, color: 'white' }}>Hobby</Text></View>
        <FlatList data={hobbyData} horizontal={true} renderItem={renderItem2} keyExtractor={item => item.id} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: 80
  },
});

export { Settings };