import { Stack } from "expo-router";
import { createContext, useState } from "react";

export const AuthContext = createContext();

export default function Layout() {
  const [token, setToken] = useState(null);
  const login = (token) => setToken(token);
  const logout = () => setToken(null);

  return (
    <AuthContext.Provider value={{ token, login, logout }}> 
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: '#1e1e1e',
        },
        headerTintColor: '#ed1d24',
        headerTitleStyle: {
          color: '#ed1d24',
          fontWeight: 'bold',
        },
        headerShadowVisible: false,
      }}
    />
    </AuthContext.Provider>
  );
}