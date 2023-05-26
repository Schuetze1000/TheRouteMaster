import React, {useState} from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents } from 'react-leaflet';
import * as Leaflet from 'leaflet'
import { Icon } from "leaflet";

function Map() {
	const map = useMapEvents({
		click: () => {
		  map.locate()
		},
		locationfound: (location) => {
		  console.log('location found:', location)
		},
	  })
	  return null
	}
	
function MapComponent() {
	return (
		<div></div>
		// <MapContainer center={[50.5, 30.5]} zoom={13}>
		// 	<Map />
		// </MapContainer>
	);
}

export default Map;
