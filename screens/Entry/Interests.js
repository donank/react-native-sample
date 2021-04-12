import React, { useEffect, useState } from "react";
import { SafeAreaView, Image, TextInput, StyleSheet, View, Dimensions, Text } from "react-native";
import { fetchTags } from "../../components/firebase";
import { InterestCard } from "../../components/InterestCard";
import { InterestSubmitButton } from "../../components/InterestSubmitButton";

const Interests = () => {

  const [tags, setTags] = useState([]);

  useEffect(() => {
    getTags()
  }, []);

  const getTags = async () => {
    const snap = await fetchTags().then((snapshot) => {
      let arr = []
      if (snapshot.empty) {
        console.log('No matching documents.');
      }
      snapshot.forEach(doc => {
        arr.push(doc.data())
      });
      setTags(arr)
    })
  }

  const tagList = tags.map((item, index) => {
    return (
      <InterestCard key={index} name={tags[index].name} type={tags[index].category} />
    )
  })

  return (
    <SafeAreaView style={styles.container}>
      <Image style={styles.profilePic} source={require('../../assets/leo-tolstoy.jpg')} />
      <Text>Change Profile Picture</Text>
      <View style={styles.tagContainer}>
        {tagList}
      </View>
      <Text>Select atleast 5 Interests</Text>
      <InterestSubmitButton />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  },
  tagContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  profilePic: {
    width: 120,
    height: 120,
    alignSelf: 'center',
    borderRadius: 60,
    borderWidth: 3,
    borderColor: '#549287',
  },
});

export { Interests };