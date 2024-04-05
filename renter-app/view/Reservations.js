import { useState, useEffect } from "react"
import { StyleSheet, View, Text, FlatList, RefreshControl } from "react-native"
import { useUserContext } from "../utils/UserContext"
import ReservationCard from "../components/ReservationCard"
import { getAllVehiclesByUserEmail } from "../data/vehicleDBActions"
import { useReservationsContext } from "../utils/ReservationsContext"

export default Reservations = () => {
  const { reservations, setReservations } = useReservationsContext();
  const [refreshing, setRefreshing] = useState(false)
  const { user } = useUserContext()

  const fetchReservations = async () => {
    try {
      await getAllVehiclesByUserEmail(user.email, setReservations)
      setRefreshing(false)
    } catch (e) { console.error(">>> ERROR: Error fetching reservations:", e) }
  }

  const onRefresh = () => {
    setRefreshing(true)
    fetchReservations().then(() => setRefreshing(false))
  }

  useEffect(() => {
    fetchReservations()
  }, [])

  useEffect(() => {}, [reservations]);

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
    padding: 12,
  },

  /* LIST */
  list: {
    display: "flex",
    flexDirection: "column",
  },
})
