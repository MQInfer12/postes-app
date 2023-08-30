import { StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';
import * as React from 'react';



export default function App() {
  return (
    <WebView
    source= {{ uri: 'https://postesapp.web.app/' }}
    style={styles.map}
    javaScriptEnabled={true}
    />
  );
}

const styles = StyleSheet.create({
  map: {
    flex:1
  },
});
