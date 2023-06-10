import { React, useState, useEffect} from 'react';
import { View, Text } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import * as Notifications from 'expo-notifications';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

// TO DO:
  // Reminder To Make Phone Have a Vibrating Notification
  // Also, the repeating condition is an an temporary until we implement backend to form the time~sensitive notification.

const MapScreen = () => {
    const [location, setLocation] = useState(null);
    // Assuming the condition to remove the notification is after 1 hour
    const ONE_HOUR_IN_MILLISECONDS = 60 * 60 * 1000;

    useEffect(() => {
      (async () => {
        //let { status } = await Location.requestForegroundPermissionsAsync();
        const { status } = await Notifications.requestPermissionsAsync();
        if (status !== 'granted') {
          console.error('Permission to access location was denied');
          return;
        }
  
        let location = await Location.getCurrentPositionAsync({});
        setLocation(location);

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
  
    return (
      <View style={{ flex: 1 }}>
        {location && (
          <MapView
            style={{ flex: 1 }}
            initialRegion={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          >
            <Marker
              coordinate={{
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
              }}
              title="Your Location"
            />
          </MapView>
        )}
      </View>
    );
};

export default MapScreen;
