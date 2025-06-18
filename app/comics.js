import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Modal, Pressable } from "react-native";
import { Stack } from "expo-router";
import { Ionicons } from '@expo/vector-icons';
import { styles as headerStyles } from "../src/components/Header/Header.styles";
import { router } from "expo-router";

export default function ComicsScreen() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const userToken = null; // à activer quand l'auth sera implementé

  const handleLogout = () => {
    // setUserToken && setUserToken(null); // à activer quand l'auth sera implementé
    setIsMobileMenuOpen(false);
  };

  const handleNavigate = (route) => {
    if (route === "Characters") {
      router.push("/characters");
    } else if (route === "Comics") {
      router.push("/comics");
    } else if (route === "Favorites") {
      router.push("/favorites");
    } else if (route === "Home") {
      router.push("/");
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: "Comics",
          headerBackTitle: "Home",
          headerRight: () => (
            <TouchableOpacity style={headerStyles.burgerMenu} onPress={() => setIsMobileMenuOpen(true)}>
              <Ionicons name="menu" size={28} color="#fff" />
            </TouchableOpacity>
          ),
        }}
      />
      <Modal
        visible={isMobileMenuOpen}
        animationType="slide"
        transparent
        onRequestClose={() => setIsMobileMenuOpen(false)}
      >
        <Pressable style={headerStyles.overlay} onPress={() => setIsMobileMenuOpen(false)} />
        <View style={headerStyles.mobileMenu}>
          <TouchableOpacity onPress={() => handleNavigate("Characters")}> 
            <Text style={headerStyles.mobileNavLink}>Characters</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleNavigate("Comics")}> 
            <Text style={headerStyles.mobileNavLink}>Comics</Text>
          </TouchableOpacity>
          {userToken && (
            <TouchableOpacity onPress={() => handleNavigate("Favorites")}> 
              <Text style={headerStyles.mobileNavLink}>Favorites</Text>
            </TouchableOpacity>
          )}
          {userToken ? (
            <TouchableOpacity onPress={handleLogout}> 
              <Text style={headerStyles.mobileNavLink}>Log out</Text>
            </TouchableOpacity>
          ) : null}
          <TouchableOpacity
            style={headerStyles.closeButton}
            onPress={() => setIsMobileMenuOpen(false)}
          >
            <Ionicons name="close" size={32} color="#fff" />
          </TouchableOpacity>
        </View>
      </Modal>
      <View style={styles.container}>
        <Text style={styles.title}>Marvel Comics</Text>
        <Text style={styles.subtitle}>Coming soon...</Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1a1a1a",
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subtitle: {
    color: "#ccc",
    fontSize: 16,
  },
});
