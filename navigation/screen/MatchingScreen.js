import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import SwipeCards from 'react-native-swipe-cards';

const cards = [
    { name: 'User 1', image: require('./P1.jpeg') },
    { name: 'User 2', image: require('./P2.jpeg') },
    { name: 'User 3', image: require('./P3.jpeg') },
]

const Card = ({ card }) => (
    <View style={styles.card}>
      <Image style={styles.thumbnail} source={card.image} />
      <Text style={styles.text}>{card.name}</Text>
    </View>
  );
  

const NoMoreCards = () => (
  <View>
    <Text style={styles.noMoreCardsText}>No more cards</Text>
  </View>
);

export default function MatchingScreen() {
  const handleYup = (card) => {
    console.log(`Yup for ${card.name}`)
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
    alignItems: 'center',
    borderRadius: 5,
    overflow: 'hidden',
    borderColor: 'grey',
    backgroundColor: 'white',
    borderWidth: 1,
    elevation: 1,
  },
  thumbnail: {
    width: 300,
    height: 300,
  },
  text: {
    fontSize: 20,
    paddingTop: 10,
    paddingBottom: 10
  },
  noMoreCardsText: {
    fontSize: 22,
  }
})
