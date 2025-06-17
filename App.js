import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { Header } from './src/components/Header/Header';
import { HomeScreen } from './src/components/Home/HomeScreen';

export default function App() {
  // callbacks fictifs pour les boutons
  const handleExploreHeroes = () => {
    alert('Explore Heroes !');
  };
  const handleDiscoverComics = () => {
    alert('Discover Comics !');
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <Header />
      <HomeScreen
        onExploreHeroes={handleExploreHeroes}
        onDiscoverComics={handleDiscoverComics}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
  },
});
