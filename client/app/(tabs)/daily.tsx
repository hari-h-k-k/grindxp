import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, Button } from 'react-native';
import Swiper from 'react-native-deck-swiper';

const SCREEN_WIDTH = Dimensions.get('window').width;

// Define the type for your card data
type Card = {
  id: string;
  text: string;
};

const App: React.FC = () => {
  const initialData: Card[] = [
    { id: '1', text: 'Card 1' },
    { id: '2', text: 'Card 2' },
    { id: '3', text: 'Card 3' },
  ];

  const [data, setData] = useState<Card[]>(initialData);
  const [swipedCards, setSwipedCards] = useState<Card[]>([]);

  const handleSwipe = (cardIndex: number, direction: 'right' | 'left') => {
    console.log(`Card ${cardIndex} swiped ${direction}`);
    const swipedCard = data[cardIndex];
    setSwipedCards((prev) => [swipedCard, ...prev]); // Add the swiped card to the stack
  };

  const undoSwipe = () => {
    if (swipedCards.length === 0) return;

    // Retrieve the last swiped card
    const lastSwipedCard = swipedCards[0];

    // Update state to add the card back
    setData((prev) => [lastSwipedCard, ...prev]);
    setSwipedCards((prev) => prev.slice(1)); // Remove the card from the stack
  };

  return (
    <View style={styles.container}>
      <Swiper
        cards={data}
        renderCard={(card: Card) => (
          <View style={styles.card}>
            <Text style={styles.text}>{card.text}</Text>
          </View>
        )}
        onSwipedRight={(cardIndex) => handleSwipe(cardIndex, 'right')}
        onSwipedLeft={(cardIndex) => handleSwipe(cardIndex, 'left')}
        cardIndex={0}
        backgroundColor="white"
        stackSize={3}
        disableTopSwipe
        disableBottomSwipe
      />
      <View style={styles.buttonContainer}>
        <Button title="Undo" onPress={undoSwipe} disabled={swipedCards.length === 0} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    width: '100%', // Cards take up the full width of the screen
    height: 150, // Set a fixed height to make them equal
    marginVertical: 10, // Add some spacing between cards
    borderRadius: 10,
    backgroundColor: '#111', // Dark background for cards
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: '#00FFFF', // Neon blue border
    shadowColor: '#00FFFF', // Neon blue shadow for glow effect
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 20,
  },
});

export default App;
