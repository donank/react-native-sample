import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer"
import { History } from "../screens/History";
import { Settings } from "../screens/Settings";
import { BottomTabNavigator } from "./BottomTabNavigator";
import { Login } from "../screens/Entry/Login";

const Drawer = createDrawerNavigator();
const DashboardNavigator = ({route}) => {
    return (
        <Drawer.Navigator 
        drawerStyle={{ width: '55%', backgroundColor: '#E5E5E5', height: '40%', marginTop: '12%'}}
        overlayColor='transparent'
        drawerContentOptions={{
          activeTintColor: "#000000", inactiveTintColor: "#000000",
          activeBackgroundColor: 'transparent',
          labelStyle: {
            fontSize: 18,
            ...Platform.select({
              ios: { fontFamily: 'Arial', },
              android: { fontFamily: 'Roboto' }
            }),
            marginLeft: '10%'
          },
        }}>
            <Drawer.Screen name="Home" component={BottomTabNavigator}/>
            <Drawer.Screen name="History" component={History}/>
            <Drawer.Screen name="Settings" component={Settings}/>
            <Drawer.Screen name="Logout" component={Login}/>
        </Drawer.Navigator>
    );
}
export { DashboardNavigator };