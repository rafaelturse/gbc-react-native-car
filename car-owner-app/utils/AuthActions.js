import { FirebaseAuth } from "../Firebase";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { getUser } from "./DBActions";

export const login = async (
  email,
  password,
  setUser,
  setLoading,
  pilot,
  setError
) => {
  setLoading(true);
  try {
    const response = await signInWithEmailAndPassword(
      FirebaseAuth,
      email,
      password
    );
    const user = await getUser(response.user.email);
    setUser(user);
    pilot.navigate("Home");
  } catch (error) {
    setError("Authentication error: Invalid credentials");
  } finally {
    setLoading(false);
  }
};

export const logout = (setUser) => {
  signOut(FirebaseAuth)
    .then(() => setUser(null))
    .catch((error) => console.log("Error trying to sign out:", error));
};
