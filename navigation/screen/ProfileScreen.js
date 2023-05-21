import * as React from 'react';
import { useState, useContext } from 'react';
import {View, Text, Image, StyleSheet, Button, ImageBackground} from 'react-native';
import { FontAwesome } from 'react-native-vector-icons';
import * as Font from 'expo-font';
import profileBackground from './profBackground.gif';
import { UserContext } from './UserContext';
import * as ImagePicker from 'expo-image-picker';


const ProfileScreen = () => {
    const { user } = useContext(UserContext);
    const [image, setImage] = useState(require('../../assets/headshot.png'));

    const pickImage = async () => {
  
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Sorry, we need camera roll permissions to make this work!');
      return;
    }

  
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

 
    if (!result.cancelled) {
      setImage({ uri: result.assets[0].uri });
    }
    };

    return (
      <ImageBackground
      source={profileBackground}
      style={{ flex: 1, resizeMode: 'cover' }}
    >
      <View style={backgroundStyles.container}>
        <Image source={image} style={infoStyles.profileImage} />
        <Button title="Change Profile Picture" onPress={pickImage} />
    
        <Text style={infoStyles.name}>{user.firstName} {user.lastName}</Text>
        <View style={infoStyles.info}>
          <FontAwesome name="calendar" size={24} color="rgb(103, 79, 110)" style={infoStyles.icon} />
          <Text style={infoStyles.info}>AGE: {user.age}</Text>
        </View>

        <View style={infoStyles.info}>
          <FontAwesome name="graduation-cap" size={24} color="rgb(103, 79, 110)" style={infoStyles.icon} />
          <Text style={infoStyles.info}>MAJOR: {user.major}</Text>
        </View>
        <View style={infoStyles.info}>
          <FontAwesome name="id-card" size={24} color="rgb(103, 79, 110)" style={infoStyles.icon} />
          <Text style={infoStyles.info}>ID NUMBER: {user.id}</Text>
        </View>
        <View style={infoStyles.info}>
          <FontAwesome name="envelope" size={24} color="rgb(103, 79, 110)" style={infoStyles.icon} />
          <Text style={infoStyles.info}>EMAIL: {user.email}</Text>
        </View>
      </View>
    </ImageBackground>
    );
  };
  
  const backgroundStyles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: 35,
    },
    header: {
      
        flexDirection: 'column',
        alignItems: 'center',
        paddingTop: 20,
        marginBottom: 16,
        
    },
    
  });
  
  const infoStyles = StyleSheet.create({
    name: {
      fontFamily: 'Pixel',
      fontSize: 25,
      color: 'white',
      fontWeight: 'bold',
      textAlign: 'center',
      paddingTop: 10,
      marginBottom: 30,
    },
    info: {
      flexDirection: 'row',
      fontFamily: 'Pixel',
      fontSize: 12,
      textAlign: 'left',
      paddingLeft: 2,
      marginBottom: 8,
      color: 'white',
    },
    icon: {
        marginRight: 8, // add this to add spacing between the icon and text
        paddingLeft: 30,
        width: 60,
        borderRadius: 15,
        color: 'white',
    },
    profileImage: {
        width: 120,
        height: 120,
        borderRadius: 60,
        marginTop: 20,
        marginBottom: 10,
        alignSelf: 'center',
        justifyContent: 'center',
      },
  });

  
  const loadFontsAsync = async () => {
    await Font.loadAsync({
      'Righteous-Regular': require('../../assets/fonts/Righteous-Regular.ttf'),
      'Nintendo': require('../../assets/fonts/RoSpritendoSemiboldBeta-vmVwZ.otf'),
      'superMario': require('../../assets/fonts/SuperMarioBros-ov7d.ttf'),
      'Pixel': require('../../assets/fonts/Pixeled.ttf'),
    });
  };

  loadFontsAsync();


  export default ProfileScreen;
