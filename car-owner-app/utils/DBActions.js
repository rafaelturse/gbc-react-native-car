import {
  addDoc,
  arrayUnion,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { FirebaseDB } from "../Firebase";
import { showAlert } from "./showAlert";

// export const getVehicles = async () => {
//   let vehicles = [];
//   try {
//     const response = await getDocs(collection(FirebaseDB, "vehicles"));
//     if (!response.empty) {
//       response.forEach((doc) => {
//         vehicles.push(doc.data());
//         console.log(`${doc.id} => ${doc.data().name}`);
//       });
//       return vehicles;
//     } else {
//       console.log("No such document!");
//     }
//   } catch (error) {
//     console.error("Error fetching document: ", error);
//   }
// };

export const getUser = async (email) => {
  try {
    const response = await getDoc(
      doc(FirebaseDB, "users", email.toLowerCase())
    );
    if (response.exists()) {
      const user = response.data();
      return user;
    }
  } catch (error) {
    console.log("Error trying to get user", error);
  }
};

// export const saveUser = async (user) => {
//   try {
//     await setDoc(doc(FirebaseDB, "users", userData.email), user);

//     console.log("User document successfully saved!");
//   } catch (error) {
//     console.error("Error saving user document: ", error);
//   }
// };

// export const saveVehicle = async (vehicle) => {
//   try {
//     await setDoc(doc(FirebaseDB, "vehicles", vehicle.id), vehicle);

//     console.log("User document successfully saved!");
//   } catch (error) {
//     console.error("Error saving user document: ", error);
//   }
// };

// export const saveNewVehicleAndUpdateUser = async (vehicleData, userEmail) => {
//   try {
//     const vehicleRef = await addDoc(
//       collection(FirebaseDB, "vehicles"),
//       vehicleData
//     );

//     const userRef = doc(FirebaseDB, "users", userEmail);
//     await updateDoc(userRef, {
//       listings: arrayUnion(vehicleRef.id),
//     });

//     getOwnedVehicles(userEmail);
//     console.log("Vehicle created and user updated successfully!");
//   } catch (error) {
//     console.error("Error saving vehicle and updating user: ", error);
//     throw error;
//   }
// };

// export const saveVehicle = async (vehicleData) => {
//   try {
//     await addDoc(collection(FirebaseDB, "vehicles"), vehicleData);
//     console.log("Vehicle created successfully!");
//   } catch (error) {
//     console.error("Error saving vehicle:", error);
//     throw error;
//   }
// };

export const saveVehicle = async (vehicle) => {
  try {
    const docRef = await addDoc(collection(FirebaseDB, "vehicles"), vehicle);
    console.log("Vehicle created successfully!");

    const generatedId = docRef.id;

    await setDoc(doc(FirebaseDB, "vehicles", generatedId), {
      ...vehicle,
      id: generatedId,
    });

    console.log("Vehicle ID updated successfully!");
  } catch (error) {
    console.error("Error saving vehicle:", error);
    throw error;
  }
};

export const updateVehicle = async (vehicle) => {
  try {
    await setDoc(doc(FirebaseDB, "vehicles", vehicle.id), vehicle);

    console.log("Vehicle ID updated successfully!");
  } catch (error) {
    console.error("Error saving vehicle:", error);
    throw error;
  }
};

export const getOwnedVehicles = async (userEmail, setOwnedVehicles) => {
  try {
    let vehicles = [];
    const vehiclesRef = collection(FirebaseDB, "vehicles");

    const q = query(vehiclesRef, where("ownerEmail", "==", userEmail));
    const matchingVehicles = await getDocs(q);

    matchingVehicles.forEach((doc) => {
      vehicles.push(doc.data());
    });
    setOwnedVehicles(vehicles);
    console.log("DBActions.getOwnedVehicles: Owned vehicles retrieved!");
  } catch (error) {
    console.log("Error retrieving owned vehicles");
    throw error;
  }
};
