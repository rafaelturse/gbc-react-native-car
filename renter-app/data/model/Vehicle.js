export const createVehicle = (
  vehicle,
  acceleration,
  doors,
  horsepower,
  images,
  name,
  owner,
  range,
  seats,
  year,
  bookedBy,
  latitude,
  longitude
) => {
  if (typeof vehicle === 'object') {
    return {
      acceleration: vehicle.acceleration,
      doors: vehicle.doors,
      horsepower: vehicle.horsepower,
      images: vehicle.images,
      name: vehicle.name,
      owner: vehicle.owner,
      range: vehicle.range,
      seats: vehicle.seats,
      year: vehicle.year,
      bookedBy: vehicle.bookedBy,
      latitude: 43.64288840058596,
      longitude: -79.37716080072681
    }
  } else {
    return {
      acceleration,
      doors,
      horsepower,
      images,
      name,
      owner,
      range,
      seats,
      year,
      bookedBy,
      latitude: 43.642685869029165,
      longitude: -79.38666726956768
    }
  }
}