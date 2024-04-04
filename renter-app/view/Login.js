import { useState } from "react"
import { StyleSheet, View, Text } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { useUserContext } from "../utils/UserContext"
import { login } from "../data/AuthActions"
import StyledTextInput from "../components/StyledTextInput"
import StyledButton from "../components/StyledButton"

export default Login = () => {

  const pilot = useNavigation()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const { setUser } = useUserContext()

  const validateEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const validatePassword = () => { return password.length >= 6 }

  const handleLogin = () => {
    setError("")
    if (!validateEmail()) {
      setError("Please enter a valid email address.")
    } else if (!validatePassword()) {
      setError("Password must be at least 6 characters long.")
    } else { login(email, password, setUser, setLoading, pilot, setError) }
  }

  return (
    <View style={styles.view}>
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <StyledTextInput value={email} onChangeText={setEmail} label="Email" />
      <StyledTextInput
        value={password}
        onChangeText={setPassword}
        label="Password"
        secureTextEntry
      />
      <StyledButton
        text={loading ? "Signing in..." : "Login"}
        action={handleLogin}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  view: {
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  error: {
    color: "red",
    marginBottom: 10,
  },
})
