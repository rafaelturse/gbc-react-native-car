import { View, StyleSheet, FlatList } from "react-native";
import useFetchVehicleData from "../utils/useFetchVehicleData";
import Card from "../components/Card";
import StyledButton from "../components/StyledButton";
import { useNavigation } from "@react-navigation/native";
import StyledTextInput from "../components/StyledTextInput";
import { useEffect, useState } from "react";

export default function Listings() {
  const [searchInput, setSearchInput] = useState("");
  const [vehicleList, setVehicleList] = useState();
  const { vehicles, loading } = useFetchVehicleData();
  const pilot = useNavigation();

  useEffect(() => {
    if (!loading && searchInput != "") {
      const filteredVehicles = vehicles.filter(
        (vehicle) =>
          vehicle.make
            .toLowerCase()
            .includes(searchInput.toLocaleLowerCase()) ||
          vehicle.model
            .toLowerCase()
            .includes(searchInput.toLocaleLowerCase()) ||
          vehicle.trim.toLowerCase().includes(searchInput.toLocaleLowerCase())
      );
      setVehicleList(filteredVehicles);
    } else {
      setVehicleList(vehicles);
    }
  }, [searchInput]);

  useEffect(() => {
    !loading && setVehicleList(vehicles);
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
          //TODO: action = logged in ? post : login
          action={() => pilot.navigate("Post")}
          secondary
        />
      </View>
      <FlatList
        data={vehicleList}
        renderItem={({ item }) => <Card vehicle={item} />}
        style={styles.list}
      />
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
