import "./styles.css";
import "leaflet/dist/leaflet.css";

import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import { Icon } from "leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import earthquakes from "./earthqukes.json";
import iconUrl from "../public/location-pin.png";

export default function App() {
  const customIcon = new Icon({
    iconUrl: iconUrl,
    iconSize: [38, 38]
  });

  const onEachEarthquake = (feature, layer) => {
    if (feature.properties && feature.properties.title) {
      layer.bindPopup(feature.properties.title);
    }
  };

  return (
    <MapContainer
      center={[-6.2088, 106.8456]}
      zoom={13}
      style={{ height: "100vh", width: "100%" }}
      draggable={true}
    >
      <TileLayer
        attribution="OpenTopoMap"
        url="https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png"
      />
      {/* <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
      /> */}
      <MarkerClusterGroup>
        <GeoJSON
          data={earthquakes}
          pointToLayer={(feature, latlng) =>
            L.marker(latlng, { icon: customIcon })
          }
          onEachFeature={onEachEarthquake}
        />
      </MarkerClusterGroup>
    </MapContainer>
  );
}
