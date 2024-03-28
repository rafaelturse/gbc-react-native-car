import { View, StyleSheet, FlatList, Text, Pressable } from "react-native";
import useFetchVehicleData from "../utils/useFetchVehicleData";
import Card from "../components/Card";

const Listing = () => {
  const { vehicles, loading } = useFetchVehicleData();

  return (
    <View style={styles.view}>
      <Text style={styles.header}>Listings</Text>
      <View style={styles.line} />
      <Text style={styles.info}>Select a car or fill manually</Text>
      <Pressable
        style={styles.button}
        onPress={() => console.log("navigate to form")}
      >
        <Text style={styles.buttonText}>Manual Input</Text>
      </Pressable>
      {!loading && (
        <FlatList
          data={vehicles}
          renderItem={({ item }) => <Card vehicle={item} />}
          style={styles.list}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    width: "100%",
    flex: 1,
  },
  header: {
    fontSize: 28,
    fontWeight: "bold",
    marginLeft: 20,
  },
  list: {
    display: "flex",
    flexDirection: "column",
    paddingTop: 10,
    paddingHorizontal: 10,
  },
  line: {
    width: "40%",
    height: 3,
    backgroundColor: "#fca311",
    marginLeft: 20,
    marginBottom: 5,
  },
  info: {
    fontSize: 18,
    marginLeft: 20,
    marginBottom: 5,
  },
  button: {
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginHorizontal: 30,
    shadowColor: "#284b63",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 0,
    borderWidth: 1,
    borderColor: "#284b63",
    marginBottom: 5,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
  },
});

export default Listing;

/*
const Listing = () => {
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
*/
