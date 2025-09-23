// src/components/startIcon.jsx
import L from "leaflet";
import startMarkerImage from "../assets/start.png";

const startIcon = new L.Icon({
  iconUrl: startMarkerImage,
  iconSize: [35, 35], // size of the icon
  iconAnchor: [17, 34], // point of the icon which will correspond to marker's location
  popupAnchor: [0, -30],
});

export default startIcon;
