import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, Text, Button, StyleSheet, Image, TouchableOpacity } from 'react-native';
import * as Font from 'expo-font';
import birdFlying from './bird-flying.gif'
import { useState, useEffect } from 'react';
import { LinearGradient } from 'expo-linear-gradient';

const loadFontsAsync = async () => {
  await Font.loadAsync({
    'Righteous-Regular': require('../../assets/fonts/Righteous-Regular.ttf'),
    'Nintendo': require('../../assets/fonts/RoSpritendoSemiboldBeta-vmVwZ.otf'),
    'superMario': require('../../assets/fonts/SuperMarioBros-ov7d.ttf'),
    'Pixel': require('../../assets/fonts/Pixeled.ttf'),
  });
};

const AuthScreen = ({ onButtonClick, navigation }) => {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    loadFontsAsync().then(() => setFontsLoaded(true));
  }, []);

  const handlePress = () => {
    onButtonClick();
  };

  const handleSignInPress = () => {
    navigation.navigate('SignIn');
  };

  if (!fontsLoaded) {
    return <View />;
  }

  return (
    <LinearGradient
        // Gradient colors from pastel teal to pastel purple-pink
        colors={['#8BB0E9', '#FAB3E5']}
        // Start color will be at top left
        start={{ x: 1.75, y: .75}}
        // End color will be at bottom right
        end={{ x: .5, y: 0 }}
        style={styles.container}
    >
     <Text style={styles.title}>FLOCK</Text>
  <Text style={styles.text}>GO ANYWHERE SAFE</Text>
  <StatusBar style="auto" />
  <Image style={styles.image} source={birdFlying} />
  <StatusBar style="auto" />
  <View style={styles.buttonContainer}>
    <TouchableOpacity style={styles.button} onPress={handlePress}>
      <Text style={styles.buttonText}>Get Started</Text>
    </TouchableOpacity>
    <TouchableOpacity style={[styles.button, styles.buttonSecondary]} onPress={handleSignInPress}>
      <Text style={styles.buttonText}>Sign in</Text>
    </TouchableOpacity>
  </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'pink',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 50,
  },
  title: {
    fontFamily: 'Pixel',
    fontSize: 50,
    fontWeight: 'bold',
    color: 'white',
    top: 0,
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.20,
    shadowRadius: 2,
  },
  buttonContainer: {
    width: '90%',
  },
  button: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    color: '#8BB0E9',
    fontWeight: 'bold',
  },
  text: {
    fontFamily: 'Pixel',
    fontSize: 25,
    fontWeight: 'bold',
    color: 'white',
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  image: {
    justifyContent: 'center',
    width: 150,
    height: 150,
    marginTop: 30,
    marginBottom: 70,
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 2,
  },
  
});

export default AuthScreen;
