import Container from '@mui/material/Container';
import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import './style.css';
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';

export default function DiveSitesMapView() {
  const [position, setPosition] = React.useState([0, 0]);

  React.useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (currentPosition) => {
          console.log(currentPosition);
          const { latitude, longitude } = currentPosition.coords;
          console.log(`https://www.google.com/maps/@${latitude},${longitude}`);
          setPosition([latitude, longitude]);
        },
        () => {
          alert("Couldn't get your position");
        }
      );
    }
  }, []); // Empty dependency array to run this effect only once on component mount

  return (
    <>
      <h1>Dive Sites map</h1>
      <FormControl sx={{ m: 1, minWidth: 120 }}>
        <InputLabel htmlFor="grouped-native-select">Search By</InputLabel>
        <Select native defaultValue="" id="grouped-native-select" label="Grouping">
          <option aria-label="None" value="" />
          <optgroup label="Site">
            <option value={[8, 9]} data-description="Your description here">
              Dolphin Reef + Katza, Eilat
            </option>
            <option value={2}>Neptune’s Tables, Eilat</option>
            <option value={3}>Stream of Sharks, Hadera</option>
            <option value={4}>Underwater Archaeological Park, Old Caesarea</option>
            <option value={5}>The Dead Sea</option>
            <option value={6}>The Nature Reserve, Eilat</option>
            <option value={7}>Rosh Hanikra caverns and Achziv Canyon</option>
            <option value={8}>Scire Submarine wreck, Haifa</option>
            <option value={9}>Kidon Shipwreck and Memorial, Nahariya</option>
            <option value={10}>The Atlit Yam Archaeological Site</option>
          </optgroup>
          <optgroup label="Animal">
            <option value={11}>Turtle</option>
            <option value={12}>Dolphin</option>
            <option value={13}>Seahorse</option>
            <option value={14}>Octopus</option>
            <option value={15}>Shark</option>
            <option value={16}>Clownfish</option>
            <option value={17}>Catfish</option>
            <option value={18}>Stingray</option>
            <option value={19}>Sunfish</option>
            <option value={20}>Moray eel</option>
            <option value={21}>Sea cucumber</option>
          </optgroup>
          <optgroup label="Plant">
            <option value={22}>Spirulina</option>
          </optgroup>
        </Select>
      </FormControl>

      <div id="map">
        <MapContainer center={[32.2739226, 34.8486424]} zoom={20}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
          />
          {/* <Marker position={[51.505, -0.09]}>
              <Popup>
                A pretty CSS3 popup. <br /> Easily customizable.
              </Popup>
            </Marker> */}
        </MapContainer>
      </div>
    </>
  );
}
