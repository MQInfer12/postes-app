import { MapContainer, TileLayer, useMapEvents } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import ModalContainer from './components/modalContainer'
import { useState } from 'react'
import { LatLngExpression } from 'leaflet';
import Form from './components/form';

function App() {
  const center: LatLngExpression = [-17.39481762066563, -66.1594660433327];
  const [selectedCoords, setSelectedCoords] = useState<LatLngExpression>(center);
  const [openForm, setOpenForm] = useState(true);

  return (
    <>
      <MapContainer className = {"map"} id='Mapa' center={center} zoom={13} zoomControl={false}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
      </MapContainer>
      {
        openForm &&
        <ModalContainer 
          title='Añadir punto' 
          cerrar={() => setOpenForm(false)}
        >
          <Form />
        </ModalContainer>
      }
    </>
  )
}

export default App