import { useEffect, useState } from "react";

const useGetDirection = () => {
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if the Geolocation API is available in the browser
    if ("geolocation" in navigator) {
      // Get the user's current position
      navigator.geolocation.getCurrentPosition(function (position) {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;

        setLatitude(lat);
        setLongitude(lng);
      });
    } else {
      alert("La geolocalizacion no esta disponible en tu buscador.");
    }
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);

  return {
    latitude,
    longitude,
    loading,
  };
};

export default useGetDirection;
