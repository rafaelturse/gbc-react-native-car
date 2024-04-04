import * as Location from 'expo-location'

export const currentLocation = async () => {
    try {
        let { status } = await Location.requestForegroundPermissionsAsync()

        if (status !== 'granted') {
            alert(`>>> INFO: Permission to access location was denied`)
            return
        }

        let location = await Location.getCurrentPositionAsync()
        const coords = { lat: location.coords.latitude, lon: location.coords.longitude }

        reverseGeocoding(location.coords.latitude, location.coords.longitude)

        return coords

    } catch (e) { console.error(">>> ERROR: not possible to currentLocation:" + e) }
}

export const reverseGeocoding = async (lat, lon) => {
    try {
        const coords = { latitude: lat, longitude: lon }
        const postalAddresses = await Location.reverseGeocodeAsync(coords, {})

        const result = postalAddresses[0]
        if (result === undefined) {
            alert("No results found.")
            return
        }

        return result
    } catch (e) { console.error(">>> ERROR: not possible to reverseGeocoding:" + e) }
}