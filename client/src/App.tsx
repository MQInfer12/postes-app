import { MapContainer,TileLayer,Marker,Popup } from 'react-leaflet'
import './app.css'
import 'leaflet/dist/leaflet.css'

function App() {

  return (<>

<MapContainer className = {"map"} id='Mapa' center={[-17.39481762066563, -66.1594660433327]} zoom={13} zoomControl={false}>
<TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
    <Marker position={[51.505, -0.09]}>
      <Popup>
        A pretty CSS3 popup. Easily customizable.
      </Popup>
    </Marker>

      </MapContainer>
  </>
  )
}

export default App
