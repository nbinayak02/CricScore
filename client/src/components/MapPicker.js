import React, { useState, useRef, useImperativeHandle, forwardRef } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix the missing marker icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

function LocationMarker({ onSelect }) {
  const [position, setPosition] = useState(null);

  useMapEvents({
    click(e) {
      setPosition(e.latlng);
      onSelect(e.latlng); // Notify parent
    },
  });

  return position ? <Marker position={position} /> : null;
}

const MapPicker = forwardRef(({ style, onSelect }, ref) => {
  const mapRef = useRef();

  // Expose map instance to parent if needed
  useImperativeHandle(ref, () => ({
    getMap: () => mapRef.current,
  }));

  return (
    <MapContainer
      center={[27.7, 85.3]} // Default center
      zoom={13}
      style={{ height: '200px', width: '100%', ...style }}
      whenCreated={(mapInstance) => (mapRef.current = mapInstance)}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <LocationMarker onSelect={onSelect} />
    </MapContainer>
  );
});

export default MapPicker;
