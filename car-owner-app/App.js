import { StatusBar } from "expo-status-bar";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { useEffect } from "react";
import { getVehicles } from "./repository/vehicle/vehicleDBActions";
import VehicleManagement from "./view/vehicle/VehicleManagement";

export default function App() {
  useEffect(() => {
    getVehicles();
  }, []);

  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
      <VehicleManagement />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
