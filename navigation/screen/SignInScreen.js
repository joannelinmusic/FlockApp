import React, { useState, useContext } from 'react';
import { View, Text, Image, TextInput, StyleSheet, Button } from 'react-native';
import {  } from '@chakra-ui/react';
import { UserContext } from './UserContext';

const SignInScreen = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [age, setAge] = useState('');
    const [major, setMajor] = useState('');
    const [id, setId] = useState('');

    const { setUser } = useContext(UserContext);

    const submitForm = () => {
        // handling form submission here
        setUser({
            firstName: firstName,
            lastName: lastName,
            email: email,
            age: age,
            major: major,
            id: id,
        })
    }

    return (
        <View style={styles.container}>
            <Image source={require('./loginFlock.png')} style={styles.image} />
            <Text>Sign in Screen </Text>
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
            <Button title="Submit" onPress={submitForm} />
        </View>
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
        width: 300, 
        height: 200, 
        marginBottom: 32,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginBottom: 16,
    },
    inputHalf: {
        flex: 1,
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        padding: 8,
        
    },
    inputFull: {
        height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    width: '100%',
    marginBottom: 16,
    padding: 8,
    }
});

export default SignInScreen;
