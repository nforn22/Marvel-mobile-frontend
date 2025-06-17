import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, TextInput, ActivityIndicator } from "react-native";
import axios from "axios";
import { router } from "expo-router";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

const API_URL = "https://site--marvel-backend--t29qzrn4njwx.code.run";
const PAGE_SIZE = 100;

export default function CharactersScreen() {
  const [characters, setCharacters] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const [search, setSearch] = useState("");
  const userToken = null; 

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const skip = (page - 1) * PAGE_SIZE;
        let url = `${API_URL}/characters?limit=${PAGE_SIZE}&skip=${skip}`;
        if (search) url += `&name=${encodeURIComponent(search)}`;
        const response = await axios.get(url);
        setCharacters(response.data.data?.results || []);
        setCount(response.data.data?.count || 0);
      } catch (error) {
        setError(error.response?.data?.message || error.message || "An error occurred while loading characters.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchCharacters();
  }, [page, search]);

  const totalPages = Math.ceil(count / PAGE_SIZE);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => router.push(`/characters/${item._id}/comics`)}
    >
      <Image
        source={{ uri: `${item.thumbnail.path}/portrait_xlarge.${item.thumbnail.extension}` }}
        style={styles.image}
      />
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.desc}>{item.description ? item.description : "No description."}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Marvel Characters</Text>
      <View style={styles.searchBar}>
        <TextInput
          style={styles.input}
          placeholder="Search characters..."
          placeholderTextColor="#888"
          value={search}
          onChangeText={setSearch}
          onSubmitEditing={() => setPage(1)}
        />
      </View>
      {isLoading ? (
        <ActivityIndicator size="large" color="#e62429" style={{ marginTop: 40 }} />
      ) : error ? (
        <Text style={styles.error}>{error}</Text>
      ) : characters.length === 0 ? (
        <Text style={styles.noResult}>No characters found.</Text>
      ) : (
        <>
          <FlatList
            data={characters}
            renderItem={renderItem}
            keyExtractor={item => item._id}
            contentContainerStyle={styles.list}
          />
          <View style={styles.pagination}>
            <TouchableOpacity
              style={[styles.pageBtn, page === 1 && styles.pageBtnDisabled]}
              onPress={() => setPage(page - 1)}
              disabled={page === 1}
            >
              <MaterialCommunityIcons name="arrow-left" size={24} color="#fff" />
            </TouchableOpacity>
            <Text style={styles.pageInfo}>{page} / {totalPages}</Text>
            <TouchableOpacity
              style={[styles.pageBtn, page === totalPages && styles.pageBtnDisabled]}
              onPress={() => setPage(page + 1)}
              disabled={page === totalPages}
            >
              <MaterialCommunityIcons name="arrow-right" size={24} color="#fff" />
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#1a1a1a", padding: 10 },
  title: { color: "#fff", fontSize: 24, fontWeight: "bold", textAlign: "center", marginVertical: 10 },
  searchBar: { flexDirection: "row", marginBottom: 10, justifyContent: "center" },
  input: { backgroundColor: "#232323", color: "#fff", borderRadius: 8, padding: 8, flex: 1, maxWidth: 300 },
  list: { paddingBottom: 20 },
  card: { backgroundColor: "#232323", borderRadius: 12, padding: 12, marginBottom: 12, alignItems: "center" },
  image: { width: 100, height: 100, borderRadius: 50, marginBottom: 8 },
  name: { color: "#fff", fontWeight: "bold", fontSize: 18, marginBottom: 4 },
  desc: { color: "#ccc", fontSize: 13, textAlign: "center" },
  error: { color: "#e62429", textAlign: "center", marginTop: 20 },
  noResult: { color: "#fff", textAlign: "center", marginTop: 40, fontSize: 16 },
  pagination: { flexDirection: "row", justifyContent: "center", alignItems: "center", marginTop: 10 },
  pageBtn: { backgroundColor: "#ed1d24", borderRadius: 8, padding: 8, marginHorizontal: 10 },
  pageBtnDisabled: { backgroundColor: "#444" },
  pageBtnText: { color: "#fff", fontWeight: "bold" },
  pageInfo: { color: "#fff", fontSize: 16, minWidth: 50, textAlign: "center" },
});