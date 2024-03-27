import { useState, useEffect } from "react"
import { View, StyleSheet, FlatList, Text } from 'react-native'

import { collection, getDocs, query, where } from "firebase/firestore";

//import { getAll } from '../../repository/vehicle/vehicleDBActions'

import { db } from '../../config/firebase-keys'

const VehicleManagement = () => {

    const [vehicles, setVehicles] = useState([])

    useEffect(() => {
        setVehicles(getAll()) 
    }, [])

    const getAll = async () => {
        try {
            console.log(`>>> INFO: get vehicles process start`)

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

            //return resultsFromFirestore
            setVehicles(resultsFromFirestore)
        } catch (err) { console.log(err) }
    }

    return (
        <FlatList
            data={vehicles}
            renderItem={
                (rowData) => {
                    return (
                        <View style={{ borderBottomWidth: 1 }}>
                            <Text>Name: {rowData.item.name}</Text>
                        </View>
                    )
                }
            }
        />
    )
}

const styles = StyleSheet.create({
    line_container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
})

export default VehicleManagement