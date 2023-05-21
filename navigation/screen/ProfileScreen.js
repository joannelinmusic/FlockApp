import * as React from 'react';
import { useContext } from 'react';
import {View, Text, Image, StyleSheet, ImageBackground} from 'react-native';
import { FontAwesome } from 'react-native-vector-icons';
import * as Font from 'expo-font';
import profileBackground from './profBackground.gif';
import { UserContext } from './UserContext';

const ProfileScreen = () => {
    const { user } = useContext(UserContext);

    return (
      <ImageBackground
      source={profileBackground}
      style={{ flex: 1, resizeMode: 'cover' }}
    >
      <View style={backgroundStyles.container}>
        <Image
          source={require('../../assets/headshot.png')}
          style={[infoStyles.profileImage, {marginTop: 8}]}
        />
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
