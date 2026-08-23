import React, { useRef } from 'react';
import {StyleSheet, Text, View, Animated, Easing, useColorScheme} from 'react-native';
import HomeAnimation from '../components/HomeAnimation';
import { Link } from 'expo-router';
import { Colors } from "../constants/Colors";

// themed components
import ThemedView from "../components/themedView";

const AnimatedLink = Animated.createAnimatedComponent(Link);

const Home = () => {
    const colorScheme = useColorScheme();
    const theme = Colors[colorScheme] ?? Colors.light;
    const textAnim = useRef(new Animated.Value(0)).current;
    const linkAnim = useRef(new Animated.Value(0)).current;

    const handleAnimationComplete = () => {
        Animated.timing(textAnim, {
            toValue: 1,
            duration: 600,
            easing: Easing.out(Easing.ease), // Smooth ease-out curve
            useNativeDriver: true,
        }).start();

        Animated.timing(linkAnim, {
            toValue: 1,
            duration: 600,
            delay: 600, // Allows textAnim to run first
            easing: Easing.out(Easing.ease),
            useNativeDriver: true,
        }).start();
    };

    const textAnimatedStyle = {
        opacity: textAnim,
        transform: [
            {
                translateY: textAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [15, 0], // Slight slide-up effect
                }),
            },
        ],
    };

    const linkAnimatedStyle = {
        opacity: linkAnim,
        transform: [
            {
                translateY: linkAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [15, 0], // Slight slide-up effect
                })
            }
        ]
    }

    return (
        <ThemedView style={styles.container}>
            <HomeAnimation onComplete={handleAnimationComplete} />
            <Animated.View style={[styles.textWrapper, textAnimatedStyle]}>
                <Text style={[styles.title, { color: theme.title}]}>
                    Domingo Restaurante
                </Text>
                <Text style={[ styles.text, { color: theme.textLight} ]}>
                    Tip out calculations made simple.
                </Text>
            </Animated.View>

            <AnimatedLink href="/login" style={[styles.link, { borderColor: theme.uiBackground, color: theme.textDark }, linkAnimatedStyle]}>
                Login
            </AnimatedLink>
        </ThemedView>
    );
};

export default Home;

const styles = StyleSheet.create({
    container: {
        position: 'relative',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    textWrapper: {
        alignItems: 'center',
        marginTop: 24,
    },
    title: {
        fontWeight: 'bold',
        fontSize: 30,
    },
    text: {
        marginTop: 6,
        fontSize: 16,
    },
    link: {
        position: 'absolute',
        bottom: 100,
        left: 50,
        right: 50,
        padding: 24,
        borderWidth: 2,
        borderRadius: 8,
        textAlign: 'center',
        fontSize: 16,
        fontWeight: '700'
    }
});