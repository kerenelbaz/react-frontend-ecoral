import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { MapContainer, TileLayer, useMap, Marker, Popup } from 'react-leaflet';

import 'leaflet/dist/leaflet.css';
import './style.css';

export default function DiveSitesMapView() {
  const [position, setPosition] = useState([0, 0]);
  const [diveSites, setDiveSites] = useState([]);

  useEffect(() => {
    // Fetch user's position
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (currentPosition) => {
          const { latitude, longitude } = currentPosition.coords;
          setPosition([latitude, longitude]);
        },
        () => {
          alert("Couldn't get your position");
        }
      );
    }
    fetchDiveSitesFromServer();
  }, []);

  const fetchDiveSitesFromServer = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/dive_sites_map', {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      });
      if (!response.ok) {
        throw new Error('Failed to fetch dive sites');
      }
      const data = await response.json();
      console.log('Dive sites:', data.data.diveSites);
      setDiveSites(data.data.diveSites);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <h1>Dive Sites map</h1>
      <FormControl sx={{ m: 1, minWidth: 120 }}>
        <InputLabel htmlFor="grouped-native-select">Search By</InputLabel>
        <Select native defaultValue="" id="grouped-native-select" label="Grouping">
          <option aria-label="None" value="" key="none" />
          <optgroup label="Site">
            {diveSites
              .filter((site) => site.type === 'diveSite')
              .map((site) => (
                <option key={`site-${site.id}`} value={site.name} data-longitude={site.longitude} data-latitude={site.latitude} data-description={site.description}>
                  {site.name}
                </option>
              ))}
          </optgroup>
          <optgroup label="Animal">
            {diveSites
              .filter((site) => site.type === 'animal')
              .map((site) => (
                <option key={`animal-${site.id}`} value={site.name} data-longitude={site.longitude} data-latitude={site.latitude} data-description={site.description} >
                  {site.name}
                </option>
              ))}
          </optgroup>
          <optgroup label="Plant">
            {diveSites
              .filter((site) => site.type === 'plant')
              .map((site) => (
                <option key={`plant-${site.id}`} value={site.name} data-longitude={site.longitude} data-latitude={site.latitude} data-description={site.description}>
                  {site.name}
                </option>
              ))}
          </optgroup>
        </Select>
      </FormControl>

      <div id="map" style={{ height: '500px', width: '100%' }}>
        <MapContainer center={position} zoom={15} style={{ height: '100%', width: '100%' }}>
          <ChangeView center={position} zoom={15} />
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
          />
          <Marker position={position}>
            <Popup>Your position</Popup>
          </Marker>
        </MapContainer>
      </div>
    </>
  );
}

// ChangeView component
function ChangeView({ center, zoom }) {
  const map = useMap();
  map.setView(center, zoom);
  return null;
}

// PropTypes for ChangeView component
ChangeView.propTypes = {
  center: PropTypes.arrayOf(PropTypes.number).isRequired, // PropTypes for center prop
  zoom: PropTypes.number.isRequired, // PropTypes for zoom prop
};
