import React from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Animated,
  StatusBar,
} from 'react-native';

const CIRCLE_SIZE = 100;

const Circle = ({onPress, animatedValue}) => {
  const inputRange = [0, 0.001, 0.5, 0.501, 1];
  const containerBg = animatedValue.interpolate({
    inputRange,
    outputRange: ['#7d7b00', '#7d7b00', '#7d7b00', '#0f0f0f', '#0f0f0f'],
  });
  const circleColor = animatedValue.interpolate({
    inputRange,
    outputRange: ['#0f0f0f', '#0f0f0f', '#0f0f0f', '#7d7b00', '#7d7b00'],
  });
  return (
    <Animated.View
      style={[
        StyleSheet.absoluteFillObject,
        styles.circleContainer,
        {
          backgroundColor: containerBg,
        },
      ]}>
      <Animated.View
        style={[
          styles.circle,
          {
            backgroundColor: circleColor,
            transform: [
              {
                perspective: 100,
              },
              {
                rotateY: animatedValue.interpolate({
                  inputRange: [0, 0.5, 1],
                  outputRange: ['0deg', '-90deg', '-180deg'],
                }),
              },
              {
                scale: animatedValue.interpolate({
                  inputRange: [0, 0.5, 1],
                  outputRange: [1, 8, 1],
                }),
              },
              {
                translateX: animatedValue.interpolate({
                  inputRange: [0, 0.5, 1],
                  outputRange: [0, 0.5, 0],
                }),
              },
            ],
          },
        ]}>
        <TouchableOpacity onPress={onPress}>
          <View style={[styles.circle, styles.circleButton]} />
        </TouchableOpacity>
      </Animated.View>
    </Animated.View>
  );
};

export default function App() {
  const animatedValue = React.useRef(new Animated.Value(0)).current;
  const [index, setIndex] = React.useState(0);

  const animation = (toValue) =>
    Animated.timing(animatedValue, {
      toValue,
      duration: 1500,
      useNativeDriver: false,
    });

  const onPress = () => {
    setIndex(index === 1 ? 0 : 1);
    animation(index === 1 ? 0 : 1).start();
  };

  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <Circle onPress={onPress} animatedValue={animatedValue} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  circleContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    padding: 8,
    paddingBottom: 100,
    backgroundColor: '#7d7b00',
  },
  circle: {
    backgroundColor: '#0f0f0f',
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    borderRadius: CIRCLE_SIZE / 2,
  },
  circleButton: {
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
