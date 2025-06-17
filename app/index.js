import { View, ScrollView, TouchableOpacity, Text, ImageBackground } from "react-native";
import { router } from "expo-router";
import { Header } from "../src/components/Header/Header";
import { styles } from "../src/components/Home/HomeScreen.styles";

export default function HomeScreen() {
  // callbacks pour les boutons
  const handleExploreHeroes = () => {
    router.push('/characters');
  };
  const handleDiscoverComics = () => {
    router.push('/comics');
  };

  return (
    <View style={{ flex: 1 }}>
      <Header />
      <ScrollView contentContainerStyle={styles.container}>
        <ImageBackground
          source={require("../assets/bg-home.jpg")}
          style={styles.backgroundImage}
          resizeMode="cover"
        >
          <View style={styles.heroSection}>
            <Text style={styles.heroTitle}>Marvel Explorer</Text>
            <Text style={styles.heroSubtitle}>
              Découvrez l'univers Marvel comme jamais auparavant.{"\n"}Explorez des milliers de personnages et de comics.
            </Text>
            <View style={styles.heroButtons}>
              <TouchableOpacity style={styles.heroBtnPrimary} onPress={handleExploreHeroes}>
                <Text style={styles.heroBtnText}>Explore Heroes</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.heroBtnSecondary} onPress={handleDiscoverComics}>
                <Text style={styles.heroBtnText}>Discover Comics</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.featuresSection}>
            <Text style={styles.featuresTitle}>Explore Marvel's Universe</Text>
            <View style={styles.featuresGrid}>
              <View style={styles.featureCard}>
                <Text style={styles.featureIcon}>🦸‍♂️</Text>
                <Text style={styles.featureCardTitle}>Iconic Characters</Text>
                <Text style={styles.featureCardText}>
                  Découvrez des milliers de super-héros et super-vilains Marvel avec leurs histoires, pouvoirs et apparitions dans les comics.
                </Text>
              </View>
              <View style={styles.featureCard}>
                <Text style={styles.featureIcon}>📚</Text>
                <Text style={styles.featureCardTitle}>Comics Collection</Text>
                <Text style={styles.featureCardText}>
                  Parcourez une vaste bibliothèque de comics Marvel avec tous les détails sur chaque numéro et série.
                </Text>
              </View>
              <View style={styles.featureCard}>
                <Text style={styles.featureIcon}>⭐</Text>
                <Text style={styles.featureCardTitle}>Your Favorites</Text>
                <Text style={styles.featureCardText}>
                  Créez votre collection personnelle en ajoutant vos personnages et comics préférés à votre liste de favoris.
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.statsSection}>
            <View style={styles.statsContainer}>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>1500+</Text>
                <Text style={styles.statLabel}>Characters</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>50K+</Text>
                <Text style={styles.statLabel}>Comics</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>80+</Text>
                <Text style={styles.statLabel}>Years of History</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>∞</Text>
                <Text style={styles.statLabel}>Adventures</Text>
              </View>
            </View>
          </View>
        </ImageBackground>
      </ScrollView>
    </View>
  );
}
