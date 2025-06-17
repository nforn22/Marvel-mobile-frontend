import { StyleSheet, Platform } from "react-native";
import Constants from "expo-constants";

export const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    backgroundColor: "#222",
    height: 80 + Constants.statusBarHeight,
    paddingTop: Constants.statusBarHeight,
    zIndex: 1000,
  },
  logoContainer: {
    flexShrink: 0,
  },
  logo: {
    height: 45,
    width: 120,
  },
  actions: {
    flexDirection: "row",
    alignItems: "center",
  },
  navDesktop: {
    flexDirection: "row",
    alignItems: "center",
    display: "none",
  },
  navLink: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
    marginHorizontal: 10,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    textTransform: "uppercase",
  },
  burgerMenu: {
    marginLeft: 10,
    padding: 8,
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0,0,0,0.8)",
    zIndex: 999,
  },
  mobileMenu: {
    position: "absolute",
    top: 0,
    right: 0,
    width: 280,
    height: "100%",
    backgroundColor: "#222",
    paddingTop: 80,
    paddingHorizontal: 24,
    zIndex: 1000,
    justifyContent: "flex-start",
  },
  mobileNavLink: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 18,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#333",
    textTransform: "uppercase",
  },
  closeButton: {
    position: "absolute",
    top: 30,
    right: 20,
  },
});
