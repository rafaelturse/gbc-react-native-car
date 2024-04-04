import { StyleSheet, View, Image, Text, TouchableOpacity } from "react-native"

import StyledButton from './StyledButton'

const BottomModal = ({ selectedVehicle, randomFutureDate, reservation, closeCard }) => {
    return (
        <View style={styles.cardContainer}>
            <View style={styles.card}>
                <TouchableOpacity style={styles.touchClose} onPress={closeCard}>
                    <Image source={require("../assets/close.png")} style={styles.cardClose} />
                </TouchableOpacity>
                <View style={styles.horizontalCenter}>
                    <Text style={styles.title}>{selectedVehicle.name}</Text>
                </View>
                <View style={[styles.horizontalCenter, styles.vehicleInfo]}>
                    <View style={styles.vertical}>
                        <Text style={styles.info}>
                            • Price: <Text style={styles.bold}>${selectedVehicle.price}</Text>
                        </Text>
                        <Text style={styles.info}>
                            • Year: <Text style={styles.bold}>{selectedVehicle.year}</Text>
                        </Text>
                        <Text style={styles.info}>
                            • Doors: <Text style={styles.bold}>{selectedVehicle.doors}</Text>
                        </Text>
                        <Text style={styles.info}>
                            • Seats: <Text style={styles.bold}>{selectedVehicle.seats}</Text>
                        </Text>
                    </View>
                    <View style={styles.vertical}>
                        <Text style={styles.info}>
                            • Range: <Text style={styles.bold}>{selectedVehicle.range}</Text>
                        </Text>
                        <Text style={styles.info}>
                            • Horses: <Text style={styles.bold}>{selectedVehicle.horsepower}</Text>
                        </Text>
                        <Text style={styles.info}>
                            • Acceleration: <Text style={styles.bold}>{selectedVehicle.acceleration}</Text>
                        </Text>
                        <Text style={styles.info}>
                            • Booking: <Text style={styles.bold}>{randomFutureDate}</Text>
                        </Text>
                    </View>
                </View>
                <View style={styles.ownerContainer}>
                    <View style={styles.horizontal}>
                        <View style={styles.vertical}>
                            <View style={styles.horizontal}>
                                <Image source={{ uri: selectedVehicle.ownerImage }} style={styles.cardImage} />
                                <View style={styles.vertical}>
                                    <Text style={styles.subtext}>Owner</Text>
                                    <Text style={styles.ownerName}>{selectedVehicle.ownerName}</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={styles.horizontalCenter}>
                    <Image source={{ uri: selectedVehicle.images[0].url_thumbnail }} style={styles.vehicleImage} />
                </View>
                <StyledButton text="BOOK NOW!" action={reservation} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({

    /* CONTENT */
    horizontalCenter: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 5,
    },

    horizontal: {
        flexDirection: "row",
        justifyContent: "flex-start",
        marginBottom: 5,
    },

    vertical: {
        flexDirection: "column",
        justifyContent: "center",
        marginBottom: 5,
    },

    ownerContainer: {
        marginBottom: -80,
        marginLeft: 10
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
        shadowOffset: { width: 3, height: 3 },
        shadowOpacity: 1,
        shadowRadius: 0,
        borderWidth: 1,
        borderColor: "#14213d",
        elevation: 4,
    },

    vehicleInfo: {
        borderRadius: 16,
        padding: 12,
        gap: 30,
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

    /* IMAGE */
    cardImage: {
        width: 50,
        height: 50,
        margin: 5,
        borderWidth: 2,
        borderRadius: 50,
    },

    vehicleImage: {
        marginLeft: 80,
        width: 250,
        height: 200,
    },

    /* TEXT */
    description: { fontSize: 12 },
    bold: { fontWeight: "bold" },

    subtext: {
        bottom: -4,
        fontSize: 10.
    },

    title: {
        fontSize: 26,
        fontWeight: "bold",
        marginTop: 20,
        marginBottom: 5
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

export default BottomModal