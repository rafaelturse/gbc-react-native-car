import { StyleSheet, Text, View } from "react-native";
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
    updateVehicle(vehicle);
    getOwnedVehicles(user.email, setOwnedVehicles);
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
      componentToRender = <View />;
  }

  return (
    <View>
      <Text style={styles.booked}>Booked by: {vehicle.bookedBy}</Text>
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
  booked: {
    textAlign: "center",
    fontSize: 16,
    marginBottom: 5,
  },
});
