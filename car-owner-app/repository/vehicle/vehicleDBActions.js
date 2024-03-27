import { useState } from "react"

//import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"
import { db } from "../../config/firebase-keys"
import { collection, getDocs, query, where } from "firebase/firestore"

//const app = initializeApp(firebaseConfig)

export const getAll = async () => {
    try {
        console.log(`>>> INFO: get all vehicles process start`)

        const querySnapshot = await getDocs(collection(db, "vehicles"))

        const resultsFromFirestore = []

        querySnapshot.forEach((doc) => {
            console.log(doc.id, " => ", doc.data())
            const itemToAdd = {
                id: doc.id,
                ...doc.data()
            }
            resultsFromFirestore.push(itemToAdd)
        })

        console.log(`>>> INFO: get content: ${resultsFromFirestore}`)

        return resultsFromFirestore
    } catch (err) { console.log(err) }
}