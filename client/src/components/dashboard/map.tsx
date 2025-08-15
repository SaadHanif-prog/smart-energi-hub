import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

export default function Map() {
  const locations: { name: string; coords: [number, number] }[] = [
    { name: "London", coords: [51.5074, -0.1278] },
    { name: "Manchester", coords: [53.4808, -2.2426] },
    { name: "Birmingham", coords: [52.4862, -1.8904] },
    { name: "Glasgow", coords: [55.8642, -4.2518] },
    { name: "Liverpool", coords: [53.4084, -2.9916] },
    { name: "Bristol", coords: [51.4545, -2.5879] },
    { name: "Leeds", coords: [53.8008, -1.5491] },
    { name: "Newcastle upon Tyne", coords: [54.9784, -1.6174] },
    { name: "Sheffield", coords: [53.3811, -1.4701] },
    { name: "Cardiff", coords: [51.4816, -3.1791] },
  ];

  return (
    <div className="p-6">
      <MapContainer
        center={[54.0, -2.0]} // Roughly UK center
        zoom={5}
        style={{ height: "400px", width: "100%" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {locations.map((loc, index) => (
          <Marker key={index} position={loc.coords}>
            <Popup>{loc.name}</Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
