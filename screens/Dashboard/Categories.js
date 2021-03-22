import React, { useEffect, useState } from "react";
import { SafeAreaView, Image, StyleSheet, Text, ScrollView, View } from "react-native";
import { CategoryCard } from "../../components/CategoryCard";
import { Toolbar } from "../../components/Toolbar";

const Categories = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Toolbar />
        <View style={styles.categoryWrapper}>
          <View style={styles.categoryTitleWrapper}>
            <Text style={styles.categoryTitle}>Vocational</Text>
          </View>
          <View style={styles.categoryItemsWrapper}>
            <CategoryCard />
            <CategoryCard />
          </View>
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
  categoryWrapper: {
    flex: 1,
    flexDirection: 'row',
  },
  categoryTitleWrapper: {
    backgroundColor: 'rgba(84, 146, 135, 0.65)',
    justifyContent: 'center',
    width: 88,
    height: 240,
    margin: 4
  },
  categoryTitle: {
    transform: [{ rotate: '270deg'}],
    color: 'black',
    ...Platform.select({
      ios: { fontFamily: 'Arial', },
      android: { fontFamily: 'Roboto' }
    }),
    fontWeight: '400',
    fontSize: 18
  },
  categoryItemsWrapper: {
    flex: 1,
    justifyContent: 'center',
    marginRight: 4
  }
});

export { Categories };