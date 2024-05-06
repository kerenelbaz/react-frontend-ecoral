/* eslint-disable prefer-destructuring */
import { useState } from 'react';

import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import TextField from '@mui/material/TextField';
import ButtonGroup from '@mui/material/ButtonGroup';
import AddLocationTwoToneIcon from '@mui/icons-material/AddLocationTwoTone';

import './addDiveSiteStyle.css';

export default function AddDiveSiteView() {
  const [selectedType, setSelectedType] = useState(null);
  const [name, setName] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [description, setDescription] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleButtonClick = (value) => {
    setSelectedType(value === selectedType ? null : value);
  };

  const handleLatitudeChange = (event) => {
    // Validate input to allow only float/double numbers
    const value = event.target.value;
    if (/^[-+]?\d*\.?\d*$/.test(value) || value === '') {
      setLatitude(value);
    }
  };

  const handleLongitudeChange = (event) => {
    // Validate input to allow only float/double numbers
    const value = event.target.value;
    if (/^[-+]?\d*\.?\d*$/.test(value) || value === '') {
      setLongitude(value);
    }
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Checking if any of the required fields are empty
    if (!selectedType || !name || !latitude || !longitude || !description) {
      return;
    }
    const newDiveSite = {
      type: selectedType,
      name,
      latitude,
      longitude,
      description,
    };

    // a POST request to server
    fetch('http://localhost:8000/api/dive_sites_map', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newDiveSite),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        setOpenSnackbar(true);

        setTimeout(() => {
          setOpenSnackbar(false);
          setSelectedType(null);
          setName('');
          setLatitude('');
          setLongitude('');
          setDescription('');
        }, 2700);

        return response.json();
      })
      .then((data) => {
        console.log('Server response:', data);
      })
      .catch((error) => {
        console.error('Error while sending data to server:', error);
      });
  };

  return (
    <div className="container2">
      <h1>Add Dive Site To Map</h1>
      <br />
      <form onSubmit={handleSubmit}>
        <div className='type'>
          <p className='p'>Type:</p>
          <ButtonGroup className= 'ButtonGroupType' size="medium" color="inherit" aria-label="Medium-sized button group">
            {['Dive site', 'Animal', 'Plant'].map((type, index) => (
              <Button
                key={index}
                onClick={() => handleButtonClick(type)}
                variant={selectedType === type ? 'contained' : 'outlined'}
              >
                {type}
              </Button>
            ))}
          </ButtonGroup>
        </div>
        <br />
        <TextField
          label="Name"
          type="text"
          id="Name"
          name="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="TextField"
        />
        <TextField
          label="Latitude"
          type="text"
          id="latitude"
          name="latitude"
          value={latitude}
          onChange={handleLatitudeChange}
          className="TextField"
        />
        <TextField
          label="Longitude"
          type="text"
          id="Longitude"
          name="Longitude"
          value={longitude}
          onChange={handleLongitudeChange}
          className="TextField"
        />
        <div>
          <p className='p'>Site Description:</p>
          <textarea
            className="siteDescription"
            value={description}
            onChange={handleDescriptionChange}
          />
        </div>
        <Snackbar
          open={openSnackbar}
          autoHideDuration={2700}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
          <Alert
            className="Alert"
            onClose={handleCloseSnackbar}
            severity="success"
            sx={{ width: '100%' }}
          >
            Dive Site Added!
          </Alert>
        </Snackbar>
        <div className="addSiteButton">
          <Button
            size="large"
            type="submit"
            variant="outlined"
            endIcon={<AddLocationTwoToneIcon />}
          >
            Add Dive Site
          </Button>
        </div>
        <br />
      </form>
    </div>
  );
}
