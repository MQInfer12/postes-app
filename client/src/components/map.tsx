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
import L from "leaflet";
import Icon from "../assets/location.png";

interface Params {
  changePosition: (newPos: MarkerPositionType) => void;
  handleOpenForm: () => void;
  latitude: number;
  longitude: number;
}

interface LocationMarkerParams {
  handleClick: (e: any) => void;
}

function GetIcon(_iconSize: number) {
  return L.icon({
    iconUrl: Icon,
    iconSize: [_iconSize, _iconSize],
  });
}

function MapComponent(params: Params) {
  const { changePosition, handleOpenForm, latitude, longitude } = params;

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

  return (
    <>
      {latitude != 0 && (
        <MapContainer
          className={"map"}
          center={[latitude, longitude]}
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
                : [latitude, longitude]
            }
            draggable={true}
            autoPan={true}
            /*
      // @ts-ignore */
            ref={markerRef}
            eventHandlers={{
              dragend: () => handleMarkerDragEnd(),
            }}
            icon={GetIcon(50)}
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
