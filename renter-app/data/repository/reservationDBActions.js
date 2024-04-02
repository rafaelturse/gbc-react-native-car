import { db } from "../../FirebaseDB"
import { collection, addDoc } from "firebase/firestore"

export const saveReservation = async (reservation) => {
    console.log(`>>> INFO: Saving reservation ${reservation}`)

    try {
        await addDoc(collection(db, "reservations"), reservation)

        console.log(">>> INFO: Reservation document successfully saved!")
    } catch (e) {
        console.error(">>> ERROR: Error saving reservation document: ", e)
    }
}

export const getAllReservations = async () => {
    let reservations = []

    try {
        const response = await getDocs(collection(db, "reservations"))

        if (!response.empty) {
            response.forEach((doc) => {
                reservations.push(doc.data())
                console.log(`>>> INFO: ${doc.id} Recovered RESERVATIONS => ${JSON.stringify(doc.data())}`)
            })

            return reservations
        } else { console.error(">>> ERROR: No such document!") }
    } catch (e) { console.error(">>> ERROR: Error fetching document: ", e) }
}