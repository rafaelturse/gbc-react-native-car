import { Image, StyleSheet, Text, View } from "react-native";
import StyledButton from "./StyledButton";
import { getOwnedVehicles, updateVehicle } from "../utils/DBActions";
import { useUserContext } from "../utils/UserContext";
import { useOwnedVehicleContext } from "../utils/OwnedVehicleContext";

const CardBookingSection = ({ vehicle }) => {
  const { user } = useUserContext();
  const { setOwnedVehicles } = useOwnedVehicleContext();

  const handleVehicleUpdate = (status) => {
    vehicle.bookingStatus = status;
    status === "confirmed" && (vehicle.bookedCode = generateConfirmationCode());
    updateVehicle(vehicle).then(() =>
      getOwnedVehicles(user.email, setOwnedVehicles)
    );
  };

  const generateConfirmationCode = () => {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let code = "";

    for (let i = 0; i < 9; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      code += characters.charAt(randomIndex);
    }

    return code;
  };

  let componentToRender;

  switch (vehicle.bookingStatus) {
    case "confirmed":
      componentToRender = <Text style={styles.accepted}>Accepted</Text>;
      break;
    case "declined":
      componentToRender = <Text style={styles.rejected}>Declined</Text>;
      break;
    case "pending":
      componentToRender = (
        <View style={styles.buttonGroup}>
          <StyledButton
            text="Accept"
            action={() => handleVehicleUpdate("confirmed")}
            accept
          />
          <StyledButton
            text="Reject"
            action={() => handleVehicleUpdate("declined")}
            reject
          />
        </View>
      );
      break;
    default:
      componentToRender = <Text style={styles.notBooked}>Not booked</Text>;
  }

  return (
    <View style={styles.column}>
      <View style={styles.row}>
        <Text style={styles.price}>${vehicle.price}</Text>
        <Text style={styles.info}>Plate: {vehicle.licensePlate}</Text>
      </View>
      {vehicle.bookedBy && (
        <View style={styles.row}>
          <View style={styles.column}>
            <View style={styles.rowStart}>
              <Image
                source={{ uri: vehicle.renterPhoto }}
                style={styles.image}
              />
              <Text style={styles.subheader}>
                {vehicle.renterName ? vehicle.renterName : "N/A"}
              </Text>
            </View>
          </View>

          <View style={styles.column}>
            <Text style={styles.info}>
              Date: {vehicle.futureDate ? vehicle.futureDate : "N/A"}
            </Text>
            <Text style={styles.info}>
              Code: {vehicle.bookedCode ? vehicle.bookedCode : "N/A"}
            </Text>
          </View>
        </View>
      )}
      {componentToRender}
    </View>
  );
};

export default CardBookingSection;

const styles = StyleSheet.create({
  buttonGroup: {
    display: "flex",
    flexDirection: "row",
    gap: 10,
  },
  row: {
    display: "flex",
    flexDirection: "row",
    marginBottom: 10,
    alignItems: "center",
    justifyContent: "space-around",
  },
  column: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
  },
  accepted: {
    fontSize: 22,
    width: "100%",
    textAlign: "center",
    color: "#6a994e",
    marginVertical: 10,
  },
  rejected: {
    fontSize: 22,
    width: "100%",
    textAlign: "center",
    color: "#bc4749",
    marginVertical: 10,
  },
  notBooked: {
    fontSize: 22,
    width: "100%",
    textAlign: "center",
    color: "#fca311",
    marginVertical: 10,
  },
  info: {
    fontSize: 16,
    alignSelf: "center",
  },
  price: {
    color: "#14213d",
    fontSize: 20,
    fontWeight: "bold",
  },
  subheader: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#14213d",
    alignSelf: "center",
  },
  image: {
    width: 50,
    height: 50,
    objectFit: "contain",
    borderWidth: 2,
    borderRadius: 9999,
  },
  rowStart: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: 5,
    alignSelf: "center",
  },
});
