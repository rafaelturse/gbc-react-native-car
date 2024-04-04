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
    ownerImage = null,
    bookedBy = null,
    bookedCode = null,
    futureDate = null,
    price = null,
    address = null,
    licensePlate = null,
    lat = null,
    lon = null,
    bookingStatus = null,
    id = null,
    renterName = null,
    renterImage = null,
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
    this.ownerImage = ownerImage;
    this.bookedBy = bookedBy;
    this.bookedCode = bookedCode;
    this.futureDate = futureDate;
    this.price = price;
    this.address = address;
    this.licensePlate = licensePlate;
    this.lat = lat;
    this.lon = lon;
    this.bookingStatus = bookingStatus;
    this.id = id;
    this.renterName = renterName;
    this.renterImage = renterImage;
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
      ownerImage: this.ownerImage,
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
      renterName: this.renterName,
      renterIamge: this.renterImage,
    };
  }
}
