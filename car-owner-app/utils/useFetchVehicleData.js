import { useState, useEffect } from "react";

const useFetchVehicleData = () => {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://yurisbittencourt.github.io/vehicles.json"
        );
        const data = await response.json();
        setVehicles(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { vehicles, loading };
};

export default useFetchVehicleData;
