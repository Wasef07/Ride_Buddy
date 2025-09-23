import L from 'leaflet';
import endMarkerImage from "../assets/end.png"; // <-- CHANGE THIS if your filename is different

const endIcon = new L.Icon({
  iconUrl: endMarkerImage,
  iconSize: [35, 35], // size of the icon
  iconAnchor: [17, 34], // point of the icon which will correspond to marker's location
  popupAnchor: [0, -30],// Point from which the popup should open
});

export default endIcon;