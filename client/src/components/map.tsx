import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useRef, useState } from "react";
import { MarkerPositionType } from "../interfaces/map";
import L from "leaflet";
import Icon from "../assets/location.png";
import IconPole from "../assets/poles.png";
import { FeatureType } from "../interfaces/geojson";
import Button from "./button";

interface Params {
  changePosition: (newPos: MarkerPositionType) => void;
  handleOpenForm: () => void;
  latitude: number;
  longitude: number;
  postesData: FeatureType[];
  useMyLocation: boolean;
}

interface LocationMarkerParams {
  handleClick: (e: any) => void;
}

function GetIcon(_iconWidth: number, _iconHeight: number, divide: number) {
  _iconWidth = _iconWidth / divide;
  _iconHeight = _iconHeight / divide;
  return L.icon({
    iconUrl: Icon,
    iconSize: [_iconWidth, _iconHeight],
    iconAnchor: [_iconWidth / 2, _iconHeight],
    popupAnchor: [0, -_iconHeight + 10]
  });
}

function GetIconPole(_iconWidth: number, _iconHeight: number, divide: number) {
  _iconWidth = _iconWidth / divide;
  _iconHeight = _iconHeight / divide;
  return L.icon({
    iconUrl: IconPole,
    iconSize: [_iconWidth, _iconHeight],
    iconAnchor: [_iconWidth / 2, _iconHeight - 2],
  });
}

function MapComponent(params: Params) {
  const { changePosition, handleOpenForm, latitude, longitude, postesData, useMyLocation } =
    params;

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
          zoomControl={false}
        >
          <TileLayer
            url='http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}'
            maxZoom={20}
            subdomains={['mt0','mt1','mt2','mt3']}
          />

          <Marker
            position={
              !useMyLocation ? 
                markerPosition
                  ? [markerPosition.lat, markerPosition.lng]
                  : [latitude, longitude] : 
                [latitude, longitude]
            }
            draggable={!useMyLocation}
            autoPan={true}
            /*
      // @ts-ignore */
            ref={markerRef}
            eventHandlers={{
              dragend: () => handleMarkerDragEnd(),
            }}
            icon={GetIcon(57, 76, 2)}
          >
            <Popup>
              <Button onClick={handleOpenForm}>Añadir datos</Button>
            </Popup>
          </Marker>

          <LocationMarker handleClick={handleGetLatLng} />

          {/* ========= OTHER POLES =========*/}
          {postesData.map((v, i) => (
            <Marker
              key={i}
              position={[v.geometry.x, v.geometry.y]}
              eventHandlers={{
                click: () => {
                  alert(v.attributes.Nombre);
                },
              }}
              icon={GetIconPole(86, 78, 2.5)}
            />
          ))}
        </MapContainer>
      )}
    </>
  );
}

export default MapComponent;
