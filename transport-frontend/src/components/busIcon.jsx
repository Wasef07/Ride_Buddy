import L from "leaflet";
import busImage from "../assets/bus.png"; // we'll add this

const busIcon = new L.Icon({
  iconUrl: busImage,
  iconSize: [35, 35], // size of the icon
  iconAnchor: [17, 34], // point of the icon which will correspond to marker's location
  popupAnchor: [0, -30], // point from which popup should open
});

export default busIcon;
