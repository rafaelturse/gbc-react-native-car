import { useState, useEffect } from "react"
import { StyleSheet, View, Text, FlatList } from "react-native"

import ReservationCard from "../components/ReservationCard"

import { getAllVehicles } from "../data/repository/vehicleDBActions"

export default Reservations = () => {

    const [loading, setLoading] = useState(true)
    const [reservations, setReservations] = useState([])

    const fetchReservations = async () => {
        try {
            const reservations = await getAllVehicles()
            setReservations(reservations)
            setLoading(false)
        } catch (e) { console.error(">>> ERROR: Error fetching reservations:", e) }
    }

    useEffect(() => { fetchReservations() }, [loading])

    return (
        <View style={styles.container}>
            {!loading && reservations && (
                <FlatList
                    data={reservations}
                    renderItem={({ item }) => <ReservationCard reservation={item} />}
                    style={styles.list}
                />
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    /* CONTENT */
    container: {
        flex: 1,
        padding: 12
    },

    /* LIST */
    list: {
        display: "flex",
        flexDirection: "column"
    },
})