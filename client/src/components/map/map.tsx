import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { LatLngTuple } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import markerIconPng from "leaflet/dist/images/marker-icon.png"
import {Icon} from 'leaflet'

function SetViewOnClick({ coords }: { coords: LatLngTuple }) {
  const map = useMap();
  map.setView(coords, map.getZoom());

  return null;
}

const Map = () => { 
  	interface LocationState {
		latitude: number | null;
		longitude: number | null;
		error: string | null;
  	}
  
	const [location, setLocation] = useState<LocationState>({
		latitude: null,
		longitude: null,
		error: null,
	});

	const defaultLocation = {
		latitude: 49.473780021177674, // Standardbreite für DHBW
		longitude: 8.53439744049763, // Standardlänge für DHBW
		error: null,
	  };

	useEffect(() => {
		navigator.geolocation.getCurrentPosition(
		(position) => {
			setLocation({
			latitude: position.coords.latitude,
			longitude: position.coords.longitude,
			error: null,
			});
		},
		(error) => setLocation({
			...defaultLocation,
			error: error.message
		  }),
		{ enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
		);
	}, []);

	const coords: LatLngTuple = [location.latitude || 0, location.longitude || 0];

  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <MapContainer style={{ height: "100%", width: "100%" }} center={coords} zoom={13}>
        <SetViewOnClick coords={coords} />
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={coords} icon={new Icon({iconUrl: markerIconPng, iconSize: [25, 41], iconAnchor: [12, 41]})}>
          <Popup>
            A pretty CSS3 popup. Easily customizable.
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}

export default Map;
