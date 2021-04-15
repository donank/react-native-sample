import React, { useEffect, useState } from "react";

import { Alert, Modal, StyleSheet, Text, TouchableHighlight, View, SafeAreaView, Pressable, Image } from 'react-native';
import { TouchableOpacity } from "react-native-gesture-handler";
import { fetchSeeker, fetchTutor } from '../components/firebase';

const Messages = () => {

  const [modalVisible, setModalVisible] = useState(false);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    fetchData()
    console.log("Arr:", messages)

  }, []);

  const fetchData = async () => {
    await fetchSeeker('seekers', 'aankit@iitk.ac.in').then((doc) => {
      if (!doc.exists) {
        console.log('No matching documents.');
      }
      let arr = []
      doc.data().messages.forEach((item) => {
        console.log("Item:", item)

        fetchTutor(item).then((doc1) => {
          console.log(doc1.data())
          setMessages([...messages, doc1.data()]);
        });
      });
    });
  }

  const messageList = messages.map((item, index) => {
    return (
      <TouchableOpacity style={{
        borderBottomWidth: 1,
        padding: 10
      }} onPress={()=> {

      }}>
        <View style={{ flexDirection: 'row' }}>
          <Image style={{width: 40, height: 40, alignSelf: 'center', marginRight: 10, borderRadius: 16}} source={{uri: item.pfpurl}} />
          <Text>{item.name}</Text>
        </View>
      </TouchableOpacity>
    );
  })

  return (
    <SafeAreaView style={styles.container}>
      {messageList}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 80
  }
});


export { Messages };