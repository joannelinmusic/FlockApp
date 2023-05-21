/*
const io = require('socket.io-client');
const socket = io('http://localhost:3000'); // Replace with your server URL

socket.on('greeting', (data) => {
    console.log('Received greeting:', data);
  });

socket.emit('message', 'Hello, server!');
*/

import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { useState, useEffect } from 'react';
import * as Location from 'expo-location';
//import { FontAwesome } from 'react-native-vector-icons';
import * as Font from 'expo-font';
import {TextInput, Button, Alert} from 'react-native';
import React from 'react';
import { Image } from 'react-native';
import geoBack from './geoBack.png';
import requestButton from './reqButton.png'
import requestBubble from './requestBubble.png'
import yes from './yes.png'
import no from './no.png'


const reverseGeocode = async () => {
  const reverseGeocodedAddress = await Location.reverseGeocodeAsync({
    longitude: location.coords.longitude,
    latitude: location.coords.latitude
  });

  console.log("Reverse Geocoded:");
  console.log(reverseGeocodedAddress);

  // Send the geolocated address to the server
  socket.emit('geolocatedAddress', reverseGeocodedAddress);
};

const io = require('socket.io-client');
const socket = io('http://localhost:3000'); // Replace with your server URL

socket.on('greeting', (data) => {
    console.log('Received greeting:', data);
  });

socket.emit('message', 'Hello, server! I am client number 2');

// Listen for events from the server
socket.on('eventFromServer', (data) => {
  // Handle the data received from the server
  console.log('Received data from server:', data);
});

