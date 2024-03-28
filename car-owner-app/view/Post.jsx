import { View, StyleSheet, Image, ScrollView } from "react-native";
import StyledButton from "../components/StyledButton";
import { useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import StyledTextInput from "../components/StyledTextInput";
import Carousel from "../components/Carousel";

export default function Post() {
  const [name, setName] = useState();
  const [seats, setSeats] = useState();
  const [range, setRange] = useState();
  const [year, setYear] = useState();
  const [doors, setDoors] = useState();
  const [horsepower, setHorsepower] = useState();
  const [acceleration, setAcceleration] = useState();
  const [images, setImages] = useState();
  const route = useRoute();
  const vehicle = route.params;

  useEffect(() => {
    //If there is a vehicle prop, pre populate the fields
    vehicle &&
      (setImages(vehicle.images),
      setName(`${vehicle.make} ${vehicle.model} ${vehicle.trim}`),
      setSeats(vehicle.seats_max.toString()),
      setRange(vehicle.total_range.toString()),
      setYear(vehicle.model_year.toString()),
      setDoors(vehicle.doors.toString()),
      setHorsepower(vehicle.horsepower.toString()),
      setAcceleration(vehicle.acceleration.toString()));
  }, []);

  return (
    <ScrollView style={styles.view}>
      {images ? (
        <View style={styles.carouselWrapper}>
          <Carousel images={images} />
        </View>
      ) : (
        <Image
          source={{
            uri: "https://storage.googleapis.com/proudcity/mebanenc/uploads/2021/03/placeholder-image.png",
          }}
          style={styles.image}
        />
      )}
      <StyledTextInput
        value={name}
        onChangeText={setName}
        label="Vehicle name"
      />
      <StyledTextInput
        value={seats}
        onChangeText={setSeats}
        label="Number of seats"
      />
      <StyledTextInput
        value={range}
        onChangeText={setRange}
        label="Vehicle range"
      />
      <StyledTextInput value={year} onChangeText={setYear} label="Model year" />
      <StyledTextInput
        value={doors}
        onChangeText={setDoors}
        label="Number of doors"
      />
      <StyledTextInput
        value={horsepower}
        onChangeText={setHorsepower}
        label="Horsepower"
      />
      <StyledTextInput
        value={acceleration}
        onChangeText={setAcceleration}
        label="Acceleration"
      />
      <StyledButton text="Submit" action={() => console.log("submit")} />
      <View style={styles.spacer} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  view: {
    width: "100%",
    flex: 1,
    padding: 20,
  },
  image: {
    width: "100%",
    height: 200,
  },
  carouselWrapper: {
    width: 331,
    height: 200,
    marginBottom: 15,
  },
  label: {
    fontSize: 18,
    marginRight: 10,
  },
  spacer: {
    height: 50,
  },
});
