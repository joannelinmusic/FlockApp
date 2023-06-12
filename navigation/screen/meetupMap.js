// MeetupMap.js
import React from 'react';
import MapView, { Marker } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';

const MeetupMap = ({ route }) => {
  const { destination } = route.params;

  const origin = { latitude: 37.7749, longitude: -122.4194 };  // San Francisco
  const GOOGLE_MAPS_APIKEY = 'AIzaSyD5GUOMMrDY5Ml8JOQ5j7z7p9f8GaGCDBg';

  return (
    <MapView
      initialRegion={{
        latitude: 37.7749,
        longitude: -122.4194,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}
      style={{ flex: 1 }}
    >
      <Marker coordinate={origin} />
      <Marker coordinate={destination} />
      <MapViewDirections
        origin={origin}
        destination={destination}
        apikey={GOOGLE_MAPS_APIKEY}
        strokeWidth={3}
        strokeColor="hotpink"
      />
    </MapView>
  );
};

export default MeetupMap;
