import { collection, getDocs } from "firebase/firestore";
import db from "../FirebaseDB";

export const getVehicles = async () => {
  let vehicles = [];
  try {
    const response = await getDocs(collection(db, "vehicles"));
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
