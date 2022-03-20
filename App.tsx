import { SafeAreaView, StyleSheet, Platform, StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import AlarmsNavigation from "./src/navigation/AlarmsNavigation";
import { AuthProvider } from "./src/context/AuthContext";

export default function App() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <NavigationContainer>
        <AuthProvider>
          <AlarmsNavigation />
        </AuthProvider>
      </NavigationContainer>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});
