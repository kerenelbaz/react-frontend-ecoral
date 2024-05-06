import { Icon } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import { Popup, useMap, Marker, TileLayer, MapContainer } from 'react-leaflet';

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Select from '@mui/material/Select';
import TabContext from '@mui/lab/TabContext';
import MenuItem from '@mui/material/MenuItem'
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';

import './diveSitesMapStyle.css';
import markerIcon from './markerIcon.png';
import youAreHereIcon from './youAreHereIcon.png';



export default function DiveSitesMapView(props) {
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
    iconUrl: markerIcon,
    iconSize: [40, 40],
    iconAnchor: [19, 65],
  });
  const here = new Icon({
    iconUrl: youAreHereIcon,
    iconSize: [80, 90],
  });

  useEffect(() => {
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

  const [valueTab, setValueTab] = React.useState('Dive site'); // Set initial value to 'Dive site'

  const handleTabChange = (event, newValue) => {
    setValueTab(newValue);
  };
  const diveSiteTypes = [...new Set(diveSites.map(site => site.type))];

  return (
    <div className='diveDiteMapContainer'>
      <h1>Dive Sites map</h1>
      <br />

      <FormControl sx={{ m: 1, minWidth: 120, width: '50' }}>
        <Box sx={{ width: '100%', typography: 'body1' }}>
          <TabContext value={valueTab}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <TabList onChange={handleTabChange} aria-label="lab API tabs example">
                {diveSiteTypes.map(type => (
                  <Tab key={type} label={type} value={type} />
                ))}
              </TabList>
            </Box>
            {diveSiteTypes.map(type => (
              <TabPanel key={type} value={type}>
                <FormControl fullWidth>
                  <InputLabel
                    htmlFor={`select-${type}`}
                    sx={{
                      position: 'absolute',
                      top: '1px', 
                      left: '1px', 
                      backgroundColor: '#f9fafb', 
                      padding: '0 5px', 
                      zIndex: 1, 
                    }}
                  >{`Select ${type}`}</InputLabel>
                  <Select
                    value={selectedSite.name}
                    onChange={event => {
                      const selectedOption = event.target.value;
                      const selectedDiveSite = diveSites.find(site => site.name === selectedOption);
                      setSelectedSite(selectedDiveSite || { name: '', latitude: 0, longitude: 0, description: '' });
                    }}
                    inputProps={{
                      name: `select-${type}`,
                      id: `select-${type}`,
                    }}
                  >
                    {diveSites
                      .filter(site => site.type === type)
                      .map(site => (
                        <MenuItem key={site.name} value={site.name}>
                          {site.name}
                        </MenuItem>
                      ))}
                  </Select>
                </FormControl>
              </TabPanel>
            ))}
          </TabContext>
        </Box>
      </FormControl>
      <div style={{ display: 'flex', width: '100%', marginTop: '20px', borderRadius: '20px', border: '1px solid #cccccc4f', backgroundColor:'white'}}>
        <div style={{ flex: '70%' ,  borderRadius: '10px'}}>
          <div id="map" style={{ height: '500px', width: '100%' ,  borderRadius: '20px'}}>
            <MapContainer center={position} style={{ height: '100%', width: '100%'}}>
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
                <Marker position={position} icon={here}>
                  <Popup>You are here!</Popup>
                </Marker>
              )}
              {diveSites.map((site) => (
                <Marker
                  key={`site_${site.name}`}
                  position={[parseFloat(site.latitude), parseFloat(site.longitude)]}
                >
                  <Popup>{site.name}</Popup>
                </Marker>
              ))}
              {selectedSite.latitude !== 0 && (
                <Marker
                  position={[parseFloat(selectedSite.latitude), parseFloat(selectedSite.longitude)]}
                  icon={diveSiteIcon}
                >
                  <Popup>{selectedSite.name}</Popup>
                </Marker>
              )}
            </MapContainer>
          </div>
        </div>
        <div style={{ flex: '30%', marginLeft: '10px', borderRadius: '20px' }}>
          <h3>{selectedSite.name}</h3>
          <div style={{ maxHeight: '470px', overflowY: 'auto' }}>
            <p>{selectedSite.description}</p>
          </div>
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
