import { useEffect, useState } from "react";
import { RefreshControl } from "react-native";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { useUserContext } from "../utils/UserContext";
import { getOwnedVehicles } from "../utils/DBActions";
import Card from "../components/Card";
import { useOwnedVehicleContext } from "../utils/OwnedVehicleContext";

export default function Management() {
  const { user } = useUserContext();
  const { ownedVehicles, setOwnedVehicles } = useOwnedVehicleContext();
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    getOwnedVehicles(user.email, setOwnedVehicles);
  }, []);

  useEffect(() => {}, [ownedVehicles]);

  const onRefresh = () => {
    setRefreshing(true);
    getOwnedVehicles(user.email, setOwnedVehicles).then(() =>
      setRefreshing(false)
    );
  };

  return (
    <View style={styles.view}>
      {ownedVehicles.length === 0 ? (
        <Text>No vehicles posted</Text>
      ) : (
        <FlatList
          data={ownedVehicles}
          renderItem={({ item }) => <Card vehicle={item} mgmnt />}
          style={styles.list}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={["#007aff"]}
            />
          }
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
