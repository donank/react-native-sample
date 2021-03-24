import React, { useEffect, useState } from "react";
import { SafeAreaView, Image, StyleSheet, Text, ScrollView, View } from "react-native";
import { CategoryCard } from "../../components/CategoryCard";
import { Toolbar } from "../../components/Toolbar";
import AppLoading from 'expo-app-loading';
import {
  useFonts,
  Roboto_400Regular,
} from '@expo-google-fonts/roboto';

const Categories = () => {
  let [fontsLoaded] = useFonts({
    Roboto_400Regular,
  })
  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <Toolbar />
          <View>
            <View style={styles.categoryWrapper}>
              <View style={styles.categoryTitleWrapper}>
                <Text style={styles.categoryTitle}>Vocational</Text>
              </View>
              <View style={styles.categoryItemsWrapper}>
                <ScrollView>
                <CategoryCard name="Guido van Rossum" title="Learn Python Fundamentals"
          description="Learn about the fundamentals of python from industry experts and pioneers who have established their name in the domain of python programming and software development."
          enrolled={245} stars={3} type="Professional"
          imageurl='https://www.impactplus.com/hs-fs/hubfs/Inbound%20Success%20Podcast/Blog%20Images/web-developer-characteristics.jpg?length=980&name=web-developer-characteristics.jpg'
          pfpurl='https://cms.qz.com/wp-content/uploads/2019/05/Guido-van-Rossum-e1558635088256.jpg?quality=75&strip=all&w=1600&h=900&crop=1' 
          location='Amsterdam, Netherlands'
          time='5:00 pm - 7:00 pm CET'/>
          
                  <CategoryCard name="Guido van Rossum" title="Learn Python Fundamentals"
          description="Learn about the fundamentals of python from industry experts and pioneers who have established their name in the domain of python programming and software development."
          enrolled={245} stars={3} type="Professional"
          imageurl='https://www.impactplus.com/hs-fs/hubfs/Inbound%20Success%20Podcast/Blog%20Images/web-developer-characteristics.jpg?length=980&name=web-developer-characteristics.jpg'
          pfpurl='https://cms.qz.com/wp-content/uploads/2019/05/Guido-van-Rossum-e1558635088256.jpg?quality=75&strip=all&w=1600&h=900&crop=1' 
          location='Amsterdam, Netherlands'
          time='5:00 pm - 7:00 pm CET'/>
                </ScrollView>
              </View>
            </View>
          </View>
          <View>
            <View style={styles.categoryWrapper}>
              <View style={styles.categoryTitleWrapper}>
                <Text style={styles.categoryTitle}>Professional</Text>
              </View>
              <View style={styles.categoryItemsWrapper}>
                <ScrollView>
                <CategoryCard name="Guido van Rossum" title="Learn Python Fundamentals"
          description="Learn about the fundamentals of python from industry experts and pioneers who have established their name in the domain of python programming and software development."
          enrolled={245} stars={3} type="Professional"
          imageurl='https://www.impactplus.com/hs-fs/hubfs/Inbound%20Success%20Podcast/Blog%20Images/web-developer-characteristics.jpg?length=980&name=web-developer-characteristics.jpg'
          pfpurl='https://cms.qz.com/wp-content/uploads/2019/05/Guido-van-Rossum-e1558635088256.jpg?quality=75&strip=all&w=1600&h=900&crop=1' 
          location='Amsterdam, Netherlands'
          time='5:00 pm - 7:00 pm CET'/>
          
                  <CategoryCard name="Guido van Rossum" title="Learn Python Fundamentals"
          description="Learn about the fundamentals of python from industry experts and pioneers who have established their name in the domain of python programming and software development."
          enrolled={245} stars={3} type="Professional"
          imageurl='https://www.impactplus.com/hs-fs/hubfs/Inbound%20Success%20Podcast/Blog%20Images/web-developer-characteristics.jpg?length=980&name=web-developer-characteristics.jpg'
          pfpurl='https://cms.qz.com/wp-content/uploads/2019/05/Guido-van-Rossum-e1558635088256.jpg?quality=75&strip=all&w=1600&h=900&crop=1' 
          location='Amsterdam, Netherlands'
          time='5:00 pm - 7:00 pm CET'/>
                </ScrollView>
              </View>
            </View>
          </View>
          <View>
            <View style={styles.categoryWrapper}>
              <View style={styles.categoryTitleWrapper}>
                <Text style={styles.categoryTitle}>Academic</Text>
              </View>
              <View style={styles.categoryItemsWrapper}>
                <ScrollView>
                  <CategoryCard name="Guido van Rossum" title="Learn Python Fundamentals"
          description="Learn about the fundamentals of python from industry experts and pioneers who have established their name in the domain of python programming and software development."
          enrolled={245} stars={3} type="Professional"
          imageurl='https://www.impactplus.com/hs-fs/hubfs/Inbound%20Success%20Podcast/Blog%20Images/web-developer-characteristics.jpg?length=980&name=web-developer-characteristics.jpg'
          pfpurl='https://cms.qz.com/wp-content/uploads/2019/05/Guido-van-Rossum-e1558635088256.jpg?quality=75&strip=all&w=1600&h=900&crop=1' 
          location='Amsterdam, Netherlands'
          time='5:00 pm - 7:00 pm CET'/>

                  <CategoryCard name="Guido van Rossum" title="Learn Python Fundamentals"
          description="Learn about the fundamentals of python from industry experts and pioneers who have established their name in the domain of python programming and software development."
          enrolled={245} stars={3} type="Professional"
          imageurl='https://www.impactplus.com/hs-fs/hubfs/Inbound%20Success%20Podcast/Blog%20Images/web-developer-characteristics.jpg?length=980&name=web-developer-characteristics.jpg'
          pfpurl='https://cms.qz.com/wp-content/uploads/2019/05/Guido-van-Rossum-e1558635088256.jpg?quality=75&strip=all&w=1600&h=900&crop=1' 
          location='Amsterdam, Netherlands'
          time='5:00 pm - 7:00 pm CET'/>
                </ScrollView>
              </View>
            </View>
          </View>

        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(184, 210, 208, 0.44)',
  },
  categoryWrapper: {
    flex: 1,
    flexDirection: 'row',
  },
  categoryTitleWrapper: {
    backgroundColor: 'rgba(84, 146, 135, 0.65)',
    justifyContent: 'center',
    width: 60,
    height: 204,
    margin: 4,
    alignItems: 'center',
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 2
  },
  categoryTitle: {
    transform: [{ rotate: '270deg' }],
    color: 'black',
    ...Platform.select({
      ios: { fontFamily: 'Arial', },
      android: { fontFamily: 'Roboto_400Regular' }
    }),
    fontWeight: '100',
    fontSize: 20,
    width: 204,
    textAlign: 'center'
  },
  categoryItemsWrapper: {
    flex: 1,
    justifyContent: 'space-between',
    marginRight: 4,
    height: 240,
    marginTop: 4
  }
});

export { Categories };