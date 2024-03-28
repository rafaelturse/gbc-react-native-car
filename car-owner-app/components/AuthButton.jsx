import { StyleSheet, View } from "react-native";
import StyledButton from "./StyledButton";
import { useNavigation } from "@react-navigation/native";

const AuthButton = () => {
  const pilot = useNavigation();

  return (
    <View style={styles.container}>
      <StyledButton text="Login" action={() => pilot.navigate("Login")} small />
    </View>
  );
};
export default AuthButton;

const styles = StyleSheet.create({
  container: {
    maxWidth: 100,
  },
});
