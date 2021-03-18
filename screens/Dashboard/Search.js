import React, { useState } from "react";
import { SafeAreaView, StyleSheet, ScrollView, TextInput, View } from "react-native";
import { Toolbar } from "../../components/Toolbar";
import { searchSkill } from '../../components/firebase';

const Search = () => {
  const [search, setSearch] = useState('')
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Toolbar />
        <View style={styles.contentwrapper}>
          <TextInput style={styles.input} placeholder='Search' onChangeText={(search) => setSearch(search) } onSubmitEditing={async() => {
            let snapshot = await searchSkill('skills', 'name', '==', search).get()
            if(snapshot.empty){
              console.log('No matching documents.');
            }
            snapshot.forEach(doc => {
              console.log(doc.data());
            });
          }}/>
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