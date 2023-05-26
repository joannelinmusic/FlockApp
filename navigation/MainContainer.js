import * as React from 'react';
import {useState} from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { UserProvider } from './screen/UserProvider';
import OtherProfileScreen from './screen/OtherProfileScreen'; 
import MapScreen from './screen/MapScreen'; 
import { ChakraProvider } from '@chakra-ui/react'



//Screen
import HomeScreen from './screen/HomeScreen';
import RequestScreen from './screen/RequestScreen';
import ProfileScreen from './screen/ProfileScreen';
import AuthScreen from './screen/AuthScreen';
import SignInScreen from './screen/SignInScreen';
import GoSomewhere from './screen/GoSomewhere.js';

//Screen Names
const homeName = 'Home';
const signUpName = 'Sign Up';
const requestName = 'Request';
const profileName = 'Profile';

const Tab = createBottomTabNavigator();

export default function MainContainer() {
  const [showMainContainer, setShowMainContainer] = useState(false);

  const handleWelcomeButtonClick = () => {
    setShowMainContainer(true);
  };
  return (
    
    <UserProvider>
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
            } else if (rn === signUpName) {
              iconName = focused ? 'arrow-up' : 'arrow-up'
            } else if (rn === requestName) {
              iconName = focused ? 'add' : 'add-circle-outline'
            } else if (rn === profileName) {
              iconName = focused ? 'person' : 'person-circle-outline'
            } else if (rn === 'Other Profile') {
              iconName = focused ? 'person' : 'person-circle-outline';
            } else if (rn === 'Map') {
              iconName = focused ? 'map' : 'map-outline';
            } else if (rn === 'Go Somewhere') {
              iconName = focused ? 'arrow-up' : 'arrow-up';
            }

            return <Ionicons name = {iconName} size = {size} color = {color}/>
          },
        })}>

        <Tab.Screen name = {homeName} component={HomeScreen}/>
        {/* <Tab.Screen name = {signUpName} component={SignInScreen}/> */}
        <Tab.Screen name = {requestName} component={RequestScreen}/>
        <Tab.Screen name = {profileName} component={ProfileScreen}/>
        {/* <Tab.Screen name = "Other Profile" component={OtherProfileScreen} /> */}
        {/* <Tab.Screen name = "Map" component={MapScreen} /> */}
        <Tab.Screen name = 'Go Somewhere' component={GoSomewhere}/>



      </Tab.Navigator>
    ) : (
        <AuthScreen onButtonClick={handleWelcomeButtonClick} />
      )}
    </NavigationContainer>
    </UserProvider>

  );
}

