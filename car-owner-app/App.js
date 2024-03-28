import { SafeAreaView, StyleSheet } from "react-native";
import Listing from "./view/Listing";
import Form from "./view/Form";

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <Listing />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#14213d11",
  },
});
