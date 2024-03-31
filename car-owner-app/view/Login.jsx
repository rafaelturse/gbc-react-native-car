import { StyleSheet, View } from "react-native";
import StyledTextInput from "../components/StyledTextInput";
import { useState } from "react";
import StyledButton from "../components/StyledButton";
import { useNavigation } from "@react-navigation/native";
import { useUserContext } from "../utils/UserContext";
import { login } from "../utils/AuthActions";

export default function Login() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [loading, setLoading] = useState(false);
  const pilot = useNavigation();
  const { setUser } = useUserContext();

  return (
    <View style={styles.view}>
      <StyledTextInput value={email} onChangeText={setEmail} label="Email" />
      <StyledTextInput
        value={password}
        onChangeText={setPassword}
        label="Password"
      />
      <StyledButton
        text={loading ? "Signing in..." : "Login"}
        action={() => login(email, password, setUser, setLoading, pilot)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    paddingHorizontal: 20,
    paddingTop: 50,
  },
});
