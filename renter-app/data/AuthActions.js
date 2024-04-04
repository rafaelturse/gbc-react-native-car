import { FirebaseAuth } from "../FirebaseDB"
import { signInWithEmailAndPassword, signOut } from "firebase/auth"
import { getUser } from './UserDBActions'

export const login = async (
  email,
  password,
  setUser,
  setLoading,
  pilot,
  setError
) => {
  setLoading(true)
  try {
    const user = await getUser(email)
    if (user) {
      if (user.role === "renter") {
        await signInWithEmailAndPassword(FirebaseAuth, email, password);
        setUser(user);
        pilot.navigate("Home")
      } else { setError("Error: User is not an 'renter'") }
    } else { setError("Error: User not found") }
  } catch (error) {
    setError("Error: Invalid credentials")
  } finally { setLoading(false) }
}

export const logout = (setUser) => {
  signOut(FirebaseAuth)
    .then(() => setUser(null))
    .catch((error) => console.log(">>> ERROR: Error trying to sign out:", error))
};
