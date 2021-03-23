import React, { useState } from "react";
import { SafeAreaView, StyleSheet, ScrollView, TextInput, View, TouchableOpacity, Text } from "react-native";
import { Toolbar } from "../../components/Toolbar";
import { searchSkill } from '../../components/firebase';
import { SearchResultCard } from "../../components/SearchResultCard";
import { SearchResultBGCard } from "../../components/SearchResultBGCard";
import * as Locations from 'expo-location';
import * as Permissions from 'expo-permissions';

const Search = () => {
  const [search, setSearch] = useState('');
  const [location, setLocation] = useState(null);

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
    backgroundColor: 'rgba(184, 210, 208, 0.44)'
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