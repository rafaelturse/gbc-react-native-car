import { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { useUserContext } from "../utils/UserContext";
import { getOwnedVehicles } from "../utils/DBActions";
import Card from "../components/Card";

export default function Management() {
  const [vehicles, setVehicles] = useState([]);
  const { user } = useUserContext();

  useEffect(() => {
    const fetchVehicles = async () => {
      if (user?.email) {
        const retrievedVehicles = await getOwnedVehicles(user.email);
        setVehicles(retrievedVehicles);
      } else {
        setVehicles([]);
      }
    };

    fetchVehicles();
  }, [user]);

  return (
    <View style={styles.view}>
      {vehicles != null ? (
        <FlatList
          data={vehicles}
          renderItem={({ item }) => <Card vehicle={item} mgmnt />}
          style={styles.list}
        />
      ) : (
        <Text>Loading...</Text>
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
  list: {
    display: "flex",
    flexDirection: "column",
    paddingTop: 10,
  },
});
