import "leaflet/dist/leaflet.css";
import ModalContainer from "./components/modalContainer";
import { useState } from "react";
import "./index.css";
import MapComponent from "./components/map";
import { MarkerPositionType } from "./interfaces/map";

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

      {/*       {openForm && (
        <ModalContainer
          title="Añadir punto"
          cerrar={() => {}}
          coords={markerPosition}
        >
          <div>Hola mundo</div>
        </ModalContainer>
      )}  */}
    </>
  );
}

export default App;
