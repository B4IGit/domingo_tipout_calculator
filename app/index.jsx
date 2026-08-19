import React, { useRef } from 'react';
import { StyleSheet, Text, View, Animated, Easing } from 'react-native';
import HomeAnimation from '../components/HomeAnimation';
import { Link } from 'expo-router';

const AnimatedLink = Animated.createAnimatedComponent(Link);

const Home = () => {
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
        <View style={styles.container}>
            <HomeAnimation onComplete={handleAnimationComplete} />
            <Animated.View style={[styles.textWrapper, textAnimatedStyle]}>
                <Text style={styles.title}>
                    Domingo Restaurante
                </Text>
                <Text style={styles.text}>
                    Tip out calculations made simple.
                </Text>
            </Animated.View>

            <AnimatedLink href="/login" style={[styles.link, linkAnimatedStyle]}>
                Login
            </AnimatedLink>
        </View>
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
        color: '#F26419',
        fontWeight: 'bold',
        fontSize: 30,
    },
    text: {
        color: '#666666',
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
        borderColor: '#F26419',
        borderRadius: 8,
        textAlign: 'center',
        fontSize: 16,
        fontWeight: '700'
    }
});