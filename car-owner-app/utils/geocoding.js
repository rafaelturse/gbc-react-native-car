import * as Location from "expo-location";

export const forward = async (address) => {
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

export const reverse = async (lat, lon) => {
  try {
    const coords = { latitude: lat, longitude: lon };
    const postalAddresses = await Location.reverseGeocodeAsync(coords, {});

    const result = postalAddresses[0];
    if (result === undefined) {
      console.log("No results found.");
      return undefined;
    }

    return result.city;
  } catch (e) {
    console.error(">>> ERROR: not possible to reverseGeocoding:" + e);

    return null;
  }
};
