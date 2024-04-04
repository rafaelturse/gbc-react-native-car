import { db } from "../FirebaseDB"
import { doc, getDoc } from "firebase/firestore"

export const getUser = async (email) => {
  try {
    const response = await getDoc(doc(db, "users", email.toLowerCase()))
    if (response.exists()) {
      const user = response.data()
      return user
    }
  } catch (e) { console.log(">>> ERROR: Error trying to get user: ", e) }
}