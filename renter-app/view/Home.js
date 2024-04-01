import { StyleSheet, Text, View, Image, Dimensions, Modal, TouchableOpacity } from "react-native"
import { useState, useEffect } from "react"

import MapView, { Marker } from "react-native-maps"
import * as Location from 'expo-location'

import { getAllVehicles } from "../data/repository/vehicleDBActions"

export default function Home() {

    const [deviceLocation, setDeviceLocation] = useState(null)
    const [loading, setLoading] = useState(true)

    const [vehicles, setVehicles] = useState([])
    const [selectedVehicle, setSelectedVehicle] = useState(null)
    const [modalVisible, setModalVisible] = useState(false)

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
        setModalVisible(true)
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

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalText}>{selectedVehicle && selectedVehicle.name}</Text>
                        <Text style={styles.modalText}>Price: ${selectedVehicle && selectedVehicle.price}</Text>
                        {/* Add more details here as needed */}
                        <TouchableOpacity onPress={() => setModalVisible(false)}>
                            <Text style={styles.closeButton}>Close</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    )
}

const { width, height } = Dimensions.get("window")

const styles = StyleSheet.create({

    /* CONTAINER */
    container: { flex: 1 },

    /* MAP */
    map: { flex: 1 },

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

    /* MODAL */
    modalContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    modalContent: {
        backgroundColor: "#fff",
        padding: 20,
        borderRadius: 10,
        alignItems: "center",
    },
    modalText: {
        fontSize: 18,
        marginBottom: 10,
    },
    closeButton: {
        fontSize: 16,
        color: "blue",
        marginTop: 10,
    },
})
