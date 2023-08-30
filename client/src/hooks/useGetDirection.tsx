import { useEffect, useState } from "react";
import { Message } from "../interfaces/message";

const useGetDirection = () => {
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);

  useEffect(() => {
    window.addEventListener("message", (e) => {
      const res: Message = JSON.parse(e.data);
      const { type, data } = res;
      if(type === "coords") {
        setLatitude(data.latitude);
        setLongitude(data.longitude);
      }
    });
  }, []);

  return {
    latitude,
    longitude,
  };
};

export default useGetDirection;
