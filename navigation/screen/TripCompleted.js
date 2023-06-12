import React, { useState } from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import StarRating from 'react-native-star-rating';
import MapView, { Marker } from 'react-native-maps';
import { useNavigation } from '@react-navigation/native';

const TripCompleted = ({ route }) => {
  const navigation = useNavigation();
  const { destination } = route.params;

  const [rating, setRating] = useState(0);
  const [modalVisible, setModalVisible] = useState(true);

  const handleClose = () => {
    setModalVisible(!modalVisible);
    navigation.navigate('Home'); 
  };
  
  return (
    <View style={{ flex: 1 }}>
      <MapView
        initialRegion={{
          latitude: destination.latitude,
          longitude: destination.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        style={{ flex: 1 }}
      >
        <Marker coordinate={destination} />
      </MapView>

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Trip Completed!</Text>
            <StarRating
              disabled={false}
              maxStars={5}
              rating={rating}
              selectedStar={(rating) => setRating(rating)}
              fullStarColor={'gold'}
            />
            <TouchableOpacity
              style={{...styles.button, ...styles.uiAuthButtonStyle}}
              onPress={handleClose} 
            >
              <Text style={styles.textStyle}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};



const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: 'rgba(0,0,0,0.7)', // semitransparent dark tint to the background
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    elevation: 5
  },
});
  

export default TripCompleted;
