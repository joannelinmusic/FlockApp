import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, StyleSheet, Text, SafeAreaView, Image, ImageBackground } from 'react-native';
import birdFlying from './bird-flying.gif'
import pixelBubble from './pixel-speech-bubble.png'
import background from './background.jpeg'
import { createStackNavigator } from '@react-navigation/stack';
import RequestScreen from './RequestScreen';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

// TO DD: Change UI from specific numbers to percentages so it looks good on all types of phones & platforms

export default function HomeScreen({}){

  const navigation = useNavigation();

  return (
      <View style={styles.container}>
        <Image
          source={background}
          style={{ position: 'absolute', width: '100%', height: '100%'}}
        />
       <TouchableOpacity
        style={styles.centeredContainer}
        onPress={() => navigation.navigate('Request')}
      >
        <Image
          source={pixelBubble} // Tap to start
          style={styles.bubbleImage}
        />
      </TouchableOpacity>
       <Image
            source={birdFlying}
            style={{ position: 'absolute', width: 100, height: 100 }}
          />
        <StatusBar style="auto" />
      </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'pink',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  text: {
    fontFamily: 'Pixeled',
    fontSize: 24,
    fontWeight: 'bold',
    color: 'red',
  },
  bubbleImage: {
    width: 250,
    height: 155,
    top: '-90%',
  },
});
