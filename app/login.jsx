import { StyleSheet, Text, View } from 'react-native';
import { Link } from 'expo-router';

const Login = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Login Page</Text>

            <Link href="/">Back to Home</Link>
        </View>
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