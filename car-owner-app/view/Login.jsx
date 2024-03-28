import { StyleSheet, View } from "react-native";
import StyledTextInput from "../components/StyledTextInput";
import { useState } from "react";
import StyledButton from "../components/StyledButton";

export default function Login() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  return (
    <View style={styles.view}>
      <StyledTextInput value={email} onChangeText={setEmail} label="Email" />
      <StyledTextInput
        value={password}
        onChangeText={setPassword}
        label="Password"
      />
      <StyledButton text="Login" action={() => console.log("Authenticate")} />
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    paddingHorizontal: 20,
    paddingTop: 50,
  },
});
