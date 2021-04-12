import React, { useState } from "react";
import { SafeAreaView, StyleSheet, ScrollView, TextInput, View, TouchableOpacity, Text } from "react-native";
import { Toolbar } from "../../components/Toolbar";
import { searchSkill } from '../../components/firebase';
import { SearchResultBGCard } from "../../components/SearchResultBGCard";

const Search = () => {
  const [search, setSearch] = useState('');
  const [data, setData] = useState([]);

  const searchResultList = data.map((item, index) => {
    return (
      <SearchResultBGCard courseTitle={data[index].name} courseCreator={data[index].creator_name} heroImageUrl={data[index].heroImageUrl} 
      pfpurl={data[index].pfpurl} description={data[index].description} enrolled={data[index].enrolled} stars={data[index].rating}
      type={data[index].category_type} location={data[index].location} time={data[index].time} email={data[index].email}
      />
    );
  });

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.contentwrapper}>
          <TextInput style={styles.input} placeholder='Search' onChangeText={(search) => setSearch(search)} onSubmitEditing={async () => {
            let snapshot = await searchSkill('skills', 'type', '==', search).get().then((snapshot)=>{
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
            
          }} />
          {searchResultList}
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
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  input: {
    backgroundColor: '#E5E5E5',
    width: '90%',
    height: 46,
    marginVertical: 16,
    borderRadius: 5,
    color: 'black',
    padding: 10,
  }
});

export { Search };