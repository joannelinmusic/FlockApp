import * as React from 'react';
import { useState, useContext } from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity, ImageBackground} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome } from '@expo/vector-icons';
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
        <LinearGradient
            colors={['#8BB0E9', '#FAB3E5']}
            start={{ x: 1.75, y: .75}}
            end={{ x: .5, y: 0 }}
            style={styles.container}
        >
            <View style={styles.imageContainer}>
       <Image source={image} style={styles.profileImage} />
      </View>
      <Text style={styles.title}>{user.firstName} {user.lastName}</Text>
           
            <View style={styles.row}>
                <FontAwesome name="calendar" size={24} color="white" style={styles.icon} />
                <Text style={styles.text}>Age: {user.age}</Text>
            </View>
            <View style={styles.row}>
                <FontAwesome name="graduation-cap" size={24} color="white" style={styles.icon} />
                <Text style={styles.text}>Major: {user.major}</Text>
            </View>
            <View style={styles.row}>
                <FontAwesome name="id-card" size={24} color="white" style={styles.icon} />
                <Text style={styles.text}>ID Number: {user.id}</Text>
            </View>
            <View style={styles.row}>
                <FontAwesome name="envelope" size={24} color="white" style={styles.icon} />
                <Text style={styles.text}>Email: {user.email}</Text>
            </View>
            <TouchableOpacity style={styles.button} onPress={pickImage}>
                <Text style={styles.buttonText}>Change Profile Picture</Text>
            </TouchableOpacity>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
  container: {
      flex: 1,
      padding: 16,
  },
  imageContainer: {
    paddingTop: 25,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
},
  title: {
      fontFamily: 'Pixel',
      fontSize: 25,  
      color: 'white',
      marginBottom: 30,
      textAlign: 'center',
      paddingTop: 10,
      paddingBottom: 10,
  },
  row: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 16,
  },
  text: {
      fontFamily: 'Pixel',
      fontSize: 15,  
      color: 'white',
      textAlign: 'left',
      paddingLeft: 2,
  },
  icon: {
      marginRight: 8,
      paddingLeft: 30,
      width: 60,
      borderRadius: 15,
  },
  profileImage: {
      width: 120,
      height: 120,
      borderRadius: 60,
      marginTop: 20,
      marginBottom: 20, 
  },
  button: {
      backgroundColor: '#ffffff',
      padding: 10,  
      borderRadius: 10,
      marginTop: 55,  
      marginBottom: 15,
      alignItems: 'center',
      width: '100%',  
  },
  buttonText: {
      fontSize: 16,
      color: '#8BB0E9',
      fontFamily: 'Pixel',
      fontWeight: 'bold',
  },
});


export default ProfileScreen;
