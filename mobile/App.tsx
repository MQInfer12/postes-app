import { StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';
import * as React from 'react';
import useCurrentLocation from './hooks/useCurrentLocation';

export default function App() {
  const webViewRef = React.useRef<any>(null);
  const { currentLocation } = useCurrentLocation();

  React.useEffect(() => {
    if(webViewRef.current && currentLocation) {
      webViewRef.current.postMessage(JSON.stringify({
        type: "coords",
        data: {
          latitude: currentLocation.latitude,
          longitude: currentLocation.longitude
        }
      }));
    }
  }, [currentLocation]);

  return (
    <WebView
      ref={webViewRef}
      source= {{ uri: 'https://postesapp.web.app' }}
      style={styles.map}
      javaScriptEnabled={true}
      incognito={true}
      cacheEnabled={false}
    />
  );
}

const styles = StyleSheet.create({
  map: {
    flex:1
  },
});
