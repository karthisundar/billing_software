import { View, Text } from 'react-native'
import React from 'react'
import { createDrawerNavigator} from '@react-navigation-drawer';
import { NavigationContainer } from '@react-navigation/native';

import Home from './Home';
import Signup from './Signup';
import Login from './Login';

export default function Navbar() {


    const Drawer = createDrawerNavigator();
  return (
    <NavigationContainer>
    <Drawer.Navigator initialRouteName="Home">
      <Drawer.Screen name="Home" component={Home} options={{ headerShown: false }} />
      <Drawer.Screen name="Signup" component={Signup} />
    </Drawer.Navigator>
  </NavigationContainer>
  )
}