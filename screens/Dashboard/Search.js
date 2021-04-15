import React, { useState, useEffect } from "react";
import { SafeAreaView, StyleSheet, ScrollView, TextInput, View, TouchableOpacity, Text, Pressable, FlatList, ToastAndroid } from "react-native";
import { Toolbar } from "../../components/Toolbar";
import { searchSkill } from '../../components/firebase';
import { SearchResultBGCard } from "../../components/SearchResultBGCard";
import { Ionicons } from "@expo/vector-icons";
import { AdminCourseCard } from "../../components/AdminCourseCard";


const Search = () => {
  const [search, setSearch] = useState('');
  const [data, setData] = useState([]);
  const [academicData, setAcademicData] = useState([]);
  const [professionalData, setProfessionalData] = useState([]);
  const [vocationalData, setVocationalData] = useState([]);
  const [hobbyData, setHobbyData] = useState([]);
  const [searched, setSearched] = useState(false);
  const [noResult, setNoResult] = useState(false);

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
        <View style={styles.contentwrapper}>
          <View style={{ flexDirection: 'row', width: '98%', alignSelf: 'center' }}>
            <TextInput style={styles.input} placeholder='Search' onChangeText={(search) => setSearch(search)} onSubmitEditing={() => {
              fetchSearchData(search)
            }} />
            <Ionicons style={{ marginLeft: -34, alignSelf: 'center' }} name='funnel' size={24} color='#4A5568' onPress={() => {
              console.log("Filter Clicked")
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
  }
});

export { Search };