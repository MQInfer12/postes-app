import "leaflet/dist/leaflet.css";
import ModalContainer from "./components/modalContainer";
import { useState } from "react";
import "./index.css";
import MapComponent from "./components/map";
import { MarkerPositionType } from "./interfaces/map";
import Form from "./components/form";

function App() {
  const [markerPosition, setMarkerPosition] = useState<MarkerPositionType>({
    lat: -17.372161106503683,
    lng: -66.16416468552735,
  });

  const [openForm, setOpenForm] = useState(false);

  const changePosition = (newPos: MarkerPositionType) => {
    setMarkerPosition(newPos);
  };

  const handleOpenForm = () => {
    setOpenForm(!openForm);
  };

  return (
    <>
      <MapComponent
        changePosition={changePosition}
        handleOpenForm={handleOpenForm}
      />

      {openForm && (
        <ModalContainer title="Añadir punto" cerrar={handleOpenForm}>
          <Form coords={markerPosition} />
        </ModalContainer>
      )}
    </>
  );
}

export default App;
