import { useState, useEffect } from "react"
import { StyleSheet, View, Image, Text, Dimensions, TouchableOpacity, Animated, Pressable } from "react-native"
import MapView, { Marker } from "react-native-maps"
import * as Location from 'expo-location'
import { getAllVehicles } from "../data/repository/vehicleDBActions"

export default function Home() {

    const [deviceLocation, setDeviceLocation] = useState(null)
    const [loading, setLoading] = useState(true)
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
            const vehicles = await getAllVehicles()
            setVehicles(vehicles)
        } catch (e) {
            console.error(">>> ERROR: Error fetching vehicles:", e)
        }
    }

    const handleMarkerPress = (vehicle) => {
        console.log(`>>> INFO: Marker for - ${vehicle.name}`)

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
                        (item, pos) => {
                            return (
                                <Marker
                                    key={pos}
                                    coordinate={{ latitude: item.lat, longitude: item.lon }}
                                    onPress={() => handleMarkerPress(item)}
                                >
                                    <View style={styles.customMarker}>
                                        <Image source={require("../assets/marker.png")} style={styles.markerImage} resizeMode="contain" />
                                        <View style={styles.markerDescription}>
                                            <Text style={styles.markerTitle}>{item.name}</Text>
                                            <Text style={styles.markerPrice}>$ {item.price}</Text>
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
                        <Text style={styles.cardTitle}>{selectedVehicle.name}</Text>
                        <Text style={styles.cardPrice}>$ {selectedVehicle.price}</Text>

                        <TouchableOpacity onPress={closeCard}>
                            <Text style={styles.closeButton}>Close</Text>
                        </TouchableOpacity>
                    </View>
                </Animated.View>
            }
        </View>
    )
}

const { width, height } = Dimensions.get("window")

const styles = StyleSheet.create({

    /* CONTAINER */
    container: { flex: 1 },
    map: { flex: 1 },
    mapContainer: { flex: 1 },

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
        backgroundColor: "rgba(255, 255, 255, 0.6)",
        padding: 18,
        paddingBottom: 30,
    },
    card: {
        backgroundColor: "#fff",
        padding: 16,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 16,
        elevation: 4,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 8,
    },
    cardPrice: {
        fontSize: 16,
        marginBottom: 8,
    },
    closeButton: {
        marginTop: 20,
        fontSize: 14,
        textAlign: "center",
    },
})
