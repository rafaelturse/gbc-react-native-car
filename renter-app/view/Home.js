import { useState, useEffect } from "react"
import { StyleSheet, View, Image, Text, Dimensions, Alert, TouchableOpacity, Animated, Pressable } from "react-native"

import MapView, { Marker } from "react-native-maps"
import * as Location from 'expo-location'

import StyledButton from "../components/StyledButton"
import { generateRandomFutureDate } from "../utils/dateUtils"

import { createVehicle } from "../data/model/Vehicle"
import { createReservation } from "../data/model/Reservation"

import { getAllVehicles } from "../data/repository/vehicleDBActions"
import { saveReservation } from "../data/repository/reservationDBActions"

export default function Home() {

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
                latitude: location.coords.latitude,
                longitude: location.coords.longitude
            })

            setLoading(false)
        } catch (err) {
            console.error(e)
            setLoading(false)
        }
    }

    const fetchVehicles = async () => {
        try {
            const vehicles = []
            const dbVehicles = await getAllVehicles()

            //load all vehicles from fb
            dbVehicles.forEach((i, index) => {
                console.log(`>>> INFO: Vehicle ${++index}: ${i.name}`)
                vehicles.push(createVehicle(i))
            })

            //TODO: REMOVE
            //mock a custom single one (lat lon different)
            vehicles.push(createVehicle(
                "",
                dbVehicles[1].acceleration,
                dbVehicles[1].doors,
                dbVehicles[1].horsepower,
                dbVehicles[1].images,
                dbVehicles[1].name,
                dbVehicles[1].owner,
                dbVehicles[1].range,
                dbVehicles[1].seats,
                dbVehicles[1].year,
                dbVehicles[1].bookedBy,
                43.642717032381455,
                -79.38680723109938
            ))

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

        //add user, status
        saveReservation(
            createReservation(
                randomFutureDate,
                vehicle
            )
        )

        Alert.alert(
            'Success!',
            'Reservation Booked',
            [{ text: 'OK', onPress: () => console.log('>>> INFO: Reservation booked confirmation!') }],
            { cancelable: false }
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
                        latitude: deviceLocation?.latitude ?? 0,
                        longitude: deviceLocation?.longitude ?? 0,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}
                >
                    {vehicles.map(
                        (vehicle, pos) => {
                            return (
                                <Marker
                                    key={pos}
                                    coordinate={{ latitude: vehicle.latitude, longitude: vehicle.longitude }}
                                    onPress={() => handleMarkerPress(vehicle)}
                                >
                                    <View style={styles.customMarker}>
                                        <Image source={require("../assets/marker.png")} style={styles.markerImage} resizeMode="contain" />
                                        <View style={styles.markerDescription}>
                                            <Text style={styles.markerTitle}>{vehicle.name}</Text>
                                        </View>
                                    </View>
                                </Marker>
                            )
                        }
                    )}
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
                            <Text style={styles.info}>Renter: John Doe</Text>
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
