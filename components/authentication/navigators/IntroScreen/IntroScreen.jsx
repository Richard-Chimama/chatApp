import React, { useEffect, useState } from 'react';
import { View, Image, StyleSheet, Animated, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window'); // Get screen dimensions

export default function App({ navigation }) {
  const [progress, setProgress] = useState(new Animated.Value(0)); // using Animated.Value

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress._value >= 1) {
          clearInterval(interval);
          navigation.navigate('Register');
          return oldProgress;
        }
        const newProgress = Animated.add(oldProgress, 0.1); // increment progress
        Animated.timing(oldProgress, {
          toValue: newProgress,
          duration: 350,
          useNativeDriver: false,
        }).start();
        return oldProgress;
      });
    }, 500);

    return () => clearInterval(interval);
  }, []);

  const animatedWidth = progress.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'], // map progress [0, 1] to width ['0%', '100%']
  });

  return (
    <View style={styles.container}>
      <Image
        style={styles.logo}
        source={require('../../../../assets/logo.jpeg')}
        resizeMode="center" // Cover the screen
      />
      <View style={styles.progressBarContainer}>
        <Animated.View
          style={{
            width: animatedWidth,
            height: 10,
            backgroundColor: 'white',
            
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#141112',
  },
  logo: {
    position: 'absolute',
    width, // Full screen width
    height, // Full screen height
  },
  progressBarContainer: {
    position: 'absolute',
    bottom: 50,
    left: 20,
    right: 20,
    height: 10,
    backgroundColor: 'grey',
  },
});
