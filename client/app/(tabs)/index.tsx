import HabitCard from '@/components/HabitCard';
import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, Button, ScrollView } from 'react-native';
import Swiper from 'react-native-deck-swiper';

const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;

// Define the type for your card data
type Card = {
  id: string;
  text: string;
  path: string;
};

const TabContent = () => {
  const initialData: Card[] = [
    { id: '1', text: 'Gym', path: '@/assets/images/gym.png' },
    { id: '2', text: 'Book', path: '@/assets/images/book.png' },
    { id: '3', text: 'Swim', path: '@/assets/images/swim.png' },
    { id: '3', text: 'Running', path: '@/assets/images/running.png' },
    { id: '3', text: 'Meditate', path: '@/assets/images/meditate.png' },
    { id: '3', text: 'Study', path: '@/assets/images/study.png' },
  ];

  const [data, setData] = useState<Card[]>(initialData);
  const [swipedCards, setSwipedCards] = useState<Card[]>([]);

  const handleSwipe = (cardIndex: number, direction: 'right' | 'left') => {
    console.log(`Card ${cardIndex} swiped ${direction}`);
    const swipedCard = data[cardIndex];
    setSwipedCards((prev) => [swipedCard, ...prev]);
    if (cardIndex === data.length - 1) {
      setData([]);
    }
  };

  const undoSwipe = () => {
    if (swipedCards.length === 0) return;

    const lastSwipedCard = swipedCards[0];
    setData((prev) => [lastSwipedCard, ...prev]);
    setSwipedCards((prev) => prev.slice(1));
  };

  return (
    <ScrollView style={styles.container}>
      {/* First Container */}
      <View style={styles.firstContainer}>
        <Text style={styles.textLeft}>Your Daily</Text>
        <Button title="Undo" onPress={undoSwipe} disabled={swipedCards.length === 0} />
      </View>

      {/* Second Container with Swiper */}
      <View style={styles.swiperContainer}>
        {data.length > 0 ? (
          <Swiper
            cards={data}
            renderCard={(card: Card) => <HabitCard text={card.text} path={card.path} />}
            onSwipedRight={(cardIndex) => handleSwipe(cardIndex, 'right')}
            onSwipedLeft={(cardIndex) => handleSwipe(cardIndex, 'left')}
            cardIndex={0}
            backgroundColor="transparent" // No background color
            stackSize={2} // Only the top card is visible
            disableTopSwipe
            disableBottomSwipe
            verticalSwipe={false}
          />
        ) : (
          <Text style={styles.noCardsText}>Congrats! Keep up the great work!</Text>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#999',
    flex: 1,
    flexDirection: 'column', // Ensures vertical stacking
  },
  firstContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    backgroundColor: '#ddd',
    height: 60, // Fixed height
  },
  textLeft: {
    fontSize: 16,
  },
  swiperContainer: {
    flex: 8, // Takes up 80% of the screen
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%', // Ensure the swiper container takes full width
    height: '100%', // Ensure the swiper container takes full height
    padding: 0, // Ensure no padding within swiper container
    margin: 0,  // Ensure no margin within swiper container
  },
  thirdContainer: {
    flex: 1, // Takes 10% of the screen
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#999',
  },
  card: {
    width: '100%', // Full width of the swiper container
    height: '90%', // Full height of the swiper container
    borderRadius: 10,
    backgroundColor: '#ccc',
    borderWidth: 2,
    borderColor: '#000',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 0, // No margin for cards
    padding: 0, // No padding for cards
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFF',
  },
  noCardsText: {
    fontSize: 18,
    color: '#FFF',
    textAlign: 'center',
  },
});

export default TabContent;
