import React, { useEffect, useState } from "react";
import { SafeAreaView, Image, StyleSheet, Text, View, ScrollView, BackHandler, Modal, TextInput, Pressable } from "react-native";
import { fetchTrendingCourses, fetchLocalTrendingCourses } from "../components/firebase";
import { TrendingCourse } from "../components/TrendingCourse";
import { Ionicons } from "@expo/vector-icons";

const Trending = ({ navigation }) => {

  const [trendingCourses, setTrendingCoruses] = useState([])
  const [modalVisible, setModalVisible] = useState(false);
  const [clicked, setClicked] = useState(true)
  useEffect(() => {
    /*navigation.dangerouslyGetParent().dangerouslyGetParent().setOptions({
      tabBarVisible: false
    });*/
    setClicked(!clicked)
    getLocalTrends()
  }, [])

  const getTrends = async () => {
    const snap = await fetchTrendingCourses('skills').get().then((snapshot) => {
      let arr = []
      if (snapshot.empty) {
        console.log('No matching documents.');
      }
      snapshot.forEach(doc => {
        arr.push(doc.data())
      });
      setTrendingCoruses(arr)
    })
  }

  const getLocalTrends = async () => {
    const snap = await fetchLocalTrendingCourses('Kanpur, Uttar Pradesh, India').then((snapshot) => {
      let arr = []
      if (snapshot.empty) {
        console.log('No matching documents.');
      }
      snapshot.forEach(doc => {
        arr.push(doc.data())
      });
      setTrendingCoruses(arr)
    })
  }

  const trendingCourseList = trendingCourses.map((item, index) => {
    return (
      <TrendingCourse key={index}
        name={trendingCourses[index].creator_name} title={trendingCourses[index].name}
        description={trendingCourses[index].description}
        enrolled={trendingCourses[index].enrolled} stars={trendingCourses[index].rating} type={trendingCourses[index].category_type}
        imageurl={trendingCourses[index].heroImageUrl}
        pfpurl={trendingCourses[index].pfpurl}
        location={trendingCourses[index].location}
        time={trendingCourses[index].time}
        email={trendingCourses[index].email}
        coordinates={trendingCourses[index].coordinates} />
    )
  })

  return (
    <SafeAreaView style={styles.container}>
      <Ionicons style={{ position: 'absolute', right: 20, top: 60, elevation: 10 }} name='funnel' size={24} color='#4A5568' onPress={() => {
        console.log("filter clicked", clicked)
        clicked ? getLocalTrends() : getTrends()
        setClicked(!clicked)

      }} />
      <ScrollView style={{ marginTop: 80 }}>
        {clicked ? (
          <Text>
            Showing Global Trends
          </Text>
        ) : (
          <Text>
            Showing Local Trends
          </Text>
        )}
        {trendingCourseList}
      </ScrollView>
      <Modal animationType="slide" transparent={true} visible={modalVisible} onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}>
        <View style={styles.modalView}>
          <View style={styles.modalCard}>


            <View style={styles.modalButtonContainer}>
              <Pressable
                style={styles.modalCloseButton}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={styles.modalButtonText}>Close</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  modalView: {
    flex: 1,
    position: "absolute",
    width: '100%',
    bottom: 0,
  },
  modalCard: {
    alignSelf: 'center',
    width: '100%',
    alignItems: "center",
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  modalButtonContainer: {
    flexDirection: 'row'
  },
  modalCloseButton: {
    backgroundColor: '#E28585',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    margin: 10,
    width: '50%',
    height: 42,
    alignItems: 'center',
    justifyContent: 'center'
  },
  modalSaveButton: {
    backgroundColor: '#549287',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    margin: 10,
    width: '50%',
    height: 42,
    alignItems: 'center',
    justifyContent: 'center'
  },
  modalButtonText: {
    fontFamily: 'Roboto_400Regular',
    fontSize: 16,
  },
  modalTextInput: {
    backgroundColor: '#E5E5E5',
    width: '100%',
    color: 'black',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'black',
    fontFamily: 'Roboto_400Regular',
    fontSize: 16
  },
});

export { Trending };