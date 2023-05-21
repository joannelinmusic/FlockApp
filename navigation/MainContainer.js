import * as React from 'react';
import {useState} from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

//Screen
import HomeScreen from './screen/HomeScreen';
import RequestScreen from './screen/RequestScreen';
import ProfileScreen from './screen/ProfileScreen';
import AuthScreen from './screen/AuthScreen';
import SignInScreen from './screen/SignInScreen';

//Screen Names
const homeName = 'Home';
const signinName = 'Sign in';
const requestName = 'Request';
const profileName = 'Profile';

const Tab = createBottomTabNavigator();

export default function MainContainer() {
  const [showMainContainer, setShowMainContainer] = useState(false);

  const handleWelcomeButtonClick = () => {
    setShowMainContainer(true);
  };
  return (
    <NavigationContainer>
    {showMainContainer ? (
      <Tab.Navigator
        initialRouteName={homeName}
        screenOptions={({route}) => ({
          tabBarIcon: ({focused, color, size}) => {
            let iconName;
            let rn = route.name;

            if (rn === homeName) {
              iconName = focused ? 'home' : 'home-outline'
            } else if (rn === signinName) {
              iconName = focused ? 'arrow-up' : 'arrow-up'
            } else if (rn === requestName) {
              iconName = focused ? 'add' : 'add-circle-outline'
            } else if (rn === profileName) {
              iconName = focused ? 'person' : 'person-circle-outline'
            }

            return <Ionicons name = {iconName} size = {size} color = {color}/>
          },
        })}>

        <Tab.Screen name = {homeName} component={HomeScreen}/>
        <Tab.Screen name = {signinName} component={SignInScreen}/>
        <Tab.Screen name = {requestName} component={RequestScreen}/>
        <Tab.Screen name = {profileName} component={ProfileScreen}/>

      </Tab.Navigator>
    ) : (
        <AuthScreen onButtonClick={handleWelcomeButtonClick} />
      )}
    </NavigationContainer>
  );
}

