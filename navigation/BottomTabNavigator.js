import React from "react";
import { Dimensions } from "react-native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Categories } from '../screens/Dashboard/Categories';
import { Dashboard } from '../screens/Dashboard/Dashboard';
import { Profile } from '../screens/Dashboard/Profile';
import { Search } from '../screens/Dashboard/Search';
import { Ionicons } from "@expo/vector-icons";

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
          } else if (route.name === 'Categories') {
            iconName = focused ? 'grid' : 'grid-outline';
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
        <Tab.Screen name="Home" component={Dashboard}/>
        <Tab.Screen name="Search" component={Search} />
        <Tab.Screen name="Categories" component={Categories} />
        <Tab.Screen name="Profile" component={Profile} />
      </Tab.Navigator>
    );
  }

export {BottomTabNavigator}