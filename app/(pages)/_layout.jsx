import {StyleSheet, Text, useColorScheme, View} from 'react-native';
import { Stack } from 'expo-router';
const RootLayout = () => {
    const colorScheme = useColorScheme();
    console.log(colorScheme);

    return (
        <Stack screenOptions={{
            headerStyle: { backgroundColor: '#EBEAE9' },
            headerTintColor: '#F26419'
        }}>
            <Stack.Screen name="login" options={{ headerShown: false }} />
        </Stack>
    )
}
export default RootLayout;

const styles = StyleSheet.create({})