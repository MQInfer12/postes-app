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

  const [openForm, setOpenForm] = useState(false);

  const changePosition = (newPos: MarkerPositionType) => {
    setMarkerPosition(newPos);
  };

  const handleOpenForm = () => {
    setOpenForm(!openForm);
  };

  return (
    <>
      <h2>{markerPosition && markerPosition.lat}</h2>
      <MapComponent changePosition={changePosition} handleOpenForm={handleOpenForm}/>

      {openForm && (
        <ModalContainer
          title="Añadir punto"
          cerrar={handleOpenForm}
        >
          <Form />
        </ModalContainer>
      )}
    </>
  );
}

export default App
