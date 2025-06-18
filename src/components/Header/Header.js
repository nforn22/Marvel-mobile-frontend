import React, { useState, useContext } from "react";
import { View, Text, Image, TouchableOpacity, Modal, Pressable } from "react-native";
import { styles } from "./Header.styles";
import marvelLogo from "../../../assets/Marvel-logo.png";
import { Ionicons } from '@expo/vector-icons';
import { router } from "expo-router";
import { AuthContext } from "../../../app/_layout";

export const Header = ({
  onOpenSignupModal,
  onOpenLoginModal,
  userToken,
  setUserToken,
  onNavigate,
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { token, logout } = useContext(AuthContext);

  const handleLogout = () => {
    if (logout) logout();
    setIsMobileMenuOpen(false);
  };

  const handleNavigate = (route) => {
    if (route === "Characters") {
      router.push("/characters");
    } else if (route === "Comics") {
      router.push("/comics");
    } else if (route === "Favorites") {
      router.push("/favorites"); // TODO : implementer logique réelle
    } else if (onNavigate) {
      onNavigate(route);
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => handleNavigate("Home")} style={styles.logoContainer}>
          <Image source={marvelLogo} style={styles.logo} resizeMode="contain" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.burgerMenu}
          onPress={() => setIsMobileMenuOpen(true)}
        >
          <Ionicons name="menu" size={32} color="#fff" />
        </TouchableOpacity>
      </View>
      <Modal
        visible={isMobileMenuOpen}
        animationType="slide"
        transparent
        onRequestClose={() => setIsMobileMenuOpen(false)}
      >
        <Pressable style={styles.overlay} onPress={() => setIsMobileMenuOpen(false)} />
        <View style={styles.mobileMenu}>
          <TouchableOpacity onPress={() => handleNavigate("Characters")}> 
            <Text style={styles.mobileNavLink}>Characters</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleNavigate("Comics")}> 
            <Text style={styles.mobileNavLink}>Comics</Text>
          </TouchableOpacity>
          {token ? (
            <>
              <TouchableOpacity onPress={() => handleNavigate("Favorites")}> 
                <Text style={styles.mobileNavLink}>Favorites</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleLogout}> 
                <Text style={styles.mobileNavLink}>Log out</Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              <TouchableOpacity onPress={() => { router.push('/auth/signup'); setIsMobileMenuOpen(false); }}> 
                <Text style={styles.mobileNavLink}>Sign up</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => { router.push('/auth/login'); setIsMobileMenuOpen(false); }}>
                <Text style={styles.mobileNavLink}>Log in</Text>
              </TouchableOpacity>
            </>
          )}
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setIsMobileMenuOpen(false)}
          >
            <Ionicons name="close" size={32} color="#fff" />
          </TouchableOpacity>
        </View>
      </Modal>
    </>
  );
};
