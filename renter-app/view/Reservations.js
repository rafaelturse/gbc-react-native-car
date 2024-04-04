import { useState, useEffect } from "react"
import { StyleSheet, View, Text, FlatList, RefreshControl } from "react-native"
import { useUserContext } from "../utils/UserContext"
import ReservationCard from "../components/ReservationCard"
import { getAllVehiclesByUserEmail } from "../data/vehicleDBActions"

export default Reservations = () => {

    const [loading, setLoading] = useState(true)
    const [reservations, setReservations] = useState([])
    const [refreshing, setRefreshing] = useState(false)
    const { user } = useUserContext()

    const fetchReservations = async () => {
        try {
            const reservations = await getAllVehiclesByUserEmail(user.email)
            setReservations(reservations)
            setRefreshing(false)
        } catch (e) { console.error(">>> ERROR: Error fetching reservations:", e) }
    }

    const onRefresh = () => {
        setRefreshing(true)
        fetchReservations().then(() => setRefreshing(false))
    }

    useEffect(() => { fetchReservations() }, [])

    useEffect(() => { }, [reservations])

    return (
        <View style={styles.view}>
            {reservations.length === 0 ? (
                <Text>No vehicles available!</Text>
            ) : (
                <FlatList
                    data={reservations}
                    renderItem={({ item }) => <ReservationCard reservation={item} />}
                    style={styles.list}
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                            colors={["#007aff"]}
                        />
                    }
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