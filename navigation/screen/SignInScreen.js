import React, { useState, useContext } from 'react';
import { View, Text, Image, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { useAuth0 } from 'react-native-auth0';
import { useNavigation } from '@react-navigation/native';
import { UserContext } from './UserContext';
import { LinearGradient } from 'expo-linear-gradient';
import { bird } from './signInBird.gif';

const SignInScreen = ( { setShowMainContainer } ) => {
    const navigation = useNavigation(); 

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [age, setAge] = useState('');
    const [major, setMajor] = useState('');
    const [id, setId] = useState('');

    const { setUser } = useContext(UserContext);
    const { authorize } = useAuth0();
    
// login action
const handleLogin = async () => {
    try {
        const credentials = await authorize({ scope: 'openid profile email' }, { customScheme: 'flockapp' });
        console.log('Access Token: ', credentials.accessToken);
        setShowMainContainer(true); // on successful login, show main container
    } catch (e) {
        console.log(e);
    }
};

// form submit action
const submitForm = () => {
    if (!email.endsWith('.edu')) {
        alert('Please provide a valid .edu email address.');
        return;
    }

    setUser({
        firstName: firstName,
        lastName: lastName,
        email: email,
        age: age,
        major: major,
        id: id,
    });

    setShowMainContainer(true); 
};
    
    

return (
    <LinearGradient
        colors={['#8BB0E9', '#FAB3E5']}
        start={{ x: 1.75, y: .75}}
        end={{ x: .5, y: 0 }}
        style={styles.container}
    >
        <Image source={require('./signInBird.gif')} style={styles.image} />
        <Text style={styles.title}>Sign Up</Text>
        <View style={styles.row}>
            <TextInput 
                style={styles.inputHalf} 
                placeholder="First Name" 
                value={firstName} 
                onChangeText={text => setFirstName(text)} 
            />
            <TextInput 
                style={styles.inputHalf} 
                placeholder="Last Name" 
                value={lastName} 
                onChangeText={text => setLastName(text)} 
            />
        </View>
        <TextInput 
            style={styles.inputFull} 
            placeholder="Email" 
            value={email} 
            onChangeText={text => setEmail(text)} 
        />
        <View style={styles.row}>
            <TextInput 
                style={styles.inputHalf} 
                placeholder="Age" 
                value={age} 
                onChangeText={text => setAge(text)} 
            />
            <TextInput 
                style={styles.inputHalf} 
                placeholder="Major" 
                value={major} 
                onChangeText={text => setMajor(text)} 
            />
        </View>
        <TextInput 
            style={styles.inputFull} 
            placeholder="ID Number" 
            value={id} 
            onChangeText={text => setId(text)} 
        />
        <TouchableOpacity style={styles.button} onPress={submitForm}>
            <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems:'center',
        padding: 16,
    },
    image: {
        width: '100%', 
        height: 200, 
        marginBottom: 50,
        marginTop: 10, 
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginBottom: 16,
    },
    title: {
        fontFamily: 'Courier',
        fontSize: 35,
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 30,
        shadowColor: '#000', 
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
      },
      inputHalf: {
        flex: 1,
        height: 40,
        borderColor: 'gray',
        borderWidth: 0, 
        padding: 8,
        marginBottom: -5, 
        borderRadius: 10,
        backgroundColor: 'white',
        marginRight: 5, 
        marginLeft: 5, 
    },
    inputFull: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 0, 
        width: '97.5%',
        marginBottom: 10, 
        padding: 8,
        borderRadius: 10,
        backgroundColor: 'white',
    },
    button: {
        backgroundColor: '#ffffff',
        padding: 15,
        borderRadius: 10,
        marginTop: 30,
        marginBottom: 15,
        alignItems: 'center',
        width: '100%',
    },
      buttonText: {
        fontSize: 16,
        color: '#8BB0E9',
        fontWeight: 'bold',
      },
    });
    
    export default SignInScreen;
