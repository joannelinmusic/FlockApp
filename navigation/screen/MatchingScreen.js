import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import SwipeCards from 'react-native-swipe-cards';
import { LinearGradient } from 'expo-linear-gradient';
//import MeetupMap from './meetupMap';

const cards = [
    {
      name: 'Aria Johnson', 
      image: require('./P1.jpeg'), 
      bio: '"🌼🌻 Biology major with a minor in wanderlust. You can find me at the library, the yoga studio, or planning my next adventure. 🏞️🧘‍♀️"', 
      age: 25, 
      occupation: 'Biology Major',
    },
    {
      name: 'Olivia Martinez', 
      image: require('./P2.jpeg'), 
      bio: '🍃🎨 Art History student by day, star gazer by night. Fueled by coffee and indie music. 📚☕ My life is a beautiful mess but my room is always tidy. 🌛✨"', 
      age: 18, 
      occupation: 'Art History Major',
    },
    {
      name: 'Sophia Thompson', 
      image: require('./P3.jpeg'), 
      bio: ' "👩‍🔬🚀 Future astronautical engineer. When I\'m not studying the stars, I\'m surfing or capturing moments with my Polaroid. 📸 Life\'s too short for bad vibes. 🌈🌊"', 
      age: 20, 
      occupation: 'Aerospace Engineering Major',
    },
];

const Card = ({ card }) => (
    <View style={styles.card}>
        <Image style={styles.thumbnail} source={card.image} />
        <View style={styles.textContainer}>
            <Text style={styles.text}>{card.name}</Text>
            <Text style={styles.details}>{`${card.age} years old, ${card.occupation}`}</Text>
            <Text style={styles.bio}>{card.bio}</Text>
        </View>
    </View>
);

const NoMoreCards = () => (
    <View style={styles.noMoreCards}>
        <Text style={styles.noMoreCardsText}>No more cards</Text>
    </View>
);

export default function MatchingScreen({navigation}) {
    const handleYup = (card) => {
        console.log(`Yup for ${card.name}`)
        navigation.navigate('MeetUpMap', { 
            destination: { latitude: 37.8702, longitude: -122.2595 },  // Example coordinates
        });
    }

    const handleNope = (card) => {
        console.log(`Nope for ${card.name}`)
    }

    return (
        <SwipeCards
            cards={cards}
            renderCard={(cardData) => <Card card={cardData} />}
            renderNoMoreCards={() => <NoMoreCards />}
            handleYup={handleYup}
            handleNope={handleNope}
        />
    );
}

const styles = StyleSheet.create({
    card: {
        flex: 1,
        alignItems: 'center',
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#E8E8E8',
        justifyContent: 'center',
        backgroundColor: 'white',
    },
    thumbnail: {
        width: '100%',
        height: '60%',
    },
    textContainer: {
        paddingHorizontal: 10,
    },
    text: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#4F4F4F',
        paddingTop: 10,
    },
    bio: {
        fontSize: 16,
        color: 'gray',
        fontStyle: 'italic',
        marginVertical: 10,
    },
    details: {
        fontSize: 18,
        color: '#333',
    },
    noMoreCards: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    noMoreCardsText: {
        fontSize: 22,
        color: '#888',
    },
});
