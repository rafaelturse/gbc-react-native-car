import { StyleSheet, Text, View, Pressable, TextInput, ScrollView } from 'react-native';
import {useState, useEffect} from "react"

// TODO: Import location library
import * as Location from 'expo-location';

export default function GeolocationScreen() {
    // state variables for location    
    const [cityFromUI, setCityFromUI] = useState("165 Kendal Avenue, Toronto, Ontario")
    const [latFromUI, setLatFromUI] = useState("43.676410")
    const [lngFromUI, setLngFromUI] = useState("-79.410150")
    
    // state variables to store results of geocoding
    const [deviceLocation, setDeviceLocation] = useState(null);
    const [currAddress, setCurrAddress] = useState(null);
    const [geocodedCoordinates, setGeocodedCoordinates] = useState({lat:0, lng:0});
    
    // helper function to get device location
    const getCurrentLocation = async () => {                   
        try {
            // 1. get permissions 
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                alert(`Permission to access location was denied`)
                return
            }
            alert("Permission granted")
            
            // 2. if permission granted, then get the location            
            // 3. do something with the retreived location
            let location = await Location.getCurrentPositionAsync()
            alert(JSON.stringify(location))
            console.log(location)
            // display the location in the UI
            setDeviceLocation({lat: location.coords.latitude, lng: location.coords.longitude})

        } catch (err) {
            console.log(err)
        }
    }

    // helper function to do reverse geocoding (coordinates to address)
    const doReverseGeocode = async () => {
        alert("reverse geocode button clicked")                  
        try {
            // 0. on android, permissions must be granted
            // 1. do geocoding
            const coords = {
                latitude: parseFloat(latFromUI),
                longitude: parseFloat(lngFromUI) , 
            }
            // 2. check if result found
            const postalAddresses = await Location.reverseGeocodeAsync(coords, {})

            const result = postalAddresses[0]
            if (result === undefined) {
              alert("No results found.")
              return
            }
            console.log(result)
            alert(JSON.stringify(result))
    
            // 3. do something with results

            // output the street address and number to the user interace
            const output = `${result.streetNumber} ${result.street}, ${result.city}, ${result.region}`
            // save it to a state variable to display on screen
            setCurrAddress(output)
        } catch(err) {
            console.log(err)
        }
    }

    // helper function to do forward geocoding (address to coordinates)
    const doForwardGeocode = async () => {
        alert("forward geocode button clicked")                  
        try {
            // 0. on android, permissions must be granted
            // 1. do geocoding
            console.log(`Attempting to geocode: ${cityFromUI}`)
            const geocodedLocation = await Location.geocodeAsync(cityFromUI)
            // 2. Check if a result is found
            const result = geocodedLocation[0]
            if (result === undefined) {
                alert("No coordinates found")
                return
            }
            // 3. do something with results 
            console.log(result)           
            alert(JSON.stringify(result))
            // update state variable to an object that contains the lat/lng
            // (alternatively you could have created 2 separate state variables)
            setGeocodedCoordinates({lat: result.latitude, lng: result.longitude})

        } catch (err) {
            console.log(err)
        }
    }

    return (
        <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 30 }}>
            <Pressable style={styles.btn} onPress={getCurrentLocation}>
                <Text style={styles.btnLabel}>Get Current Location</Text>                
            </Pressable>
            <Text>
                Your location is {JSON.stringify(deviceLocation)}
            </Text>

            { (deviceLocation !== null) &&  
                (
                    <View style={{marginVertical:10}}>
                        <Text>
                            Device latitude:
                            <Text style={{color:"blue"}}> {deviceLocation.lat}</Text> 
                        </Text>
                        <Text>
                            Device longitude:
                            <Text style={{color:"blue"}}> {deviceLocation.lng}</Text> 
                        </Text>                        
                    </View>
                )
            }

            <Text style={{fontSize:18, fontWeight:"bold", marginTop:20}}>
                Reverse Gecoding
            </Text>                 
            <TextInput style={styles.tb} keyboardType="numeric" value={latFromUI} onChangeText={setLatFromUI} placeholder="Enter latitude"/>  
            <TextInput style={styles.tb} keyboardType="numeric" value={lngFromUI} onChangeText={setLngFromUI} placeholder="Enter longitude"/>  
            <Pressable onPress={doReverseGeocode} style={styles.btn}>
                <Text style={styles.btnLabel}>Do Reverse Geocode</Text>
            </Pressable>
            
            <View style={{marginVertical:10}}>
                <Text>
                    Street Address: 
                    <Text style={{color:"blue"}}> {currAddress} </Text>                    
                </Text>                
            </View>

            <Text style={{fontSize:18, fontWeight:"bold", marginTop:20}}>
                Forward Geocoding
            </Text>                 
            <TextInput style={styles.tb} value={cityFromUI} onChangeText={setCityFromUI} placeholder="Enter address"/>  
            
            <Pressable onPress={doForwardGeocode} style={styles.btn}>
                <Text style={styles.btnLabel}>Get Coordinates</Text>
            </Pressable>

            <View style={{marginVertical:10}}>
                <Text>
                    Longitude
                    <Text style={{color:"blue"}}> {geocodedCoordinates.lat}</Text>
                    
                </Text>
                <Text>
                    Longitude:
                    <Text style={{color:"blue"}}> {geocodedCoordinates.lng}</Text>
                    
                </Text>                        
            </View>

           
        </ScrollView>

        
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding:20,        
    },
    btn: {
        borderWidth:1,
        borderColor:"#141D21",
        borderRadius:8,
        paddingVertical:16,
        marginVertical:10
    }, 
    btnLabel: {
        fontSize:16,
        textAlign:"center"
    }, 
    tb: {
        width:"100%",   
        borderRadius:5,
        backgroundColor:"#efefef",
        color:"#333",
        fontWeight:"bold", 
        paddingHorizontal:10,
        paddingVertical:15,
        marginVertical:10,       
    },
 
});
