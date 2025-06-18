import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, TextInput, ActivityIndicator, Modal, Pressable } from "react-native";
import { Stack } from "expo-router";
import { Ionicons } from '@expo/vector-icons';
import { styles as headerStyles } from "../src/components/Header/Header.styles";
import { router } from "expo-router";
// import captainAmericaIcon from "../assets/icons8-captain-america-64.png"; // ajoute l'icon et implémenter plus tard (favoris)

const API_URL = "https://site--marvel-backend--t29qzrn4njwx.code.run";
const PAGE_SIZE = 100;

export default function ComicsScreen() {
  const [comics, setComics] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const [search, setSearch] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  // const [favorites, setFavorites] = useState([]); // TODO : plus tard
  const userToken = null; // à activer quand l'auth sera implementé

  useEffect(() => {
    const fetchComics = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const skip = (page - 1) * PAGE_SIZE;
        let url = `${API_URL}/comics?limit=${PAGE_SIZE}&skip=${skip}`;
        if (search) {
          url += `&title=${encodeURIComponent(search)}`;
        }
        const response = await fetch(url);
        const data = await response.json();
        setComics(data.data?.results || []);
        setCount(data.data?.count || 0);
      } catch (error) {
        setError(error.message || "An error occurred while loading comics.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchComics();
  }, [page, search]);

  const totalPages = Math.ceil(count / PAGE_SIZE);

  const handleLogout = () => {
    // setUserToken && setUserToken(null); // à activer quand l'auth sera implementé
    setIsMobileMenuOpen(false);
  };

  const handleNavigate = (route) => {
    if (route === "Characters") {
      router.replace("/characters");
    } else if (route === "Comics") {
      router.replace("/comics");
    } else if (route === "Favorites") {
      router.replace("/favorites");
    } else if (route === "Home") {
      router.replace("/");
    }
    setIsMobileMenuOpen(false);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      // onPress={() => router.push(`/comics/${item._id}`)} // plus tard
      activeOpacity={0.8}
    >
      <Image
        source={{ uri: `${item.thumbnail.path}/portrait_xlarge.${item.thumbnail.extension}` }}
        style={styles.image}
      />
      {/*
      <TouchableOpacity
        style={[styles.favoriteBtn, favorites.includes(item._id) ? styles.favoriteActive : styles.favoriteInactive]}
        onPress={event => { event.stopPropagation(); /* handleToggleFavorite(item._id); */ /* }}
        disabled
      >
        <Image source={captainAmericaIcon} style={styles.favoriteIcon} />
      </TouchableOpacity>
      */}
      <Text style={styles.comicTitle}>{item.title}</Text>
      <Text style={styles.comicDesc}>{item.description ? item.description : "No description."}</Text>
    </TouchableOpacity>
  );

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
        <View style={styles.searchBar}>
          <TextInput
            style={styles.input}
            placeholder="Search comics..."
            placeholderTextColor="#888"
            value={search}
            onChangeText={setSearch}
            onSubmitEditing={() => setPage(1)}
            returnKeyType="search"
          />
        </View>
        {isLoading ? (
          <ActivityIndicator size="large" color="#e62429" style={{ marginTop: 40 }} />
        ) : error ? (
          <Text style={styles.error}>{error}</Text>
        ) : (
          <>
            <FlatList
              data={comics}
              renderItem={renderItem}
              keyExtractor={item => item._id}
              contentContainerStyle={styles.list}
              numColumns={1}
              ListEmptyComponent={<Text style={styles.noResult}>No comics found.</Text>}
            />
            <View style={styles.pagination}>
              <TouchableOpacity
                style={[styles.pageBtn, page === 1 && styles.pageBtnDisabled]}
                onPress={() => setPage(page - 1)}
                disabled={page === 1}
              >
                <Ionicons name="arrow-back" size={24} color="#fff" />
              </TouchableOpacity>
              <Text style={styles.pageInfo}>{page} / {totalPages}</Text>
              <TouchableOpacity
                style={[styles.pageBtn, page === totalPages && styles.pageBtnDisabled]}
                onPress={() => setPage(page + 1)}
                disabled={page === totalPages}
              >
                <Ionicons name="arrow-forward" size={24} color="#fff" />
              </TouchableOpacity>
            </View>
          </>
        )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1a1a1a",
    padding: 10,
  },
  title: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 10,
    textTransform: "uppercase",
    letterSpacing: 2,
  },
  searchBar: {
    flexDirection: "row",
    marginBottom: 10,
    justifyContent: "center",
  },
  input: {
    backgroundColor: "#232323",
    color: "#fff",
    borderRadius: 8,
    padding: 8,
    flex: 1,
    maxWidth: 300,
  },
  list: {
    paddingBottom: 20,
  },
  card: {
    backgroundColor: "#232323",
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  image: {
    width: "100%",
    height: 320,
    borderRadius: 8,
    marginBottom: 8,
    resizeMode: "cover",
  },
  comicTitle: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 4,
    textAlign: "center",
  },
  comicDesc: {
    color: "#ccc",
    fontSize: 13,
    textAlign: "center",
    marginBottom: 8,
  },
  error: {
    color: "#e62429",
    textAlign: "center",
    marginTop: 20,
  },
  noResult: {
    color: "#fff",
    textAlign: "center",
    marginTop: 40,
    fontSize: 16,
  },
  pagination: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  pageBtn: {
    backgroundColor: "#ed1d24",
    borderRadius: 8,
    padding: 8,
    marginHorizontal: 10,
  },
  pageBtnDisabled: {
    backgroundColor: "#444",
  },
  pageInfo: {
    color: "#fff",
    fontSize: 16,
    minWidth: 50,
    textAlign: "center",
  },
  /* TODO : ajouter les favoris
  favoriteBtn: {
    position: "absolute",
    top: 8,
    right: 8,
    backgroundColor: "transparent",
    borderWidth: 0,
    zIndex: 2,
  },
  favoriteActive: {
    opacity: 1,
  },
  favoriteInactive: {
    opacity: 0.4,
  },
  favoriteIcon: {
    width: 32,
    height: 32,
  },
  */
});
