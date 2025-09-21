import React, { useEffect } from "react";
import "leaflet/dist/leaflet.css";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
  useMap,
} from "react-leaflet";
import busIcon from "./busIcon";

function ChangeView({ center }) {
  const map = useMap();
  map.setView(center, 14);
  return null;
}

export default function MapView({
  onBusUpdate,
  selectedBus,
  selectedStartStop,
  selectedEndStop,
  etas,
  setEtas,
  buses = [],
}) {
  // 🔹 Fetch bus list
  useEffect(() => {
    const fetchBuses = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/buses");
        const data = await res.json();
        onBusUpdate(data);
      } catch (err) {
        console.error("Error fetching buses:", err);
      }
    };

    fetchBuses();
    const interval = setInterval(fetchBuses, 5000);
    return () => clearInterval(interval);
  }, [onBusUpdate]);

  // 🔹 Fetch ETA for each bus when stops are selected
  useEffect(() => {
  let intervalId;

  const fetchEtas = async () => {
    if (!selectedStartStop || !selectedEndStop) return;

    for (const bus of buses) {
      try {
        const res = await fetch(
          `http://localhost:5000/api/buses/eta?busLat=${bus.lat}&busLon=${bus.lon}&stopLat=${selectedEndStop.lat}&stopLon=${selectedEndStop.lon}`
        );

        if (!res.ok) continue;
        const data = await res.json();

        if (data?.etaMinutes !== undefined) {
          setEtas((prev) => {
            const prevEta = prev[bus.id]?.eta || data.etaMinutes;

            // 🔹 Smooth update: move 1 min closer instead of jumping
            const smoothedEta =
              Math.abs(data.etaMinutes - prevEta) > 2
                ? prevEta + Math.sign(data.etaMinutes - prevEta) * 1
                : data.etaMinutes;

            return {
              ...prev,
              [bus.id]: {
                eta: smoothedEta,
                status: data.status || "unknown",
              },
            };
          });
        }
      } catch (err) {
        console.error("Error fetching ETA:", err);
      }
    }
  };

  // 🔹 Run once immediately
  fetchEtas();

  // 🔹 Then every 60 sec (instead of 5 sec)
  intervalId = setInterval(fetchEtas, 60000);

  return () => clearInterval(intervalId);
}, [selectedStartStop, selectedEndStop, buses, setEtas]);

  return (
    <MapContainer
      center={[22.5726, 88.3639]}
      zoom={13}
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      />

      {/* Focus on selected bus */}
      {selectedBus && <ChangeView center={[selectedBus.lat, selectedBus.lon]} />}

      {/* Show all buses */}
      {buses.map((bus) => (
        <div key={bus.id}>
          {/* Bus marker */}
          <Marker position={[bus.lat, bus.lon]} icon={busIcon}>
            <Popup>
              <strong>{bus.name}</strong>
              <br />
              Lat: {bus.lat.toFixed(4)}, Lon: {bus.lon.toFixed(4)}
              <br />
              ETA: {renderETA(bus.id, etas, selectedEndStop)}
            </Popup>
          </Marker>

          {/* Route polyline */}
          <Polyline
            positions={bus.route.map(([lat, lon]) => [lat, lon])}
            color="blue"
            weight={4}
          />
        </div>
      ))}

      {/* Highlight selected start & end stops */}
      {selectedStartStop && (
        <Marker
          position={[selectedStartStop.lat, selectedStartStop.lon]}
          icon={busIcon}
        >
          <Popup>🟢 Start: {selectedStartStop.name}</Popup>
        </Marker>
      )}
      {selectedEndStop && (
        <Marker
          position={[selectedEndStop.lat, selectedEndStop.lon]}
          icon={busIcon}
        >
          <Popup>🔴 Destination: {selectedEndStop.name}</Popup>
        </Marker>
      )}
    </MapContainer>
  );
}

// 🔹 Helper function to render ETA properly
function renderETA(busId, etas, selectedEndStop) {
  if (!selectedEndStop) return "Select destination";

  const etaData = etas[busId];
  if (!etaData) return "Calculating...";

  const { eta, status } = etaData;

  if (typeof eta === "number") {
    return `${eta} min (${status})`;
  }

  return "ETA unavailable";
}
