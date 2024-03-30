import {
    StyleSheet,
    Image,
    Text,
    View,
    Pressable,
    Button,
    TextInput,
  } from "react-native"
  import { useState, useEffect } from "react"
  
  import MapView, { Marker } from "react-native-maps";
  
  import { Entypo } from "@expo/vector-icons";
  
  const MARKERS_ARRAY = [
    {
      lat: 37.78825,
      lng: -122.4324,
      name: "San Francisco",
      desc: "Home of Apple and Facebook",
    },
    {
      lat: 37.78849,
      lng: -122.40679,
      name: "Union Square",
      desc: "A central meeting square surrounded by shops.",
    },
  ];
  
  export default function Home() {
    const [latFromUI, setLatFromUI] = useState("37.747830");
    const [lngFromUI, setLngFromUI] = useState("-122.494750");
  
    const addMarker = () => {
      alert("Add marker pressed");
    };
  
    return (
      <View style={styles.container}>
        <Text style={{ fontSize: 18, fontWeight: "bold" }}>Map</Text>
  
        {/* 3. MapView */}
        <MapView
          style={{ height: "50%", width: "100%" }}
          initialRegion={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}        
        >
          {
              // loop through the markers array            
              MARKERS_ARRAY.map(     
                  // currItemInArray == the current item we are iterating over
                  // pos = position in the array             
                  (currItem, pos)=>{
                      const coords = {
                          latitude: currItem.lat,
                          longitude: currItem.lng
                       }
                       
                       return (
                          <Marker
                              key={pos}
                              coordinate={coords}
                              title={currItem.name}
                              description={currItem.desc}
                          />
                          )                        
                  } 
              )
          }
  
        </MapView>
  
        {/* ui for adding a marker */}
        <Text style={{ fontSize: 18, fontWeight: "bold", marginTop: 20 }}>
          Add a Marker
        </Text>
        <TextInput
          style={styles.tb}
          keyboardType="numeric"
          value={latFromUI}
          onChangeText={setLatFromUI}
          placeholder="Enter latitude"
        />
        <TextInput
          style={styles.tb}
          keyboardType="numeric"
          value={lngFromUI}
          onChangeText={setLngFromUI}
          placeholder="Enter longitude"
        />
        <Pressable onPress={addMarker} style={styles.btn}>
          <Text style={styles.btnLabel}>Add Marker</Text>
        </Pressable>
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
      padding: 20,
    },
    map: {
      height: "50%",
      width: "100%",
    },
    btn: {
      borderWidth: 1,
      borderColor: "#141D21",
      borderRadius: 8,
      paddingVertical: 16,
      marginVertical: 10,
    },
    btnLabel: {
      fontSize: 16,
      textAlign: "center",
    },
    tb: {
      width: "100%",
      borderRadius: 5,
      backgroundColor: "#efefef",
      color: "#333",
      fontWeight: "bold",
      paddingHorizontal: 10,
      paddingVertical: 15,
      marginVertical: 10,
    },
  });
  