import { useState, useEffect } from "react"

import { SafeAreaView, View, StyleSheet, Text } from 'react-native'

const VehicleManagement = () => {
    return (
        <View style={styles.line_container}>
            <Text>Open up App.js to start working on your app!</Text>
        </View>
    )
}

const styles = StyleSheet.create({

    /* COLORS */

    line_container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
})

export default VehicleManagement