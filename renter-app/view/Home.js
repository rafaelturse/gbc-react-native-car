/* REACT */
import { useState, useEffect } from "react"
import { StyleSheet, View, Image, Text, Dimensions, TouchableOpacity, Animated } from "react-native"
/* MAP */
import MapView, { Marker } from "react-native-maps"
import * as Location from 'expo-location'
/* CUSTOM */
import { generateRandomFutureDate } from "../utils/dateUtils"
import { primaryAlert } from "../utils/alertUtils"
import StyledButton from "../components/StyledButton"
/* DB */
import { getAllVehicles, updateVehicle } from "../data/repository/vehicleDBActions"

export default Home = () => {

    const [deviceLocation, setDeviceLocation] = useState(null)
    const [loading, setLoading] = useState(true)
    const [randomFutureDate, setRandomFutureDate] = useState()
    const [vehicles, setVehicles] = useState([])
    const [selectedVehicle, setSelectedVehicle] = useState(null)
    const [cardAnimation] = useState(new Animated.Value(0))

    const getCurrentLocation = async () => {
        try {
            let { status } = await Location.requestForegroundPermissionsAsync()

            if (status !== 'granted') {
                alert(`>>> INFO: Permission to access location was denied`)
                return
            }

            let location = await Location.getCurrentPositionAsync()
            console.log(`>>> INFO: The location is: ${JSON.stringify(location)}`)

            setDeviceLocation({
                lat: location.coords.latitude,
                lon: location.coords.longitude
            })

            setLoading(false)
        } catch (err) {
            console.error(e)
            setLoading(false)
        }
    }

    const fetchVehicles = async () => {
        try {
            const vehicles = await getAllVehicles()
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

        vehicle.bookingStatus = 'pending'
        vehicle.bookedBy = 'John Johns' //TODO: get logged user
        vehicle.futureDate = randomFutureDate
        updateVehicle(vehicle)

        primaryAlert(
            'Success!',
            'Reservation Booked. Wait for the approval before the booking can be confirmed!',
            '>>> INFO: Reservation booked confirmation!'
        )
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
                >
                    {vehicles.length > 0 ? (
                        vehicles.map(
                            (vehicle, pos) => {
                                return (
                                    <Marker
                                        key={pos}
                                        //coordinate={{ latitude: vehicle.lat, longitude: vehicle.lon }}
                                        coordinate={{ latitude: "43.64299380867883", longitude: "-79.38701975667243" }}
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
                <Animated.View style={[styles.cardContainer, { transform: [{ translateY: cardAnimation.interpolate({ inputRange: [0, 1], outputRange: [400, 0] }) }] }]}>

                    <View style={styles.card}>
                        <TouchableOpacity onPress={closeCard}>
                            <Image source={require("../assets/close.png")} style={styles.cardClose} />
                        </TouchableOpacity>
                        <View style={styles.contentEndH}>
                            {/* TODO: change for user photo*/}
                            <Text style={styles.info}>Renter: {selectedVehicle.ownerName}</Text>
                            <Image source={require("../assets/marker.png")} style={styles.cardImage} />
                        </View>
                        <Text style={styles.description}>{selectedVehicle.year}</Text>
                        <Text style={styles.title}>{selectedVehicle.name}</Text>
                        <View style={[styles.contentCenterH, styles.cardVehicle]}>
                            <Text style={styles.info}>- Doors: {selectedVehicle.doors}</Text>
                            <Text style={styles.info}>- Seats: {selectedVehicle.seats}</Text>
                            <Text style={styles.info}>- Range: {selectedVehicle.range}</Text>
                        </View>
                        <View style={[styles.contentCenterH, styles.cardVehicle]}>
                            <Text style={styles.info}>- Acceleration: {selectedVehicle.acceleration}</Text>
                            <Text style={styles.info}>- Horse Power: {selectedVehicle.horsepower}</Text>
                        </View>
                        <View style={styles.contentCenterH}>
                            <Image source={{ uri: selectedVehicle.images[0].url_thumbnail }} style={styles.cardVehicleImage} />
                        </View>
                        <View style={styles.contentCenterV}>
                            <Text style={styles.cardDescription}>Booking Date</Text>
                            <Text style={styles.cardDate}>{randomFutureDate}</Text>
                        </View>
                        <StyledButton text="BOOK NOW!" action={() => reservation(selectedVehicle)} />
                    </View>
                </Animated.View>
            }
        </View>
    )
}

const { width, height } = Dimensions.get("window")

const styles = StyleSheet.create({

    /* CONTENT */
    container: { flex: 1 },
    map: { flex: 1 },
    mapContainer: { flex: 1 },

    contentCenterH: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 5,
    },
    contentCenterV: {
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 20,
    },

    contentEndH: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-end",
        marginBottom: 5,
    },

    /* MARKER */
    customMarker: { alignItems: "center" },
    markerImage: {
        width: width * 0.1,
        height: height * 0.07,
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

    /* CARD */
    cardContainer: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: "rgba(255, 255, 255, 0.7)",
        padding: 18,
        paddingBottom: 30,
    },
    card: {
        backgroundColor: "#fff",
        borderRadius: 16,
        padding: 12,
        shadowColor: "#284b63",
        shadowOffset: {
            width: 3,
            height: 3,
        },
        shadowOpacity: 1,
        shadowRadius: 0,
        borderWidth: 1,
        borderColor: "#14213d",
        elevation: 4,
    },
    cardVehicle: {
        flexDirection: "row",
        alignItems: "center",
        gap: 30,
        marginTop: 4,
    },
    cardImage: {
        width: 50,
        height: 50,
        margin: 10,
    },
    cardVehicleImage: {
        width: width * .45,
        height: height * 0.15,
    },
    cardClose: {
        width: 14,
        height: 14,
        resizeMode: "contain",
        alignSelf: 'flex-end',
        marginBottom: 10
    },
    cardDate: {
        fontSize: 20,
        fontWeight: "bold",
    },

    /* TEXT */
    description: { fontSize: 12 },
    title: {
        fontSize: 26,
        fontWeight: "bold",
        marginBottom: 20
    },
    info: {
        fontSize: 16,
        marginBottom: 5,
    },
    price: {
        fontSize: 28,
        marginBottom: 5,
        fontWeight: "bold",
    },
})
