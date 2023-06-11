import * as React from 'react';
import {useState} from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { UserProvider } from './screen/UserProvider';
import OtherProfileScreen from './screen/OtherProfileScreen'; 
import MapScreen from './screen/MapScreen'; 
import {useAuth0, Auth0Provider} from 'react-native-auth0';
import Geocoder from 'react-native-geocoding';


//Screen
import HomeScreen from './screen/HomeScreen';
import RequestScreen from './screen/RequestScreen';
import ProfileScreen from './screen/ProfileScreen';
import AuthScreen from './screen/AuthScreen';
import SignInScreen from './screen/SignInScreen';
import MatchingScreen from './screen/MatchingScreen'


//Screen Names
const homeName = 'Home';
const signUpName = 'Sign Up';
const requestName = 'Request';
const profileName = 'Profile';
const matchScreen = 'MatchScreen'

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const MapStack = createStackNavigator();


function MapStackNavigator() {
  return (
    <MapStack.Navigator>
      <MapStack.Screen name="Map" component={MapScreen} />
      <MapStack.Screen name="MatchScreen" component={MatchingScreen} />
    </MapStack.Navigator>
  );
}

function AuthStackNavigator({ setShowMainContainer }) {
  const handleWelcomeButtonClick = () => {
    setShowMainContainer(true);
  };

  return (
    <Stack.Navigator initialRouteName="Auth">
      <Stack.Screen name="Auth">
        {(props) => <AuthScreen {...props} onButtonClick={handleWelcomeButtonClick} />}
      </Stack.Screen>
      <Stack.Screen name="SignIn">
  {(props) => <SignInScreen {...props} setShowMainContainer={setShowMainContainer} />}
</Stack.Screen>
    </Stack.Navigator>
  );
}



export default function MainContainer() {
  const [showMainContainer, setShowMainContainer] = useState(false);

  const handleWelcomeButtonClick = () => {
    setShowMainContainer(true);
  };
  return (
    <Auth0Provider
    domain="YOUR_AUTH0_DOMAIN"
    clientId="YOUR_AUTH0_CLIENT_ID"
  
    >
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
            } else if (rn === 'MatchScreen') {
              iconName = focused ? 'map' : 'map-outline';
            } 

            return <Ionicons name = {iconName} size = {size} color = {color}/>
          },
        })}>

        <Tab.Screen name = {homeName} component={HomeScreen}/>
        <Tab.Screen name = {signUpName} component={SignInScreen}/> 
        { /* <Tab.Screen name = {requestName} component={RequestScreen}/> */}
        <Tab.Screen name = {profileName} component={ProfileScreen}/>
        <Tab.Screen name = {matchScreen} component={MatchingScreen}/>
        {/* <Tab.Screen name = "Other Profile" component={OtherProfileScreen} /> */}
        <Tab.Screen name="Map" component={MapStackNavigator} />
        </Tab.Navigator>
          ) : (
            <AuthStackNavigator setShowMainContainer={setShowMainContainer} />
          )}
        </NavigationContainer>
      </UserProvider>
    </Auth0Provider>
  );
}




