import { useState, useEffect } from "react";
import { View, StyleSheet, FlatList, Text } from "react-native";
import { getVehicles } from "../vehicleDBActions";

const VehicleManagement = () => {
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    const fetchVehicles = async () => {
      const vehiclesData = await getVehicles();
      setVehicles(vehiclesData);
    };
    fetchVehicles();
  }, []);

  const renderVehicleItem = ({ item }) => (
    <Text style={styles.vehicleItem}>{item.name}</Text>
  );

  return (
    <View>
      <FlatList data={vehicles} renderItem={renderVehicleItem} />
    </View>
  );
};

const styles = StyleSheet.create({
  line_container: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default VehicleManagement;
