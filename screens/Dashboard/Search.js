import React, { useState } from "react";
import { SafeAreaView, StyleSheet, ScrollView, TextInput, View, TouchableOpacity, Text, Pressable } from "react-native";
import { Toolbar } from "../../components/Toolbar";
import { searchSkill } from '../../components/firebase';
import { SearchResultBGCard } from "../../components/SearchResultBGCard";
import { FlatList } from "react-native-gesture-handler";


const Search = () => {
  const [search, setSearch] = useState('');
  const [data, setData] = useState([]);
  const Item = ({ title }) => (
    <TouchableOpacity style={styles.tagContainer} onPress={() => {
      setSearch(title)
      fetchSearchData()
    }}>
      <Text>{title}</Text>
    </TouchableOpacity>
  );
  const tagData = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: 'Economics',
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      title: 'Cooking',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: 'Guitar',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: 'Programming',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: 'Software Development',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: 'Physics',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: 'Rafting',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: 'Finance',
    }
  ]

  const renderItem = ({ item }) => (
    <Item title={item.title} />
  );

  const searchResultList = data.map((item, index) => {
    return (
      <SearchResultBGCard courseTitle={data[index].name} courseCreator={data[index].creator_name} heroImageUrl={data[index].heroImageUrl}
        pfpurl={data[index].pfpurl} description={data[index].description} enrolled={data[index].enrolled} stars={data[index].rating}
        type={data[index].category_type} location={data[index].location} time={data[index].time} email={data[index].email}
      />
    );
  });

  const fetchSearchData = async () => {
    let snapshot = await searchSkill('skills', 'type', '==', search).get().then((snapshot) => {
      let arr = []
      if (snapshot.empty) {
        console.log('No matching documents.');
      }
      snapshot.forEach(doc => {
        arr.push(doc.data())
      });
      setData(arr)
      console.log(arr)
    })
  }
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.contentwrapper}>
          <TextInput style={styles.input} placeholder='Search' onChangeText={(search) => setSearch(search)} onSubmitEditing={fetchSearchData} />
          <FlatList
            data={tagData}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
          />

          <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 20 }}>
            {searchResultList}
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
    width: '96%',
    height: 46,
    marginVertical: 16,
    borderRadius: 5,
    color: 'black',
    padding: 10,
    alignSelf: 'center'
  },
  tagListContainer: {
    flexDirection: 'row'
  },
  tagContainer: {
    backgroundColor: '#C4C4C4',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginHorizontal: 6
  }
});

export { Search };