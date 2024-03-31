import { StyleSheet, Text, View, Image, Dimensions } from "react-native"
import { useState, useEffect } from "react"

import MapView, { Marker } from "react-native-maps"
import * as Location from 'expo-location'

import { getAllVehicles } from "../repository/vehicleDBActions"

export default function Home() {

    const [loading, setLoading] = useState(true)
    const [deviceLocation, setDeviceLocation] = useState(null)
    const [vehicles, setVehicles] = useState([])

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
            console.log(e)
            setLoading(false)
        }
    }

    const fetchVehicles = async () => {
        const vehicles = await getAllVehicles()
        setVehicles(vehicles)
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
                    {
                        vehicles.map (
                            (item, pos) => {
                                return (
                                    <Marker
                                        key={pos}
                                        coordinate={{ latitude: item.lat, longitude: item.lon }}
                                        title={item.name}
                                        description={item.price}
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
                        )
                    }
                </MapView>
            )}
        </View>
    )
}

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({

    container: { flex: 1 },

    map: { flex: 1 },

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
        fontSize: 10,
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
