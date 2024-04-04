import { db } from "../FirebaseDB"
import { collection, doc, getDocs, setDoc, query, where } from "firebase/firestore"
import { reverseGeocoding } from "../utils/locationUtils"

export const getAllVehicles = async () => {
    let vehicles = []

    try {
        const response = await getDocs(collection(db, "vehicles"))

        if (!response.empty) {
            response.forEach((doc) => { vehicles.push(doc.data()) })

            return vehicles
        } else { console.error(">>> ERROR: No such document!") }
    } catch (e) { console.error(">>> ERROR: Error fetching document: ", e) }
}

export const getVehiclesByLocation = async (location) => {
    let vehicles = []

    try {
        const response = await getDocs(collection(db, "vehicles"))

        if (!response.empty) {
            response.forEach((doc) => { 
                const userLocation = reverseGeocoding(location.lat, location.lon)
                const vehicleLocation = reverseGeocoding(doc.data().lat, doc.data().lon)

                if (userLocation.city === vehicleLocation.city) { vehicles.push(doc.data()) }
            })

            return vehicles
        } else { 
            console.error(">>> ERROR: No such document!") 
            return vehicles
        }
    } catch (e) { 
        console.error(">>> ERROR: Error fetching document: ", e) 
        return vehicles
    }
}

export const getAllVehiclesByUserEmail = async (email) => {
    let vehicles = []

    try {
        const resultQuery = query(collection(db, "vehicles"), where("bookedBy", "==", email))
        const response = await getDocs(resultQuery)

        if (!response.empty) {
            response.forEach((doc) => { vehicles.push(doc.data()) })

            return vehicles
        } else { 
            console.error(">>> ERROR: No such document!") 
            return vehicles
        }
    } catch (e) { console.error(">>> ERROR: Error fetching document: ", e) }
}

export const updateVehicle = async (vehicle) => {
    try {
        await setDoc(doc(db, "vehicles", vehicle.id), vehicle )
        console.log(">>> INFO: Vehicle updated!")
    } catch (e) {
        console.error(">>> ERROR: Error updating vehicle:", e)
        throw e
    }
}