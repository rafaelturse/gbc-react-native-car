import { useState, useEffect } from "react"
import { StyleSheet, View, Image, Text, Dimensions, TouchableOpacity, Animated } from "react-native"
import { useNavigation } from "@react-navigation/native"
import MapView, { Marker } from "react-native-maps"
import * as Location from 'expo-location'
import { generateRandomFutureDate } from "../utils/dateUtils"
import { primaryAlert } from "../utils/alertUtils"
import StyledButton from "../components/StyledButton"
import { useUserContext } from "../utils/UserContext"
import { getAllVehicles, updateVehicle } from "../data/vehicleDBActions"

export default Home = () => {

    const [deviceLocation, setDeviceLocation] = useState(null)
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

        if (user == null) {
            primaryAlert(
                'Access Denied!',
                'You must be logged in!',
                '>>> INFO: Log in redirecting!'
            )
            pilot.navigate("Login")
        } else {
            vehicle.bookingStatus = 'pending'
            vehicle.bookedBy = user.email 
            vehicle.futureDate = randomFutureDate
            updateVehicle(vehicle)

            primaryAlert(
                'Success!',
                'Reservation Booked. Wait for the approval before the booking can be confirmed!',
                '>>> INFO: Reservation booked confirmation!'
            )
        }
    }

    const onRefresh = () => {
        setRefreshing(true)
        fetchVehicles().then(() => setRefreshing(false) )
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
                <Animated.View style={[styles.cardContainer, { transform: [{ translateY: cardAnimation.interpolate({ inputRange: [0, 1], outputRange: [400, 0] }) }] }]}>

                    <View style={styles.card}>
                        <TouchableOpacity style={styles.touchClose} onPress={closeCard}>
                            <Image source={require("../assets/close.png")} style={styles.cardClose} />
                        </TouchableOpacity>
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
                        <View style={styles.owner}>
                            <View style={styles.contentH}>
                                <View style={styles.contentV}>
                                    <View style={styles.contentH}>
                                        <Image source={{ uri: selectedVehicle.ownerImage }} style={styles.cardImage} />
                                        <View style={styles.contentV}>
                                            <Text style={styles.subtext}>Owner</Text>
                                            <Text style={styles.ownerName}>{selectedVehicle.ownerName}</Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
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

    contentH: {
        flexDirection: "row",
        justifyContent: "flex-start",
        marginBottom: 5,
    },

    contentV: {
        flexDirection: "column",
        justifyContent: "center",
        marginBottom: 5,
    },

    contentEnd: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
        marginBottom: 5,
    },

    owner: {
        marginTop: 20,
        marginBottom: -70,
        marginLeft: 10
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
        position: "relative",
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
        margin: 5,
        borderWidth: 2,
        borderRadius: 50,
    },
    cardVehicleImage: {
        marginLeft: 90,
        width: width * .60,
        height: height * 0.20,
    },
    cardClose: {
        width: 14,
        height: 14,
        resizeMode: "contain",
        alignSelf: 'flex-end',
        zIndex: 9,
    },
    touchClose: {
        position: "absolute",
        top: 10,
        right: 10,
        zIndex: 9,
        backgroundColor: "#fff"
    },
    cardDate: {
        fontSize: 20,
        fontWeight: "bold",
    },

    /* TEXT */
    description: { fontSize: 12 },
    subtext: {
        bottom: -4,
        fontSize: 10.
    },
    title: {
        fontSize: 26,
        fontWeight: "bold",
        marginBottom: 20
    },
    ownerName: {
        fontSize: 26,
        fontWeight: "bold",
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
