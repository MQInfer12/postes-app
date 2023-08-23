import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import useGetDirection from "../hooks/useGetDirection";
import { useRef, useState } from "react";
import { MarkerPositionType } from "../interfaces/map";

interface Params {
  changePosition: (newPos: MarkerPositionType) => void;
  handleOpenForm: () => void;
}

interface LocationMarkerParams {
  handleClick: (e: any) => void;
}

function MapComponent({ changePosition, handleOpenForm }: Params) {
  const { latitude, loading, longitude } = useGetDirection();

  const LocationMarker = ({ handleClick }: LocationMarkerParams) => {
    useMapEvents({
      click: handleClick,
    });
    return null;
  };

  const [markerPosition, setMarkerPosition] =
    useState<MarkerPositionType | null>(null);

  const handleGetLatLng = (e: any) => {
    const { lat, lng } = e.latlng;
    setMarkerPosition({ lat, lng });

    changePosition({ lat, lng });
  };

  // ================= event drag =================

  const markerRef = useRef();

  const handleMarkerDragEnd = () => {
    const marker: any = markerRef.current;
    if (marker != null) {
      const { lat, lng } = marker.getLatLng();

      setMarkerPosition({ lat, lng });
      changePosition({ lat, lng });
    }
  };

  const lat = -17.372161106503683;
  const lng = -66.16416468552735;

  return (
    <>
      {!loading && (
        <MapContainer
          className={"map"}
          center={latitude ? [latitude, longitude] : [lat, lng]}
          zoom={13}
          zoomControl={true}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <Marker
            position={
              markerPosition
                ? [markerPosition.lat, markerPosition.lng]
                : [lat, lng]
            }
            draggable={true}
            autoPan={true}
            /*
      // @ts-ignore */
            ref={markerRef}
            eventHandlers={{
              dragend: () => handleMarkerDragEnd(),
            }}
          >
            <Popup>
              <p onClick={handleOpenForm}> Clic Aqui para añadir datos</p>
            </Popup>
          </Marker>

          <LocationMarker handleClick={handleGetLatLng} />
        </MapContainer>
      )}
    </>
  );
}

export default MapComponent;
