import React, { useEffect, useState, useReducer } from "react";
import { SafeAreaView, Image, StyleSheet, Text, ScrollView, View, TouchableOpacity, Pressable, Modal, TextInput } from "react-native";
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
import * as ImagePicker from 'expo-image-picker';

const Profile = () => {

  const [location, setLocation] = useState(null);
  const [userData, setUserData] = useState({});
  const [interestTags, setInterestTags] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [image, setImage] = useState('https://i.imgur.com/6KzcJJf.png');
  const [maleBgColor, setMaleBgColor] = useState('#E5E5E5');
  const [femaleBgColor, setFemaleBgColor] = useState('#E5E5E5');
  const [transBgColor, setTransBgColor] = useState('#E5E5E5')

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
      setImage(doc.data().pfpurl)
      fetchLocation(doc.data().coordinates.U, doc.data().coordinates.k)
      switch(doc.data().gender){
        case 'M': {
          setMaleBgColor('#898A8D');
          break;
        }
        case 'F': {
          setFemaleBgColor('#898A8D');
          break;
        }
        case 'T': {
          setTransBgColor('#898A8D');
          break;
        }
      }
    });
  }

  const courseTaglist = interestTags.map((item, index) => {
    return (
      <CourseTag key={index} type={item.category} name={item.name} />
    );
  });

  const pickImage = async () => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        } else {
          let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
          });

          console.log(result);

          if (!result.cancelled) {
            setImage(result.uri);
          }
        }
      }
    })();


  };

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
            onPress={() => {
              setModalVisible(true);
            }}
          >
            <Text>Edit</Text>
          </Pressable>
          <Image style={{
            width: 120,
            height: 120,
            alignSelf: 'center',
            borderRadius: 60,
            borderWidth: 3,
            borderColor: '#549287',
          }} source={{ uri: userData.pfpurl }} />
          <Text style={styles.name}>{userData.name}</Text>
          <View style={styles.tagContainer}>
            <CourseTag type="Professional" name="Programming" />
            <CourseTag type="Vocational" name="Cooking" />
            <CourseTag type="Academic" name="Political Philosophy" />
            <CourseTag type="Vocational" name="Plumbing" />
            <CourseTag type="Academic" name="Differential Equations" />
            <CourseTag type="Professional" name="Fundamental Analysis and Trading Techniques" />
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
        <Modal animationType="slide" visible={modalVisible} onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
          <View style={styles.modalView}>
            <View style={styles.imageSelectContainer}>
              <TouchableOpacity style={styles.profilePicContainer} onPress={pickImage}>
                <Image style={styles.profilePic} source={{ uri: image }} />
              </TouchableOpacity>
              <View style={{ flexDirection: 'column', flex: 1 }}>
                <TextInput style={styles.textInput} placeholder="First Name" value={userData.firstname} placeholderTextColor='black' onChangeText={(firstname) => { }} />
                <TextInput style={styles.textInput} placeholder="Last Name" value={userData.lastname} placeholderTextColor='black' onChangeText={(lastname) => { }} />
                <View style={{ flexDirection: 'row' }}>
                  <Ionicons style={{ backgroundColor: maleBgColor, padding: 10, margin: 4, borderRadius: 5, }} name='male' size={48} color='#4A5568' onPress={() => {
                    setMaleBgColor('#898A8D')
                    setFemaleBgColor('#E5E5E5')
                    setTransBgColor('#E5E5E5')
                  }} />
                  <Ionicons style={{ backgroundColor: femaleBgColor, padding: 10, margin: 4, borderRadius: 5, }} name='female' size={48} color='#4A5568' onPress={() => {
                    setFemaleBgColor('#898A8D')
                    setMaleBgColor('#E5E5E5')
                    setTransBgColor('#E5E5E5')
                  }} />
                  <Ionicons style={{ backgroundColor: transBgColor, padding: 10, margin: 4, borderRadius: 5, }} name='transgender' size={48} color='#4A5568' onPress={() => {
                    setTransBgColor('#898A8D')
                    setFemaleBgColor('#E5E5E5')
                    setMaleBgColor('#E5E5E5')
                  }} />
                </View>
              </View>
            </View>
            <TextInput style={styles.textInput} placeholder="Email" value={userData.email} placeholderTextColor='black' onChangeText={(email) => { }} />
            <TextInput style={styles.textInput} placeholder="Phone" value={userData.phone} placeholderTextColor='black' onChangeText={(phone) => { }} />
            <TextInput style={{
              backgroundColor: '#E5E5E5',
              width: '98%',
              height: 80,
              borderRadius: 5,
              color: 'black',
              padding: 10,
              margin: 4
            }} placeholder="address" multiline={true} numberOfLines={4} value={userData.address} placeholderTextColor='black' onChangeText={(address) => { }} />
            <TextInput style={styles.textInput} placeholder="City" value={userData.city} placeholderTextColor='black' onChangeText={(city) => { }} />
            <TextInput style={styles.textInput} placeholder="State" value={userData.state} placeholderTextColor='black' onChangeText={(state) => { }} />
            <TextInput style={styles.textInput} placeholder="Pincode" value={userData.pincode} placeholderTextColor='black' onChangeText={(pincode) => { }} />
            <View style={styles.modalButtonContainer}>
              <Pressable
                style={styles.modalCloseButton}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={styles.modalButtonText}>Update</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
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
  },
  modalView: {
    flex: 1,
    width: '100%',
  },
  modalCard: {
    width: '100%',
  },
  textInput: {
    backgroundColor: '#E5E5E5',
    width: '98%',
    height: 50,
    borderRadius: 5,
    color: 'black',
    padding: 10,
    margin: 4
  },
  tagSelectContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#898A8D'
  },
  tagContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginLeft: 20,
    padding: 10
  },
  imageSelectContainer: {
    flexDirection: 'row',
    margin: 4,
    marginTop: 40
  },
  profilePic: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: '#549287',
  },
  profilePicContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 20
  },
  modalButtonContainer: {
    width: '100%',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 10
  },
  modalCloseButton: {
    backgroundColor: '#549287',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    margin: 10,
    width: '50%',
    height: 42,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center'
  },
});

export { Profile };

/*
<CourseTag type="Professional" name="Programming" />
            <CourseTag type="Vocational" name="Cooking" />
            <CourseTag type="Academic" name="Political Philosophy" />
            <CourseTag type="Vocational" name="Plumbing" />
            <CourseTag type="Academic" name="Differential Equations" />
            <CourseTag type="Professional" name="Fundamental Analysis and Trading Techniques" />*/