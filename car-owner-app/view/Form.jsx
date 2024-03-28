import { View, StyleSheet, Text, Pressable } from "react-native";
import useFetchVehicleData from "../utils/useFetchVehicleData";

const Form = () => {
  return (
    <View style={styles.view}>
      <Text>Form</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    width: "100%",
    flex: 1,
  },
});

export default Form;
