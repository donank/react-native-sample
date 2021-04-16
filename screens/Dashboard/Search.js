import React, { useState, useEffect } from "react";
import { SafeAreaView, StyleSheet, ScrollView, TextInput, View, TouchableOpacity, Text, Pressable, FlatList, ToastAndroid, Modal, Picker, Switch } from "react-native";
import { searchSkill,fetchSkills } from '../../components/firebase';
import { SearchResultBGCard } from "../../components/SearchResultBGCard";
import { Ionicons } from "@expo/vector-icons";
import { AdminCourseCard } from "../../components/AdminCourseCard";
import MapView, { Marker } from 'react-native-maps';
import * as Linking from 'expo-linking';

const Search = () => {
  const [search, setSearch] = useState('');
  const [data, setData] = useState([]);
  const [academicData, setAcademicData] = useState([]);
  const [professionalData, setProfessionalData] = useState([]);
  const [vocationalData, setVocationalData] = useState([]);
  const [hobbyData, setHobbyData] = useState([]);
  const [searched, setSearched] = useState(false);
  const [noResult, setNoResult] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [location, setLocation] = useState(0);
  const [category, setCategory] = useState(0);
  const [isEnabled, setIsEnabled] = useState(false);

  const types = ["Local", "Global"];

  const typesMap = types.map((item, index) => {
    return (
      <Picker.Item key={index} label={item} value={index} />
    )
  });

  const categories = ["All", "Academic", "Professional", "Vocational", "Hobby"];

  const categoriesMap = categories.map((item, index) => {
    return (
      <Picker.Item key={index} label={item} value={index} />
    )
  });

  const Item = ({ title }) => (
    <TouchableOpacity style={styles.tagContainer} onPress={() => {
      fetchSearchData(title)
    }}>
      <Text style={{ color: 'white' }}>{title}</Text>
    </TouchableOpacity>
  );

  useEffect(() => {
    fetchCategorySearchData('Academic')
    fetchCategorySearchData('Professional')
    fetchCategorySearchData('Vocational')
    fetchCategorySearchData('Hobby')
  }, []);

  const tagData = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: 'Economics',
    },
    {
      id: '3ac6asdasda8afc-c605-48d3-a4f8-fbd91aa97f63',
      title: 'Cooking',
    },
    {
      id: '58asd694a0f-3da1-471f-bd96-145571easdaasd29d72',
      title: 'Guitar',
    },
    {
      id: '58dsasd694a0f-3da1-471f-bd96-145sd571e29d72',
      title: 'Programming',
    },
    {
      id: '586ads94a0f-3da1-471asdf-bd96-145571eads29d72',
      title: 'Software Development',
    },
    {
      id: '58a6ads94a0f-3da1-471f-bd96-145571dase29d72',
      title: 'Physics',
    },
    {
      id: '58694a0f-3da1-471asdf-bd96-145571e29asdd72',
      title: 'Rafting',
    },
    {
      id: '58q694aasdf-3da1-471f-bd96-145571e29d72',
      title: 'Finance',
    }
  ]

  const renderItem = ({ item }) => (
    <Item title={item.title} />
  );

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

  const searchResultList = data.map((item, index) => {
    return (
      <SearchResultBGCard key={index} courseTitle={item.name} courseCreator={item.creator_name} heroImageUrl={item.heroImageUrl}
        pfpurl={item.pfpurl} description={item.description} enrolled={item.enrolled} stars={item.rating}
        type={item.category_type} location={item.location} time={item.time} email={item.email} coordinates={item.coordinates}
      />
    );
  });

  const fetchSearchData = async (title) => {
    let snapshot = await searchSkill('skills', 'type', '==', title).get().then((snapshot) => {
      let arr = []
      if (snapshot.empty) {
        console.log('No matching documents.');
        setNoResult(!noResult);
        ToastAndroid.show('No Result', ToastAndroid.SHORT)
      }
      snapshot.forEach(doc => {
        arr.push(doc.data())
      });
      setNoResult(!noResult);
      setSearched(true)
      setData(arr)
    })
  }

  const fetchAllSearchData = async (location) => {
    if(location == 0){
      let snapshot = await searchSkill('skills', 'gmaploc', '==', 'Kanpur, Uttar Pradesh, India').get().then((snapshot) => {
        let arr = []
        if (snapshot.empty) {
          console.log('No matching documents.');
          setNoResult(!noResult);
          ToastAndroid.show('No Result', ToastAndroid.SHORT)
        }
        snapshot.forEach(doc => {
          arr.push(doc.data())
        });
        setNoResult(!noResult);
        setSearched(true)
        setData(arr)
      })
    }else{
      let snapshot = await fetchSkills().then((snapshot) => {
        let arr = []
        if (snapshot.empty) {
          console.log('No matching documents.');
          setNoResult(!noResult);
          ToastAndroid.show('No Result', ToastAndroid.SHORT)
        }
        snapshot.forEach(doc => {
          arr.push(doc.data())
        });
        setNoResult(!noResult);
        setSearched(true)
        setData(arr)
      })
    }
  }

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

  const markerList = data.map((item, index) => {
    return (
      <Marker key={index} style={styles.map} title="Marker"
      coordinate={{ latitude: item.coordinates.U, longitude: item.coordinates.k }}
    />
    );
  })

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.contentwrapper}>
          <View style={{ flexDirection: 'row', width: '98%', alignSelf: 'center' }}>
            <TextInput style={styles.input} placeholder='Search' onChangeText={(search) => setSearch(search)} onSubmitEditing={() => {
              search == '' ? fetchAllSearchData(location) : fetchSearchData(search)
            }} />
            <Ionicons style={{ marginLeft: -34, alignSelf: 'center' }} name='funnel' size={24} color='#4A5568' onPress={() => {
              setModalVisible(!modalVisible);
            }} />
          </View>
          <FlatList
            data={tagData}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
          />
          {searched ? (
            <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 20 }}>
              {location == 0 && searched ? (
              <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'flex-end', marginRight: 10}}>
                <Text style={{ fontSize: 16, alignSelf: 'center' }}>Show Map</Text>
                <View style={{  height: 40, alignItems: 'center', justifyContent: 'center' }}>
                  <Switch
                    onValueChange={() => {
                      setIsEnabled(previousState => !previousState)
                    }}
                    value={isEnabled}
                  />
                </View>
              </View>
            ) : (
              <>
              </>
            )}
              {isEnabled && data != [] ? (
                <MapView style={styles.map}
                  onPress={() => {
                    console.log("Map Clicked", data[0].coordinates.U)
                    let lat = data[0].coordinates.U
                    let lng = data[0].coordinates.k
                    const scheme = Platform.select({ ios: 'maps:0,0?q=', android: 'geo:0,0?q=' });
                    const latLng = `${lat},${lng}`;
                    const label = 'Custom Label';
                    const url = Platform.select({
                      ios: `${scheme}${label}@${latLng}`,
                      android: `${scheme}${latLng}(${label})`
                    });
                    Linking.openURL(url);
                  }}
                  initialRegion={{
                    latitude: data[0].coordinates.U,
                    longitude: data[0].coordinates.k,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                  }}>
                  <Marker style={styles.map} title="Marker"
                    coordinate={{ latitude: 26.5118848, longitude: 80.2325552 }}
                    image={{uri: 'https://icons.veryicon.com/png/128/transport/map-1/map-pin-user-fill-1.png'}}
                  />
                  {markerList}
                </MapView>
              ) : (
                <></>
              )}
              {searchResultList}
            </View>
            /*
              noResult ? (
                <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 20 }}>
                <Text>Sorry! No result found.</Text>
              </View>
              ): (
                <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 20 }}>
                {searchResultList}
              </View>
              )*/
          ) : (
            <View>
              <View style={{ backgroundColor: '#4A5568', padding: 10, marginTop: 10 }}><Text style={{ marginLeft: 10, color: 'white' }}>Academic</Text></View>
              <FlatList data={academicData} horizontal={true} renderItem={renderItem2} keyExtractor={item => item.id} />
              <View style={{ backgroundColor: '#4A5568', padding: 10, marginTop: 10 }}><Text style={{ marginLeft: 10, color: 'white' }}>Professional</Text></View>
              <FlatList data={professionalData} horizontal={true} renderItem={renderItem2} keyExtractor={item => item.id} />
              <View style={{ backgroundColor: '#4A5568', padding: 10, marginTop: 10 }}><Text style={{ marginLeft: 10, color: 'white' }}>Vocational</Text></View>
              <FlatList data={vocationalData} horizontal={true} renderItem={renderItem2} keyExtractor={item => item.id} />
              <View style={{ backgroundColor: '#4A5568', padding: 10, marginTop: 10 }}><Text style={{ marginLeft: 10, color: 'white' }}>Hobby</Text></View>
              <FlatList data={hobbyData} horizontal={true} renderItem={renderItem2} keyExtractor={item => item.id} />
            </View>
          )}
          <View>
          </View>
        </View>
      </ScrollView>
      <Modal animationType="slide" transparent={true} visible={modalVisible} onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}>
        <View style={styles.modalView}>
          <View style={styles.modalCard}>
            <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-around' }}>
              <Text style={{ fontSize: 16, alignSelf: 'center' }}>Location</Text>
              <Picker
                selectedValue={location}
                style={styles.pickerStyle}
                onValueChange={(itemValue, itemIndex) => setLocation(itemValue)}>
                {typesMap}
              </Picker>
            </View>
            <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-around' }}>
              <Text style={{ fontSize: 16, alignSelf: 'center' }}>Category</Text>
              <Picker
                selectedValue={category}
                style={styles.pickerStyle}
                onValueChange={(itemValue, itemIndex) => setCategory(itemValue)}>
                {categoriesMap}
              </Picker>
            </View>
            
            <View style={styles.modalButtonContainer}>
              <Pressable
                style={styles.modalCloseButton}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={styles.modalButtonText}>Close</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(184, 210, 208, 0.44)'
  },
  contentwrapper: {
    marginTop: 40,
    flexDirection: 'column'
  },
  input: {
    backgroundColor: '#E5E5E5',
    width: '100%',
    height: 46,
    marginVertical: 16,
    borderRadius: 5,
    color: 'black',
    padding: 10,
    alignSelf: 'center',
  },
  tagListContainer: {
    flexDirection: 'row'
  },
  tagContainer: {
    backgroundColor: '#4A5568',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginHorizontal: 6
  },
  modalView: {
    flex: 1,
    position: "absolute",
    width: '100%',
    bottom: 0,
  },
  modalCard: {
    padding: 10,
    alignSelf: 'center',
    width: '100%',
    alignItems: "center",
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  modalButtonContainer: {
    flexDirection: 'row'
  },
  modalCloseButton: {
    backgroundColor: '#E28585',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    margin: 10,
    width: '50%',
    height: 42,
    alignItems: 'center',
    justifyContent: 'center'
  },
  modalSaveButton: {
    backgroundColor: '#549287',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    margin: 10,
    width: '50%',
    height: 42,
    alignItems: 'center',
    justifyContent: 'center'
  },
  modalButtonText: {
    fontFamily: 'Roboto_400Regular',
    fontSize: 16,
  },
  modalTextInput: {
    backgroundColor: '#E5E5E5',
    width: '100%',
    color: 'black',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'black',
    fontFamily: 'Roboto_400Regular',
    fontSize: 16
  },
  pickerStyle: {
    height: 40,
    width: '40%',
    color: 'black'
  },
  map: {
    width: '90%',
    height: 200,
    alignSelf: 'center',
    marginBottom: 70,
    marginTop: 20
  }
});

export { Search };