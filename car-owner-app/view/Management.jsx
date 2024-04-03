import { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { useUserContext } from "../utils/UserContext";
import { getOwnedVehicles } from "../utils/DBActions";
import Card from "../components/Card";
import { useOwnedVehicleContext } from "../utils/OwnedVehicleContext";

export default function Management() {
  const { user } = useUserContext();
  const { ownedVehicles, setOwnedVehicles } = useOwnedVehicleContext();

  useEffect(() => {
    getOwnedVehicles(user.email, setOwnedVehicles);
  }, []);

  useEffect(() => {}, [ownedVehicles]);

  return (
    <View style={styles.view}>
      {ownedVehicles.length === 0 ? (
        <Text>No vehicles posted</Text>
      ) : (
        <FlatList
          data={ownedVehicles}
          renderItem={({ item }) => <Card vehicle={item} mgmnt />}
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
  list: {
    display: "flex",
    flexDirection: "column",
    paddingTop: 10,
  },
});
