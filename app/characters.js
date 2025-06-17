import { View, Text, StyleSheet } from "react-native";

export default function CharactersScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Page Characters (à compléter)</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1a1a1a",
  },
  title: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
  },
});