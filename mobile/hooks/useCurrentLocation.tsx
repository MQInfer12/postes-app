import * as Location from 'expo-location';
import { useEffect, useState } from 'react';
import { Alert } from 'react-native';

const useCurrentLocation = () => {
  const [loading, setLoading] = useState(false);
  const [currentLocation, setCurrentLocation] = useState<any>(null);
  const [getPermission, setGetPermission] = useState(0);

  const readLocation = () => {
    setGetPermission(getPermission + 1);
  }

  const reset = () => {
    setLoading(true);
    setCurrentLocation(null);
    setGetPermission(getPermission + 1);
  }

  useEffect(() => {
    let subscription = { remove: () => {} };

    const subscribe = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if(status !== "granted") {
        Alert.alert("Se requieren permisos para acceder a la ubicación");
        return;
      }
      if(!currentLocation) {
        setLoading(true);
      }
      return await Location.watchPositionAsync({
        accuracy: Location.Accuracy.Highest,
        timeInterval: 2000,
        distanceInterval: 0
      }, (data: any) => {
        setCurrentLocation({
          latitude: data.coords.latitude,
          longitude: data.coords.longitude
        });
        setLoading(false);
      });
    }

    subscribe().then((res: any) => subscription = res).catch(e => console.log(e));

    return subscription?.remove;
  }, [getPermission]);

  return { currentLocation, loading, readLocation, reset };
}

export default useCurrentLocation