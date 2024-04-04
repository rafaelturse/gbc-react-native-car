import * as Location from "expo-location";

export const forwardGeocode = async (address, setCoordinates) => {
  try {
    console.log(`Attempting to geocode: ${address}`);
    const geocodedLocation = await Location.geocodeAsync(address);
    const result = geocodedLocation[0];
    if (result === undefined) {
      console.log("Address undefined");
      return { lat: undefined, lon: undefined };
    }
    console.log(result);

    return { lat: result.latitude, lon: result.longitude };
  } catch (err) {
    console.log(err);
    console.log("Address null");
    return { lat: null, lon: null };
  }
};
