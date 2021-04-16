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
        padding: 10,
        marginTop: 10
      }} onPress={()=> {

      }}>
        <View style={{ flexDirection: 'row', }}>
          <Image style={{width: 48, height: 48, alignSelf: 'center', marginRight: 10, borderRadius: 30}} source={{uri: item.pfpurl}} />
          <View style={{flex: 1}}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text style={{fontSize: 16}}>{item.name}</Text>
          <Text style={{color: '#8E8A8A'}}>6:40 am</Text>
          </View>
          <Text style={{color: '#8E8A8A'}}>Thank you</Text>
          <View style={{borderWidth: 0.2, marginTop: 14, borderColor: '#C5C5C5'}}></View>
          </View>
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