import React from 'react';
import { StyleSheet, Text, View, ImageBackground, Dimensions } from 'react-native';
import { useFonts } from 'expo-font';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window'); // Get screen width and height

const HabitCard: React.FC<{ text: string }> = ({ text }) => {
  const [fontsLoaded, fonterr] = useFonts({
    Cyberpunk: require('@/assets/fonts/Cyberpunk.ttf'), // Path to your custom font
  });

  if(fonterr){
    console.log(fonterr)
  }

  if (!fontsLoaded) {
    console.log("font error")
    return null; // Wait for fonts to load
  }

  

  return (
    <View style={styles.card}>
      <ImageBackground
        source={require('@/assets/images/running2.png')} // Path to your image
        style={styles.imageBackground}
        // resizeMode="contain" // Ensure the whole image is visible without cropping
      >
        {/* Text at the bottom center */}
        <Text style={styles.title}>Midlaj Running</Text>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: screenWidth* 0.9, // Full screen width
    height: screenHeight* 0.8, // 50% of the screen height
    marginVertical: -30,
    // marginLeft: 560,
    borderRadius: 10,
    overflow: 'hidden',
    borderWidth: 2,
    shadowOffset: { width: 1, height: 4 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
  },
  imageBackground: {
    flex: 1,
    justifyContent: 'flex-end', // Align content to the bottom
    alignItems: 'center', // Align content to the center horizontally
    width: '100%',
    height: '100%',
    opacity: 0.95,
  },
  title: {
    fontSize: 48,
    // fontWeight: 'bold',
    color: '#FFFFFF', // White color for better contrast on image
    textAlign: 'center', // Center the text horizontally
    marginBottom: 20, // Add bottom margin for padding
    letterSpacing: 1.5,
    fontFamily: 'Cyberpunk', // Custom font
  },
});

export default HabitCard;
