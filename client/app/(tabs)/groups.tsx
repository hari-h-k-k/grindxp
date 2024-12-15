import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Animated } from 'react-native';

// Neon Glow Animation
const App = () => {
  const scale = new Animated.Value(1);

  const handlePressIn = () => {
    Animated.spring(scale, {
      toValue: 0.98, // Shrink the card a little when touched
      friction: 3,
      tension: 100,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scale, {
      toValue: 1, // Return to original size
      friction: 3,
      tension: 100,
      useNativeDriver: true,
    }).start();
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity
        style={styles.card}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
      >
        <Animated.View style={[styles.cardContent, { transform: [{ scale }] }]}>
          <Text style={styles.cardText}>
            This is a card with some text that might overflow and needs to be truncated if it is too long.
          </Text>
        </Animated.View>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.card}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
      >
        <Animated.View style={[styles.cardContent, { transform: [{ scale }] }]}>
          <Text style={styles.cardText}>A shorter text for this card.</Text>
        </Animated.View>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.card}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
      >
        <Animated.View style={[styles.cardContent, { transform: [{ scale }] }]}>
          <Text style={styles.cardText}>
            This one is a bit longer than the previous, but still not too long to cause overflow issues.
          </Text>
        </Animated.View>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    alignItems: 'center',
    backgroundColor: '#000',
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
  cardContent: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  cardText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#00FFFF', // Neon blue text color
    textOverflow: 'ellipsis', // Text overflow will be truncated
    overflow: 'hidden', // Hide any overflow
    maxHeight: 50, // Limit the number of lines before truncating
    lineHeight: 24, // Line height for better text spacing
  },
});

export default App;
