import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Swiper from 'react-native-deck-swiper';
import HabitCard from '@/components/HabitCard';

// Define the type for your card data
type Card = {
  id: string;
  text: string;
};

type HabitSwiperProps = {
  data: Card[];
  onSwipe: (cardIndex: number, direction: 'right' | 'left') => void;
};

const HabitSwiper: React.FC<HabitSwiperProps> = ({ data, onSwipe }) => {
  return (
    <View style={styles.swiperContainer}>
      {data.length > 0 ? (
        <Swiper
          cards={data}
          renderCard={(card: Card) => <HabitCard text={card.text} />}
          onSwipedRight={(cardIndex) => onSwipe(cardIndex, 'right')}
          onSwipedLeft={(cardIndex) => onSwipe(cardIndex, 'left')}
          cardIndex={0}
          backgroundColor="transparent"
          stackSize={2}
          disableTopSwipe
          disableBottomSwipe
          verticalSwipe={false}
        />
      ) : (
        <Text style={styles.noCardsText}>Congrats! Keep up the great work!</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  swiperContainer: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    position:'relative',
    margin:0
  },
  noCardsText: {
    fontSize: 18,
    color: '#FFF',
    textAlign: 'center',
  },
});

export default HabitSwiper;
