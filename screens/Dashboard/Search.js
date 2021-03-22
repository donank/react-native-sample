import React, { useState } from "react";
import { SafeAreaView, StyleSheet, ScrollView, TextInput, View, TouchableOpacity, Text } from "react-native";
import { Toolbar } from "../../components/Toolbar";
import { searchSkill } from '../../components/firebase';
import { SearchResultCard } from "../../components/SearchResultCard";
import { SearchResultBGCard } from "../../components/SearchResultBGCard";

const DATA = [
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    title: "First Item",
  },
  {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
    title: "Second Item",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d72",
    title: "Third Item",
  },
];



const Search = () => {
  const [search, setSearch] = useState('')

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Toolbar />
        <View style={styles.contentwrapper}>
          <TextInput style={styles.input} placeholder='Search' onChangeText={(search) => setSearch(search)} onSubmitEditing={async () => {
            let snapshot = await searchSkill('skills', 'name', '==', search).get()
            if (snapshot.empty) {
              console.log('No matching documents.');
            }
            snapshot.forEach(doc => {
              console.log(doc.data());
            });
          }} />

          <SearchResultCard/>
          <SearchResultBGCard/>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentwrapper: {
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