import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: '#1e1e1e',
        },
        headerTintColor: '#ed1d24', // pour le bouton retour et le titre du header natif expo
        headerTitleStyle: {
          color: '#ed1d24',
          fontWeight: 'bold',
        },
        headerShadowVisible: false,
      }}
    />
  );
}