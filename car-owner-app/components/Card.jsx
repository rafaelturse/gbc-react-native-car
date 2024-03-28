import React from "react";
import { View, Text, Image, StyleSheet, Pressable } from "react-native";
import Carousel from "./Carousel";
import StyledButton from "./StyledButton";
import { useNavigation } from "@react-navigation/native";

const Card = ({ vehicle }) => {
  const pilot = useNavigation();

  return (
    <View style={styles.card}>
      <Carousel images={vehicle.images} />
      <View style={styles.details}>
        <Text
          style={styles.name}
        >{`${vehicle.make} ${vehicle.model} ${vehicle.trim}`}</Text>
        <View style={styles.line} />
        <View style={styles.row}>
          <View style={styles.column}>
            <Text style={styles.info}>{`Seats: ${vehicle.seats_max}`}</Text>
            <Text style={styles.info}>{`Range: ${vehicle.total_range}km`}</Text>
            <Text style={styles.info}>{`Year: ${vehicle.model_year}`}</Text>
          </View>

          <View style={styles.column}>
            <Text style={styles.info}>{`Doors: ${vehicle.doors}`}</Text>
            <Text
              style={styles.info}
            >{`Horsepower: ${vehicle.horsepower}`}</Text>
            <Text
              style={styles.info}
            >{`Acceleration: ${vehicle.acceleration}`}</Text>
          </View>
        </View>
        <StyledButton
          text="Select"
          action={() => pilot.navigate("Form", vehicle)}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    marginBottom: 30,
    marginHorizontal: 10,
    shadowColor: "#284b63",
    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowOpacity: 1,
    shadowRadius: 0,
    borderWidth: 1,
    borderColor: "#14213d",
    flexDirection: "column",
  },
  image: {
    width: "100%",
    maxheight: 250,
    aspectratio: 4 / 3,
    alignself: "center",
  },
  details: {
    justifyContent: "center",
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    marginHorizontal: 20,
    marginBottom: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
    alignSelf: "center",
  },
  info: {
    fontSize: 16,
    marginBottom: 2,
  },
  line: {
    width: "70%",
    height: 3,
    backgroundColor: "#fca311",
    marginBottom: 20,
    alignSelf: "center",
  },
  row: {
    display: "flex",
    flexDirection: "row",
    marginBottom: 10,
  },
  column: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
  },
});

export default Card;
