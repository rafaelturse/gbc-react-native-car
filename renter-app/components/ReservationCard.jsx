import { View, Text, StyleSheet, Image } from "react-native"

const ReservationCard = ({ reservation }) => {

    const upper = (text) => { return text == null ? '' : text.toUpperCase() }

    return (
        <View style={styles.container}>
            <View style={styles.card}>
                <View style={styles.containerC}>
                    <Text style={styles.title}>{reservation.name}</Text>
                </View>
                <View style={styles.containerC}>
                    <Image source={{ uri: reservation.images[0].url_thumbnail }} style={styles.thumbnail} />
                </View>
                <View style={styles.containerC}><Text style={styles.price}>${reservation.price}</Text></View>
                <View style={styles.containerH}>
                    <View style={styles.textContainer}>
                        <Text style={styles.info}>
                            Booking Date: <Text style={styles.bold}>{reservation.futureDate}</Text>
                        </Text>
                        <Text style={styles.info}>
                            License Plate: <Text style={styles.bold}>{reservation.licensePlate}</Text>
                        </Text>
                        <Text style={[styles.info, styles.pickupLocation]}>
                            Pickup at: <Text style={styles.bold}>{reservation.address}</Text>
                        </Text>
                        <Text style={styles.info}>
                            Code: <Text style={styles.bold}>{reservation.bookedCode ? reservation.bookedCode : "#"}</Text>
                        </Text>
                    </View>
                </View>
                <View style={styles.containerSB}>
                    <Text style={styles.info}>
                        <View style={styles.owner}>
                            <View style={styles.contentH}>
                                <View style={styles.contentV}>
                                    <View style={styles.contentH}>
                                        <Image source={{ uri: reservation.ownerImage }} style={styles.ownerImage} />
                                        <View style={styles.contentV}>
                                            <Text style={styles.subtext}>Owner</Text>
                                            <Text style={styles.ownerName}>{reservation.ownerName}</Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </Text>
                    <Text style={styles.status}>{upper(reservation.bookingStatus)}</Text>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({

    /* CONTENT */
    container: {
        padding: 10,
        borderRadius: 10,
    },
    containerV: {
        flex: 1,
        flexDirection: "column",
    },
    containerH: {
        flex: 1,
        flexDirection: "row",
        marginBottom: 10,
    },
    containerC: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },
    containerE: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-end",
    },
    containerSB: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginTop: 10,
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

    /* CARD */
    card: {
        backgroundColor: "#fff",
        borderRadius: 16,
        padding: 10,
        shadowColor: "#284b63",
        shadowOffset: { width: 3, height: 3 },
        shadowOpacity: 1,
        shadowRadius: 0,
        borderWidth: 1,
        borderColor: "#14213d",
        elevation: 4,
    },

    /* ICON */
    ownerImage: {
        width: 50,
        height: 50,
        margin: 5,
        borderWidth: 2,
        borderRadius: 50,
    },

    /* ICON */
    thumbnail: {
        width: 250,
        height: 150,
        marginEnd: 20,
    },

    /* OWNER */
    ownerName: {
        fontSize: 26,
        fontWeight: "bold",
    },
    owner: {
        marginBottom: -10,
        marginLeft: 10
    },

    /* TEXT */
    title: {
        fontSize: 26,
        fontWeight: "bold",
        marginBottom: 10
    },
    price: {
        fontSize: 32,
        fontWeight: "bold",
        marginBottom: 20,
    },
    info: {
        fontSize: 14,
        marginBottom: 2,
    },
    subtext: {
        bottom: -4,
        fontSize: 10.
    },
    bold: { fontWeight: "bold" },
    status: {
        fontSize: 16,
        fontWeight: "bold",
        padding: 10,
        color: "#eee",
        borderWidth: 1,
        overflow: "hidden",
        borderRadius: 16,
        borderColor: "#fff",
        backgroundColor: "#14213d",
    },
})

export default ReservationCard