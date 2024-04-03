import { useState, useEffect } from "react";
import { Vehicle } from "../models/Vehicle";

const useFetchVehicleData = () => {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://yurisbittencourt.github.io/vehicles.json"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();

        const vehicleArray = data.map(
          (vehicle) =>
            new Vehicle({
              acceleration: vehicle.acceleration,
              doors: vehicle.doors,
              horsepower: vehicle.horsepower,
              images: vehicle.images,
              name: `${vehicle.make} ${vehicle.model} ${vehicle.trim}`,
              range: vehicle.total_range,
              seats: vehicle.seats_max,
              year: vehicle.model_year,
            })
        );

        setVehicles(vehicleArray);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { vehicles, loading, error };
};

export default useFetchVehicleData;
