export class Vehicle {
  constructor({
    acceleration,
    doors,
    horsepower,
    images,
    name,
    range,
    seats,
    year,
    ownerEmail = null,
    ownerName = null,
  }) {
    this.acceleration = acceleration;
    this.doors = doors;
    this.horsepower = horsepower;
    this.images = images;
    this.name = name;
    this.range = range;
    this.seats = seats;
    this.year = year;
    this.ownerEmail = ownerEmail;
    this.ownerName = ownerName;
    this.bookedBy = null;
    this.bookedCode = null;
    this.futureDate = null;
    this.price = null;
    this.address = null;
    this.licensePlate = null;
    this.lat = null;
    this.lon = null;
    this.bookingStatus = null;
    this.id = null;
  }
  toPlainObject() {
    return {
      acceleration: this.acceleration,
      doors: this.doors,
      horsepower: this.horsepower,
      images: this.images,
      name: this.name,
      range: this.range,
      seats: this.seats,
      year: this.year,
      ownerEmail: this.ownerEmail,
      ownerName: this.ownerName,
      bookedBy: this.bookedBy,
      bookedCode: this.bookedCode,
      futureDate: this.futureDate,
      price: this.price,
      address: this.address,
      licensePlate: this.licensePlate,
      lat: this.lat,
      lon: this.lon,
      bookingStatus: this.bookingStatus,
      id: this.id,
    };
  }
}
