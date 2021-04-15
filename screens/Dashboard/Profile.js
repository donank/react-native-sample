import React, { useEffect, useState, useReducer } from "react";
import { SafeAreaView, Image, StyleSheet, Text, ScrollView, View, TouchableOpacity, Pressable } from "react-native";
import AppLoading from 'expo-app-loading';
import { Toolbar } from "../../components/Toolbar";
import {
  useFonts,
  Roboto_400Regular,
} from '@expo-google-fonts/roboto';
import { CourseTag } from "../../components/CourseTag";
import { Ionicons } from "@expo/vector-icons";
import * as Location from 'expo-location';
import { GMAP_API_KEY } from "@env";
import { fetchSeeker, updateCoordinates, fetchTagById, fetchTags } from '../../components/firebase';

const Profile = () => {

  const [location, setLocation] = useState(null);
  const [userData, setUserData] = useState({});
  const [interestTags, setInterestTags] = useState([]);

  const getLocation = async () => {
    let { status } = await Location.requestPermissionsAsync();
    if (status !== 'granted') {
      setErrorMsg('Permission to access location was denied');
      return;
    }

    await Location.getCurrentPositionAsync({}).then((result) => {
      fetchLocation(result.coords.latitude, result.coords.longitude)
      updateCoordinates(userData.email, result.coords.latitude, result.coords.longitude).then(() => {
        console.log("Coordinates Updated")
      })
    });
  }



  const fetchLocation = (lat, long) => {
    fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${long}&key=${GMAP_API_KEY}`)
      .then((response) => response.json())
      .then((json) => {
        json.results.forEach((item) => {
          if (item.types[0] == 'locality') {
            setLocation(item.formatted_address)
          }
        })
      })
      .catch((error) => console.error(error))
  }

  useEffect(() => {
    fetchData().finally(() => {
      let interests = []
      
      fetchTags().then((snapshot) => {
        if (snapshot.empty) {
          console.log('No matching documents.');
        }
        snapshot.forEach(doc => {
          userData.interests.forEach(item => {
            if (item == doc.data().id) {
              interests.push(doc.data())
            }
          })
        });
        setInterestTags(interests);
        //console.log("Interests:", interests)
      })
      console.log(interestTags)
    })
  }, [])

  const fetchData = async () => {
    await fetchSeeker('seekers', 'aankit@iitk.ac.in').then((doc) => {
      if (!doc.exists) {
        console.log('No matching documents.');
      }
      setUserData(doc.data());
      fetchLocation(doc.data().coordinates.U, doc.data().coordinates.k)
      
    });
  }
  
    const courseTaglist = interestTags.map((item, index) => {
      return (
        <CourseTag key={index} type={item.category} name={item.name} />
      );
    });

  let [fontsLoaded] = useFonts({
    Roboto_400Regular,
  })
  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView style={{ marginTop: 40 }}>
          <Pressable style={{ alignSelf: 'flex-end', paddingHorizontal: 10, paddingVertical: 4, marginRight: 10, marginTop: 10 }}
            onPress={() => { console.log("Edit Button Pressed") }}
          >
            <Text>Edit</Text>
          </Pressable>
          <Image style={styles.profilePic} source={{ uri: userData.pfpurl }} />
          <Text style={styles.name}>{userData.name}</Text>
          <View style={styles.tagContainer}>
            {courseTaglist}
            
          </View>
          <View style={styles.numericalDetailsContainer}>
            <View style={styles.numericalDetailsItemContainer}>
              <Text style={styles.detailsItemTitle}>Total Score</Text>
              <Text style={styles.detailsItemValue}>{userData.total_courses_enrolled * 10}</Text>
            </View>
            <View style={styles.numericalDetailsItemContainer}>
              <Text style={styles.detailsItemTitle}>Enrolled</Text>
              <Text style={styles.detailsItemValue}>{userData.total_courses_enrolled}</Text>
            </View>
            <View style={styles.numericalDetailsItemContainer}>
              <Text style={styles.detailsItemTitle}>Completed</Text>
              <Text style={styles.detailsItemValue}>{userData.completed_course}</Text>
            </View>
          </View>
          <View style={styles.detailsContainer}>
            <TouchableOpacity style={styles.locationContainer} onPress={() => {
              getLocation()
            }}>
              <View style={styles.locationIconContainer}>
                <Ionicons
                  name="location-outline"
                  size={40}
                  color="black"
                />
              </View>
              <Text style={styles.locationText}>
                {location}
              </Text>
            </TouchableOpacity>
            <View style={styles.detailLabelContainer}>

            </View>
            <View style={styles.detailDataContainer}>

            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(184, 210, 208, 0.44)',
  },
  profilePic: {
    width: 120,
    height: 120,
    alignSelf: 'center',
    borderRadius: 60,
    borderWidth: 3,
    borderColor: '#549287',
  },
  name: {
    alignSelf: 'center',
    color: 'black',
    ...Platform.select({
      ios: { fontFamily: 'Arial', },
      android: { fontFamily: 'Roboto_400Regular' }
    }),
    fontWeight: '400',
    fontSize: 30,
    marginVertical: 10
  },
  tagContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    alignSelf: 'center',
    width: '80%',
    flexWrap: 'wrap',
  },
  numericalDetailsContainer: {
    flexDirection: 'row',
    marginTop: 10,
    borderColor: '#C4C4C4',
    borderBottomWidth: 1,
    borderTopWidth: 1
  },
  numericalDetailsItemContainer: {
    flex: 1,
    alignItems: 'center',
  },
  detailsItemTitle: {
    color: 'black',
    ...Platform.select({
      ios: { fontFamily: 'Arial', },
      android: { fontFamily: 'Roboto_400Regular' }
    }),
    fontWeight: '400',
    fontSize: 16,
    marginTop: 10
  },
  detailsItemValue: {
    color: 'black',
    ...Platform.select({
      ios: { fontFamily: 'Arial', },
      android: { fontFamily: 'Roboto_400Regular' }
    }),
    fontWeight: '400',
    fontSize: 16,
    marginTop: 6,
    marginBottom: 10
  },
  detailsContainer: {

  },
  detailDataContainer: {

  },
  detailLabelContainer: {

  },
  locationContainer: {
    width: '90%',
    backgroundColor: '#549287',
    height: 60,
    alignSelf: 'center',
    marginVertical: 10,
    borderRadius: 6,
    flexDirection: 'row'
  },
  locationIconContainer: {
    backgroundColor: '#61B8A8',
    margin: 10,
    borderRadius: 30
  },
  locationText: {
    alignSelf: 'center',
    color: 'black',
    ...Platform.select({
      ios: { fontFamily: 'Arial', },
      android: { fontFamily: 'Roboto_400Regular' }
    }),
    fontWeight: '400',
    fontSize: 16,
    marginLeft: 10,
    width: '60%'
  }
});

export { Profile };

/*
<CourseTag type="Professional" name="Programming" />
            <CourseTag type="Vocational" name="Cooking" />
            <CourseTag type="Academic" name="Political Philosophy" />
            <CourseTag type="Vocational" name="Plumbing" />
            <CourseTag type="Academic" name="Differential Equations" />
            <CourseTag type="Professional" name="Fundamental Analysis and Trading Techniques" />*/