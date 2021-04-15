import React, { useEffect, useState } from "react";
import { SafeAreaView, Image, TextInput, StyleSheet, View, Dimensions, Text, Pressable } from "react-native";
import { fetchTags } from "../../components/firebase";
import { InterestCard } from "../../components/InterestCard";
import { InterestSubmitButton } from "../../components/InterestSubmitButton";
import * as ImagePicker from 'expo-image-picker';
import { TouchableOpacity } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import { InterestBackButton } from "../../components/InterestBackButton";

const Interests = () => {

  const [tags, setTags] = useState([]);
  const [maleBgColor, setMaleBgColor] = useState('#E5E5E5');
  const [femaleBgColor, setFemaleBgColor] = useState('#E5E5E5');
  const [transBgColor, setTransBgColor] = useState('#E5E5E5')
  const [image, setImage] = useState('https://i.imgur.com/6KzcJJf.png');

  useEffect(() => {

    getTags()
  }, []);

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
      <View style={styles.imageSelectContainer}>
        <TouchableOpacity style={styles.profilePicContainer} onPress={pickImage}>
          <Image style={styles.profilePic} source={{ uri: image }} />
        </TouchableOpacity>
        <View style={{ flexDirection: 'column', flex: 1 }}>
          <TextInput style={styles.textInput} placeholder="First Name" placeholderTextColor='black' onChangeText={(name) => { }} />
          <TextInput style={styles.textInput} placeholder="Last Name" placeholderTextColor='black' onChangeText={(name) => { }} />
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
      <View style={styles.tagSelectContainer}>
        <Text>Select atleast 5 Interests</Text>
        <View style={styles.tagContainer}>
          {tagList}
        </View>
      </View>
      <View style={{flexDirection: 'row', position: 'absolute', bottom: 20, alignSelf: 'center', width: '100%', justifyContent: 'space-around'}}>
        <InterestBackButton />
        <InterestSubmitButton />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    marginTop: 80
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
  }
});

export { Interests };