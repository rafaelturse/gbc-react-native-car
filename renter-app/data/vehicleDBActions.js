import { db } from "../FirebaseDB"
import { collection, doc, getDocs, setDoc, query, where } from "firebase/firestore"

export const getAllVehicles = async () => {
    let vehicles = []

    try {
        const response = await getDocs(collection(db, "vehicles"))

        if (!response.empty) {
            response.forEach((doc) => {
                vehicles.push(doc.data())
                console.log(`>>> INFO: ${doc.id} Recovered ITEM => ${JSON.stringify(doc.data())}`)
            })

            return vehicles
        } else { console.error(">>> ERROR: No such document!") }
    } catch (e) { console.error(">>> ERROR: Error fetching document: ", e) }
}

export const getAllVehiclesByUserEmail = async (email) => {
    let vehicles = []

    try {
        const resultQuery = query(collection(db, "vehicles"), where("bookedBy", "==", email))
        const response = await getDocs(resultQuery)

        if (!response.empty) {
            response.forEach((doc) => {
                vehicles.push(doc.data())
                console.log(`>>> INFO: ${doc.id} Recovered ITEM => ${JSON.stringify(doc.data())}`)
            })

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