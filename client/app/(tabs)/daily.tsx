import HabitCard from '@/components/HabitCard';
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
    { id: '1', text: 'Gym' },
    { id: '2', text: 'Book' },
    { id: '3', text: 'Swim' },
  ];

  const [data, setData] = useState<Card[]>(initialData);
  const [swipedCards, setSwipedCards] = useState<Card[]>([]);
  const [swiperKey, setSwiperKey] = useState(0); // Unique key to re-render the Swiper

  const handleSwipe = (cardIndex: number, direction: 'right' | 'left') => {
    console.log(`Card ${cardIndex} swiped ${direction}`);
    const swipedCard = data[cardIndex];
    setSwipedCards((prev) => [swipedCard, ...prev]); // Add the swiped card to the stack
    if (cardIndex === data.length - 1) {
      // If it's the last card, reinitialize the Swiper
      setData([]);
    }
  };

  const undoSwipe = () => {
    if (swipedCards.length === 0) return;

    // Retrieve the last swiped card
    const lastSwipedCard = swipedCards[0];

    // Update state to add the card back
    setData((prev) => [lastSwipedCard, ...prev]);
    setSwipedCards((prev) => prev.slice(1)); // Remove the card from the stack

    // Reset the Swiper component by updating its key
    // setSwiperKey((prevKey) => prevKey + 1);
  };

  return (
      <View style={styles.swiperContainer}>
        {data.length > 0 ? (
          <Swiper
            key={swiperKey} // Use the key to force re-rendering when data changes
            cards={data}
            renderCard={(card: Card) => (
              <HabitCard text={card.text} />
            )}
            onSwipedRight={(cardIndex) => handleSwipe(cardIndex, 'right')}
            onSwipedLeft={(cardIndex) => handleSwipe(cardIndex, 'left')}
            cardIndex={0}
            backgroundColor="white"
            stackSize={2} // Only the top card is visible
            disableTopSwipe
            disableBottomSwipe
            verticalSwipe={false}
          />
        ) : (
          <Text style={styles.noCardsText}>Congrats!Keep up the great work!</Text>
        )}
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  swiperContainer: {
    flex: 4, // Occupies 80% of the screen
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    flex: 1, // Occupies 20% of the screen
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    width: SCREEN_WIDTH * 0.9, // Adjust card width relative to screen
    height: '70%', // Set card height relative to the swiper container
    borderRadius: 10,
    backgroundColor: '#111', // Dark background for cards
    borderWidth: 2,
    borderColor: '#00FFFF', // Neon blue border
    shadowColor: '#00FFFF', // Neon blue shadow for glow effect
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#00FFFF', // Neon blue text color
  },
  noCardsText: {
    fontSize: 18,
    color: '#FFF',
    textAlign: 'center',
  },
});

export default App;
