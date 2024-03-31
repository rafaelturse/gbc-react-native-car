import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { FirebaseDB } from "../Firebase";

export const getVehicles = async () => {
  let vehicles = [];
  try {
    const response = await getDocs(collection(FirebaseDB, "vehicles"));
    if (!response.empty) {
      response.forEach((doc) => {
        vehicles.push(doc.data());
        console.log(`${doc.id} => ${doc.data().name}`);
      });
      return vehicles;
    } else {
      console.log("No such document!");
    }
  } catch (error) {
    console.error("Error fetching document: ", error);
  }
};

export const getUser = async (email) => {
  try {
    const response = await getDoc(doc(FirebaseDB, "users", email));
    if (response.exists()) {
      const user = response.data();
      return user;
    }
  } catch (error) {
    console.log("Error trying to get user", error);
  }
};
