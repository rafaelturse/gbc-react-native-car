import { useState, useEffect } from "react"

import { SafeAreaView, View, StyleSheet } from 'react-native'

const VehicleManagement = () => {
    return (
        <SafeAreaView style={styles.safe_container}>
            <View style={styles.container}>

            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({

    /* COLORS */

    /* CONTAINER */
    safe_container: { flex: 1 },

    line_container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
})

export default VehicleManagement()