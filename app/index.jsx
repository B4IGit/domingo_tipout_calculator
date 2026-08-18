import {StyleSheet, Text, View} from 'react-native';

const Home = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Domingo Restaurante</Text>
            <Text>Tip out calculations made simple.</Text>
        </View>
    )
}
export default Home;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        color: '#A34535',
        fontWeight: 'bold',
        fontSize: 24
    }
})