import React from "react";
import { Dimensions } from "react-native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from "@expo/vector-icons";
import { HomeNavigator } from "./TrendingNavigator/HomeNavigator";
import { SearchNavigator } from "./TrendingNavigator/SearchNavigator";
import { CategoriesNavigator } from "./TrendingNavigator/CategoriesNavigator";
import { ProfileNavigator } from "./TrendingNavigator/ProfileNavigator";
import { Trending } from "../screens/Trending";
import { TrendingPageNavigator } from "./TrendingNavigator/TrendingPageNavigator";

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
    return (
      <Tab.Navigator screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused
              ? 'home'
              : 'home-outline';
          } else if (route.name === 'Search') {
            iconName = focused ? 'search' : 'search-outline';
          } else if (route.name === 'Trending') {
            iconName = focused ? 'md-trending-up-outline' : 'md-trending-up-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person-circle' : 'person-circle-outline';
          } 
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: '#549287',
        inactiveTintColor: '#4A5568',
        style: { height: Dimensions.get('window').height/12, padding: 10, elevation: 0, borderTopWidth: 1}
      }}
      style={{
          backgroundColor: 'green'
      }}>
        <Tab.Screen name="Home" component={HomeNavigator}/>
        <Tab.Screen name="Search" component={SearchNavigator} />
        <Tab.Screen name="Trending" component={TrendingPageNavigator} />
        <Tab.Screen name="Profile" component={ProfileNavigator} />
      </Tab.Navigator>
    );
  }

export {BottomTabNavigator}