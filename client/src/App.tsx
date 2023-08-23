import "leaflet/dist/leaflet.css";
import ModalContainer from "./components/modalContainer";
import { useState } from "react";
import "./index.css";
import MapComponent from "./components/map";
import { MarkerPositionType } from "./interfaces/map";
import Form from "./components/form";

function App() {
  const [markerPosition, setMarkerPosition] =
    useState<MarkerPositionType | null>(null);

  const changePosition = (newPos: MarkerPositionType) => {
    setMarkerPosition(newPos);
  };

  return (
    <>
      <h2>{markerPosition && markerPosition.lat}</h2>
      <MapComponent changePosition={changePosition} />

      
        <ModalContainer
          title="Añadir punto"
          cerrar={() => {}}
        >
          <Form />
        </ModalContainer>
      
    </>
  );
}

export default App
