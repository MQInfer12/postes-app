import "leaflet/dist/leaflet.css";
import ModalContainer from "./components/modalContainer";
import { useEffect, useState } from "react";
import "./index.css";
import MapComponent from "./components/map";
import { MarkerPositionType } from "./interfaces/map";
import Form from "./components/form";
import useGetDirection from "./hooks/useGetDirection";
import postesJSON from "./data/postesJSON.json";
import { FeatureType } from "./interfaces/geojson";
function App() {
  //============ POSTES JSON ============
  const postesData: FeatureType[] = postesJSON.features;

  const { latitude, longitude } = useGetDirection();

  const [markerPosition, setMarkerPosition] = useState<MarkerPositionType>({
    lat: 0,
    lng: 0,
  });

  useEffect(() => {
    setMarkerPosition({
      lat: latitude,
      lng: longitude,
    });
  }, [latitude, longitude]);

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
        latitude={latitude}
        longitude={longitude}
        postesData={postesData}
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
