import React, { useEffect, useState } from "react";
import { SafeAreaView, Image, StyleSheet, Text, ScrollView, View, TouchableOpacity } from "react-native";
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

const Profile = () => {

  const [location, setLocation] = useState(null);

  const getLocation = async () => {
    let { status } = await Location.requestPermissionsAsync();
    if (status !== 'granted') {
      setErrorMsg('Permission to access location was denied');
      return;
    }

    let location = await Location.getCurrentPositionAsync({}).then((result)=>{
      fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${result.coords.latitude},${result.coords.longitude}&key=${GMAP_API_KEY}`)
      .then((response) => response.json())
      .then((json) => {
        console.log(json)
        json.results.forEach((item) => {
          if(item.types[0] == 'locality'){
            setLocation(item.formatted_address)
          }
        })
      })
      .catch((error) => console.error(error))
    });
    
    setLocation(location);
  }

  let [fontsLoaded] = useFonts({
    Roboto_400Regular,
  })
  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <Image style={styles.profilePic} source={require('../../assets/leo-tolstoy.jpg')} />
          <Text style={styles.name}>Leo Tolstoy</Text>
          <View style={styles.tagContainer}>
            <CourseTag type="Professional" name="Programming" />
            <CourseTag type="Vocational" name="Cooking" />
            <CourseTag type="Academic" name="Political Philosophy" />
            <CourseTag type="Vocational" name="Plumbing" />
            <CourseTag type="Academic" name="Differential Equations" />
            <CourseTag type="Professional" name="Fundamental Analysis and Trading Techniques" />
          </View>
          <View style={styles.numericalDetailsContainer}>
            <View style={styles.numericalDetailsItemContainer}>
              <Text style={styles.detailsItemTitle}>Total Score</Text>
              <Text style={styles.detailsItemValue}>100</Text>
            </View>
            <View style={styles.numericalDetailsItemContainer}>
              <Text style={styles.detailsItemTitle}>Enrolled</Text>
              <Text style={styles.detailsItemValue}>4</Text>
            </View>
            <View style={styles.numericalDetailsItemContainer}>
              <Text style={styles.detailsItemTitle}>Completed</Text>
              <Text style={styles.detailsItemValue}>2</Text>
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
    marginTop: 60
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