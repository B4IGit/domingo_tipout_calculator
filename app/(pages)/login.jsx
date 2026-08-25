import {StyleSheet, Text, View, useColorScheme} from 'react-native';
import {Link} from 'expo-router';
import {Colors} from "../../constants/Colors";

// themed components
import ThemedView from "../../components/themedView";

const Login = () => {
    const colorScheme = useColorScheme();
    const theme = Colors[colorScheme] ?? Colors.light;

    return (
        <ThemedView style={styles.container}>
            <Text style={styles.title}>Login Page</Text>
            <Link href="/" style={[{color: theme.textLight}]}>Back to Home</Link>
        </ThemedView>
    );
};
export default Login;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        color: '#F26419',
        fontWeight: 'bold',
        fontSize: 30,
    }
});