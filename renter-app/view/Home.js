import { useState, useEffect } from "react"
import { StyleSheet, View, Image, Text, Animated } from "react-native"
import { useNavigation } from "@react-navigation/native"
import MapView, { Marker } from "react-native-maps"
import { useUserContext } from "../utils/UserContext"
import { getAllVehiclesByUserEmail, getVehiclesByCity, updateVehicle } from "../data/vehicleDBActions"
import BottomModal from "../components/BottomModal"
import { generateRandomFutureDate } from "../utils/dateUtils"
import { showAlert } from "../utils/alertUtils"
import { currentLocation, reverseGeocoding } from "../utils/locationUtils"
import { useReservationsContext } from "../utils/ReservationsContext"

export default Home = () => {

    const { setReservations } = useReservationsContext()
    const [deviceLocation, setDeviceLocation] = useState(null)
    const [userCity, setUserCity] = useState(null)
    const [loading, setLoading] = useState(true)
    const [randomFutureDate, setRandomFutureDate] = useState()
    const [vehicles, setVehicles] = useState([])
    const [selectedVehicle, setSelectedVehicle] = useState(null)
    const [cardAnimation] = useState(new Animated.Value(0))
    const pilot = useNavigation()
    const { user } = useUserContext()
    const [refreshing, setRefreshing] = useState(false)

    const getCurrentLocation = async () => {
        try {
            const location = await currentLocation()
            setDeviceLocation(location)

            const address = await reverseGeocoding(location.lat, location.lon)
            setUserCity(address.city)

            setLoading(false)
        } catch (e) {
            setLoading(false)
            console.error(">>> ERROR: Error getting location:", e)
        }
    }

    const fetchVehicles = async () => {
        try {
            const vehicles = await getVehiclesByCity(userCity)
            setVehicles(vehicles)
        } catch (e) { console.error(">>> ERROR: Error fetching vehicles:", e) }
    }

    const handleMarkerPress = (vehicle) => {
        console.log(`>>> INFO: Marker for - ${vehicle.name}`)

        setRandomFutureDate(generateRandomFutureDate())

        setSelectedVehicle(vehicle)

        Animated.timing(cardAnimation, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true
        }).start()
    }

    const closeCard = () => {
        Animated.timing(cardAnimation, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true
        }).start(() => setSelectedVehicle(null))
    }

    const reservation = (vehicle) => {
        console.log(`>>> INFO: Reservation process for - ${vehicle.name}`)

        if (user == null) {
            showAlert(
                'Access Denied!',
                'You must be logged in!',
                console.log('>>> INFO: Log in redirecting!')
            )
            pilot.navigate("Login")
        } else {
            vehicle.bookingStatus = 'pending'
            vehicle.bookedBy = user.email
            vehicle.futureDate = randomFutureDate
            vehicle.renterName = user.name
            vehicle.renterPhoto = user.url
            updateVehicle(vehicle).then(() =>
                getAllVehiclesByUserEmail(user.email, setReservations)
            )

            showAlert(
                'Success!',
                'Reservation Booked. Wait for the approval before the booking can be confirmed!',
                console.log('>>> INFO: Reservation booked confirmation!')
            )

            closeCard()
        }
    }

    const onRefresh = () => {
        setRefreshing(true)
        fetchVehicles().then(() => setRefreshing(false))
    }

    useEffect(() => {
        getCurrentLocation()
        fetchVehicles()
    }, [])

    return (
        <View style={styles.container}>
            {!loading && deviceLocation && (
                <MapView style={styles.map}
                    initialRegion={{
                        latitude: deviceLocation?.lat ?? 0,
                        longitude: deviceLocation?.lon ?? 0,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}
                    onRegionChange={onRefresh}
                >
                    {vehicles.length > 0 ? (
                        vehicles.map(
                            (vehicle, pos) => {
                                return (
                                    <Marker
                                        key={pos}
                                        coordinate={{ latitude: vehicle.lat, longitude: vehicle.lon }}
                                        onPress={() => handleMarkerPress(vehicle)}
                                    >
                                        <View style={styles.customMarker}>
                                            <Image source={require("../assets/marker.png")} style={styles.markerImage} resizeMode="contain" />
                                            <View style={styles.markerDescription}>
                                                <Text style={styles.markerTitle}>{vehicle.name}</Text>
                                                <Text style={styles.markerPrice}>${vehicle.price}</Text>
                                            </View>
                                        </View>
                                    </Marker>
                                )
                            }
                        )) : (<Text></Text>)
                    }
                </MapView>
            )}

            {selectedVehicle &&
                <Animated.View style={[{ transform: [{ translateY: cardAnimation.interpolate({ inputRange: [0, 1], outputRange: [400, 0] }) }] }]}>
                    <BottomModal
                        selectedVehicle={selectedVehicle}
                        randomFutureDate={randomFutureDate}
                        reservation={() => reservation(selectedVehicle)}
                        closeCard={closeCard}>
                    </BottomModal>
                </Animated.View>
            }
        </View>
    )
}

const styles = StyleSheet.create({

    /* CONTENT */
    container: { flex: 1 },
    map: { flex: 1 },

    /* MARKER */
    customMarker: { alignItems: "center" },
    markerImage: {
        width: 50,
        height: 80,
    },

    markerDescription: {
        marginTop: 3,
        backgroundColor: "#eee",
        borderWidth: 1,
        borderColor: "#aaa",
        borderRadius: 16,
        padding: 5
    },

    markerTitle: {
        fontSize: 12,
        color: "#444",
        fontWeight: "bold",
        textAlign: "center",
    },

    markerPrice: {
        fontSize: 14,
        color: "#333",
        fontWeight: "bold",
        textAlign: "center",
    },
})