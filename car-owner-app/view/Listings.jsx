import { View, StyleSheet, FlatList, Text } from "react-native";
import useFetchVehicleData from "../utils/useFetchVehicleData";
import Card from "../components/Card";
import StyledButton from "../components/StyledButton";
import { useNavigation } from "@react-navigation/native";
import StyledTextInput from "../components/StyledTextInput";
import { useEffect, useState } from "react";
import { useUserContext } from "../utils/UserContext";
import { showAlert } from "../utils/showAlert";

export default function Listings() {
  const [searchInput, setSearchInput] = useState("");
  const [vehicleList, setVehicleList] = useState([]);
  const { vehicles, loading, error } = useFetchVehicleData();
  const pilot = useNavigation();
  const { user } = useUserContext();

  useEffect(() => {
    if (searchInput != "") {
      const filteredVehicles = vehicles.filter((v) =>
        v.name.toLowerCase().includes(searchInput.toLowerCase())
      );
      setVehicleList(filteredVehicles);
    } else {
      if (!loading && error == null) {
        setVehicleList(vehicles);
      }
    }
  }, [searchInput]);

  useEffect(() => {
    setVehicleList(vehicles);
  }, [loading]);

  return (
    <View style={styles.view}>
      <View style={styles.row}>
        <StyledTextInput
          value={searchInput}
          onChangeText={setSearchInput}
          label="Make / Model / Trim"
        />
        <StyledButton
          text="Manual"
          action={
            user
              ? () => pilot.navigate("Post")
              : () =>
                  showAlert("Access denied", "You must be logged in", () =>
                    pilot.navigate("Login")
                  )
          }
          secondary
        />
      </View>
      {loading ? (
        <Text>Loading vehicle list...</Text>
      ) : (
        <FlatList
          data={vehicleList}
          renderItem={({ item }) => <Card vehicle={item} />}
          style={styles.list}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    width: "100%",
    flex: 1,
    paddingTop: 10,
    paddingHorizontal: 20,
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 10,
  },
  list: {
    display: "flex",
    flexDirection: "column",
    paddingTop: 10,
  },
  row: {
    display: "flex",
    flexDirection: "row",
    gap: 10,
  },
});
