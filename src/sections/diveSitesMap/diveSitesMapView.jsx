import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { MapContainer, TileLayer, useMap , Marker, Popup } from 'react-leaflet';
import { Icon } from 'leaflet';


import 'leaflet/dist/leaflet.css';
import './style.css';

export default function DiveSitesMapView() {
  const [position, setPosition] = useState([0, 0]);
  const [selectedSite, setSelectedSite] = useState({
    name: '',
    latitude: 0,
    longitude: 0,
    description: '',
  });
  const [diveSites, setDiveSites] = useState([]);
  const [showCurrentPosition, setShowCurrentPosition] = useState(false);
  const diveSiteIcon = new Icon({
    iconUrl:
      'https://cdn.iconscout.com/icon/premium/png-512-thumb/scuba-diving-2303575-1951890.png?f=webp&w=256',
    iconSize: [38, 38],
  });

  useEffect(() => {
    // Fetch user's position
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (currentPosition) => {
          const { latitude, longitude } = currentPosition.coords;
          setPosition([parseFloat(latitude), parseFloat(longitude)]);
          setShowCurrentPosition(true);
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
      const response = await fetch('http://localhost:8000/api/dive_sites_map');
      if (!response.ok) {
        throw new Error('Failed to fetch dive sites');
      }
      const data = await response.json();
      setDiveSites(data.data.diveSites);
    } catch (error) {
      console.error('Error fetching dive sites:', error.message);
    }
  };

  const handleChange = (event) => {
    const selectedOption = event.target.value;
    const selectedDiveSite = diveSites.find((site) => site.name === selectedOption);
    setSelectedSite(selectedDiveSite || { name: '', latitude: 0, longitude: 0, description: '' });
  };

  return (
    <div>
      <h1>Dive Sites map</h1>
      <FormControl sx={{ m: 1, minWidth: 120, width: '17%' }}>
        <InputLabel htmlFor="grouped-native-select">Search By</InputLabel>
        <Select
          native
          defaultValue=""
          id="grouped-native-select"
          label="Grouping"
          onChange={handleChange}
        >
          <option aria-label="None" value="" key="none" />
          <optgroup label="Site">
            {diveSites
              .filter((site) => site.type === 'diveSite')
              .map((site) => (
                <option key={`diveSite_${site.name}`} value={site.name}>
                  {site.name}
                </option>
              ))}
          </optgroup>
          <optgroup label="Animal">
            {diveSites
              .filter((site) => site.type === 'animal')
              .map((site) => (
                <option key={`animal_${site.name}`} value={site.name}>
                  {site.name}
                </option>
              ))}
          </optgroup>
          <optgroup label="Plant">
            {diveSites
              .filter((site) => site.type === 'plant')
              .map((site) => (
                <option key={`plant_${site.name}`} value={site.name}>
                  {site.name}
                </option>
              ))}
          </optgroup>
        </Select>
      </FormControl>
      <div style={{ display: 'flex', width: '100%', marginTop: '20px' }}>
        <div style={{ flex: '70%' }}>
          <div id="map" style={{ height: '500px', width: '100%' }}>
            <MapContainer center={position} style={{ height: '100%', width: '100%' }}>
              <ChangeView
                center={
                  selectedSite.latitude !== 0
                    ? [parseFloat(selectedSite.latitude), parseFloat(selectedSite.longitude)]
                    : position
                }
                zoom={13}
              />
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
              />
              {showCurrentPosition && position[0] !== 0 && (
                <Marker position={position}>
                  <Popup>You are here!</Popup>
                </Marker>
              )}
              {diveSites.map((site) => (
                <Marker
                  key={`site_${site.name}`}
                  position={[parseFloat(site.latitude), parseFloat(site.longitude)]}
                  icon={diveSiteIcon}
                >
                  <Popup>{site.name}</Popup>
                </Marker>
              ))}
              {selectedSite.latitude !== 0 && (
                <Marker
                  position={[parseFloat(selectedSite.latitude), parseFloat(selectedSite.longitude)]}
                >
                  <Popup >{selectedSite.name}</Popup>
                </Marker>
              )}
            </MapContainer>
          </div>
        </div>
        <div style={{ flex: '30%', marginLeft: '20px',}}>
          <h3>{selectedSite.name}</h3>
          <p>{selectedSite.description}</p>
        </div>
      </div>
    </div>
  );
}

function ChangeView({ center, zoom }) {
  const map = useMap();
  map.setView(center, zoom, { animate: true, duration: 1.5 });
  return null;
}

ChangeView.propTypes = {
  center: PropTypes.arrayOf(PropTypes.number).isRequired,
  zoom: PropTypes.number.isRequired,
};
