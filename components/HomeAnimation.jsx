import React, { useEffect, useRef } from 'react';
import { StyleSheet, View, Text, Animated, Easing } from 'react-native';
import Svg, { Polygon, Path } from 'react-native-svg';

const ORANGE = '#F26419';

function DiamondSvg({ size = 30 }) {
  return (
    <Svg width={size} height={size * 1.45} viewBox="0 0 30 43">
      <Polygon points="15,0 30,21.5 15,43 0,21.5" fill={ORANGE} />
    </Svg>
  );
}

function HeartSvg({ size = 68 }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 100 95">
      <Path
        d="M50,92 C46,88 4,62 4,33 C4,16 17,4 31,4 C40,4 47,9 50,17 C53,9 60,4 69,4 C83,4 96,16 96,33 C96,62 54,88 50,92 Z"
        fill={ORANGE}
      />
    </Svg>
  );
}

function AnimatedPiece({ tx, ty, rotate = 0, animValue, children }) {
  return (
    <Animated.View
      style={[
        styles.pieceContainer,
        {
          opacity: animValue,
          transform: [
            {
              translateX: animValue.interpolate({
                inputRange: [0, 1],
                outputRange: [0, tx],
              }),
            },
            {
              translateY: animValue.interpolate({
                inputRange: [0, 1],
                outputRange: [0, ty],
              }),
            },
            { rotate: `${rotate}deg` },
          ],
        },
      ]}
    >
      {children}
    </Animated.View>
  );
}

const diamonds = [
  { tx: 0, ty: -75, rotate: 0 },
  { tx: 75, ty: 0, rotate: 90 },
  { tx: 0, ty: 75, rotate: 0 },
  { tx: -75, ty: 0, rotate: 90 },
];

const hearts = [
  { tx: -75, ty: -75, rotate: 135 },
  { tx: 75, ty: -75, rotate: -135 },
  { tx: -75, ty: 75, rotate: 45 },
  { tx: 75, ty: 75, rotate: -45 },
];

export default function HomeAnimation({ onComplete }) {
  const dAnim = useRef(new Animated.Value(0)).current;
  const diamondsAnim = useRef(diamonds.map(() => new Animated.Value(0))).current;
  const heartsAnim = useRef(hearts.map(() => new Animated.Value(0))).current;


  useEffect(() => {
    Animated.timing(dAnim, {
      toValue: 1,
      duration: 400,
      easing: Easing.bezier(0.34, 1.2, 0.64, 1),
      useNativeDriver: true,
    }).start();

    diamondsAnim.forEach((anim, i) => {
      Animated.timing(anim, {
        toValue: 1,
        duration: 1200,
        delay: (0.1 + i * 0.05) * 1000,
        easing: Easing.bezier(0.22, 1.4, 0.36, 1),
        useNativeDriver: true,
      }).start();
    });

    // Track heart animations and call onComplete after the last heart finishes
    const lastHeartIndex = hearts.length - 1;
    heartsAnim.forEach((anim, i) => {
      Animated.timing(anim, {
        toValue: 1,
        duration: 1200,
        delay: (1.1 + i * 0.05) * 1000,
        easing: Easing.bezier(0.22, 1.4, 0.36, 1),
        useNativeDriver: true,
      }).start(({ finished }) => {
        if (finished && i === lastHeartIndex && onComplete) {
          onComplete();
        }
      });
    });
  }, [dAnim, diamondsAnim, heartsAnim, onComplete]);


  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.centerLetterContainer,
          {
            opacity: dAnim,
            transform: [
              {
                scale: dAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0.7, 1],
                }),
              },
            ],
          },
        ]}
      >
        <Text style={styles.centerLetter}>D</Text>
      </Animated.View>

      {diamonds.map((d, i) => (
        <AnimatedPiece
          key={`diamond-${i}`}
          tx={d.tx}
          ty={d.ty}
          rotate={d.rotate}
          animValue={diamondsAnim[i]}
        >
          <DiamondSvg size={30} />
        </AnimatedPiece>
      ))}

      {hearts.map((h, i) => (
        <AnimatedPiece
          key={`heart-${i}`}
          tx={h.tx}
          ty={h.ty}
          rotate={h.rotate}
          animValue={heartsAnim[i]}
        >
          <HeartSvg size={68} />
        </AnimatedPiece>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 250,
    height: 250,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  centerLetterContainer: {
    position: 'absolute',
    zIndex: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  centerLetter: {
    fontSize: 110,
    fontWeight: 'bold',
    color: ORANGE,
    lineHeight: 110,
    textAlign: 'center',
    marginTop: 20,
    includeFontPadding: false,
  },
  pieceContainer: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
