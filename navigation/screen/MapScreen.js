import { React, useState, useEffect} from 'react';
import { View, TextInput, StyleSheet, FlatList, TouchableOpacity, navigation, Text, Button } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { Match } from './MatchingScreen'; 
import Icon from 'react-native-vector-icons/Ionicons';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';




Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

const { GOOGLE_API_KEY } = Constants.manifest.extra;

const MapScreen = ({navigation}) => {
    const [location, setLocation] = useState(null);
    const ONE_HOUR_IN_MILLISECONDS = 60 * 60 * 1000;
    const [currentLocation, setCurrentLocation] = useState('');
  const [destinationLocation, setDestinationLocation] = useState('');
  const [region, setRegion] = useState(null);
  const [recentSearches, setRecentSearches] = useState([]);
    
  if (GOOGLE_API_KEY) {
    Location.setGoogleApiKey(GOOGLE_API_KEY);
  } else {
    console.warn('Google API key is not provided!');
  }  

    useEffect(() => {
      (async () => {
        const { status } = await Notifications.requestPermissionsAsync();
        if (status !== 'granted') {
          console.error('Permission to access location was denied');
          return;
        }
  
        let location = await Location.getCurrentPositionAsync({});
      setLocation(location);

      setRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.00922,  // Zoom level
        longitudeDelta: 0.00421, // Zoom level
      });
  
      let address = await Location.reverseGeocodeAsync({ latitude: location.coords.latitude, longitude: location.coords.longitude });
      // Set the current location to the full address
      setCurrentLocation(address[0].name + ', ' + address[0].city + ', ' + address[0].region + ', ' + address[0].country);

        // Send a notification when the location is fetched
      const notification = {
        title: 'Map Screen',
        body: 'Your location has been updated!',
      };
      await Notifications.scheduleNotificationAsync({
        content: notification,
        trigger: null,
        seconds: ONE_HOUR_IN_MILLISECONDS / 1000, 
        repeats: true 
      });
      })();
    }, []);

    const submitLocations = async () => {
      const destinationCoords = await Location.geocodeAsync(destinationLocation);
      console.log(destinationCoords);
    
      setRecentSearches(prev => {
        let updatedSearches = [destinationLocation, ...prev];
        if (updatedSearches.length > 3) {
          updatedSearches = updatedSearches.slice(0, 3); // only keep top 3 searches
        }
        return updatedSearches;
      });
    

    }
    
    const handleRecentSearchPress = (search) => {
      navigation.navigate('MatchScreen', { selectedSearch: search });
    }
    

  return (
    <View style={styles.container}>
      {region && (
        <MapView
          style={styles.map}
          initialRegion={region}
        >
          <Marker
            coordinate={region}
            title="Your Location"
          />
        </MapView>
      )}
      <View style={styles.locationsContainer}>
        <TextInput
          style={styles.locationInput}
          placeholder="Current location"
          value={currentLocation}
          onChangeText={text => setCurrentLocation(text)}
        />
        <GooglePlacesAutocomplete
            placeholder='Where Would You Like to Go?'
            fetchDetails={true}
            onPress={(data, details = null) => {
                console.log(data);
                setDestinationLocation(data.description);
            }}
            query={{
                key: 'AIzaSyD5GUOMMrDY5Ml8JOQ5j7z7p9f8GaGCDBg',
                language: 'en',
            }}
            styles={{
                textInputContainer: styles.locationInputContainer,
                textInput: styles.locationInput,
            }}
        />
        <Button title="Submit" onPress={submitLocations} />
        <View>
          <Text style={styles.recentSearchTitle}>Recent Searches:</Text>
          {recentSearches.map((search, index) => (
  <TouchableOpacity 
    key={index}  // Add this line
    style={styles.recentSearchItem} 
    onPress={() => handleRecentSearchPress(search)}>
    <Icon name="location-outline" size={20} />
    <Text style={styles.recentSearchText}>{search}</Text>
  </TouchableOpacity>
))}

        </View>
      </View>
    </View>
  );
};
       
  
  
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  map: {
    flex: 1,
  },
  locationsContainer: {
    position: 'absolute',
    top: 50,
    left: 20,
    right: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: 10,
    borderRadius: 10,
  },
  locationInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
    borderRadius: 5,
  },
  recentSearchTitle: {
    fontWeight: 'bold',
    fontSize: 18,
    marginTop: 10,
  },
  recentSearchItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
  },
  recentSearchText: {
    marginLeft: 10,
  },
});

export default MapScreen;

