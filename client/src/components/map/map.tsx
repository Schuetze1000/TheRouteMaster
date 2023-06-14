import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { LatLngTuple } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import markerIconPng from "leaflet/dist/images/marker-icon.png"
import {Icon} from 'leaflet'
import L from 'leaflet';
import 'leaflet-routing-machine';

function SetViewOnClick({ coords }: { coords: LatLngTuple }) {
  const map = useMap();
  map.setView(coords, map.getZoom());

  return null;
}

function RoutingMachine({ from, to }: { from: LatLngTuple, to: LatLngTuple }) {
	const map = useMap();
  
	useEffect(() => {
		const startIcon = new L.Icon({
            iconUrl: markerIconPng,
            iconSize: [25, 41],
            iconAnchor: [12, 41]
        });

        const endIcon = new L.Icon({
            iconUrl: markerIconPng,
            iconSize: [25, 41],
            iconAnchor: [12, 41]
        });

		const routingControl = L.Routing.control({
			waypoints: [
				L.latLng(from[0], from[1]),
				L.latLng(to[0], to[1])
			],
			routeWhileDragging: true,
			addWaypoints: false,
            showAlternatives: false
			/* Customize Route
			lineOptions: {
				styles: [{ color: 'red', opacity: 1, weight: 5 }],
				extendToWaypoints: false,
				missingRouteTolerance: 0,
			  }, */
	  }).addTo(map);

	  L.marker([from[0], from[1]], {icon: startIcon}).addTo(map);
    L.marker([to[0], to[1]], {icon: endIcon}).addTo(map);
  
	  return () => {
		map.removeControl(routingControl);
	  };
	}, [map, from, to]);
  
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

	const defaultLocationTuple: LatLngTuple = [49.473780021177674, 8.53439744049763]; // Standardposition für DHBW

	//TODO: iOS, maybe Android abfrage ob Location nutzen hinzufügen @Leonidas-maker
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
			<link rel="stylesheet" href="https://unpkg.com/leaflet@1.2.0/dist/leaflet.css" />
			<link rel="stylesheet" href="https://unpkg.com/leaflet-routing-machine@latest/dist/leaflet-routing-machine.css" />
			<script src="https://unpkg.com/leaflet@1.2.0/dist/leaflet.js"></script>
			<script src="https://unpkg.com/leaflet-routing-machine@latest/dist/leaflet-routing-machine.js"></script>

    		<script src="leaflet-routing-machine.js"></script>
			<script src="Control.Geocoder.js"></script>
			<link rel="stylesheet" href="Control.Geocoder.css" />

			{/*  Nicht ganz sicher ob das hier noch gebraucht wird, lasse es erstmal drin für maybe später */}
			<link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"/>
			<script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>

			<MapContainer style={{ height: "100%", width: "100%" }} center={coords} zoom={13}>
			<SetViewOnClick coords={coords} />
			<TileLayer
				url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
				attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
			/>
			{/*TitleLayer für RailwayMap*/}
			{/* <TileLayer
				url="https://{s}.tiles.openrailwaymap.org/standard/{z}/{x}/{y}.png"
				attribution='&copy; <a href="https://www.openrailwaymap.org/">OpenRailwayMap</a> contributors'
			/> */}
			<Marker position={coords} icon={new Icon({iconUrl: markerIconPng, iconSize: [25, 41], iconAnchor: [12, 41]})}>
				<Popup>
					Dein Standort
				</Popup>
			</Marker>
			<RoutingMachine from={defaultLocationTuple} to={coords} />
			</MapContainer>
		</div>
	);
	}

export default Map;
