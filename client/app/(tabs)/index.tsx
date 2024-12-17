import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, ScrollView,Dimensions } from 'react-native';
import HabitSwiper from './habitSwiper'; // Import the new component

// Define the type for your card data
type Card = {
  id: string;
  text: string;
};
const { width: screenWidth, height: screenHeight } = Dimensions.get('window'); // Get screen width and height

const TabContent = () => {
  const initialData: Card[] = [
    { id: '1', text: 'Gym' },
    { id: '2', text: 'Book' },
    { id: '3', text: 'Swim' },
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
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      {/* First Container */}
      <View style={styles.firstContainer}>
        <Text style={styles.textLeft}>Your Daily</Text>
        <Button title="Undo" onPress={undoSwipe} disabled={swipedCards.length === 0} />
      </View>

      {/* Swiper Component */}
      <View style={{ height: screenHeight * 0.9}}> 
      <HabitSwiper data={data} onSwipe={handleSwipe} />
      </View>

      <View style={{ height: screenHeight * 0.5, backgroundColor: 'lightblue' }}>
        <Text style={styles.textLeft}>Scroll down content</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: '#999',
  },
  firstContainer: {
    padding: 10,
    height:screenHeight * 0.1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#ddd',
  },
  textLeft: {
    fontSize: 16,
  },
});

export default TabContent;
