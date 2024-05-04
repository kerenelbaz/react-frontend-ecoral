import { useState } from 'react';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import ButtonGroup from '@mui/material/ButtonGroup';
import AddLocationTwoToneIcon from '@mui/icons-material/AddLocationTwoTone';

import './addDiveSiteStyle.css';

export default function AddDiveSiteView() {
  const [selectedType, setSelectedType] = useState(null);

  function handleButtonClick() {
    return null;
  }

  return (
   
      <div className="container2">
        <h1>Add Dive Site To Map</h1>
        <br />
        <form>
          <div>
            <p>Type:</p>
            <ButtonGroup size="large" color="inherit" aria-label="Large button group">
              {['Dive Site', 'Animal', 'Plant'].map((type, index) => (
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
            label='Name'
            type="text"
            id="Name"
            name="Name"
            // onChange={handleInputChange}
            // error={insertData.errors.distance}
            // helperText={insertData.errors.distance && 'number higher than 0'}
            className="TextField"
          />
          <TextField
            label='Latitude'
            type="floate"
            id="latitude"
            name="latitude"
            // onChange={handleInputChange}
            // error={insertData.errors.distance}
            // helperText={insertData.errors.distance && 'number higher than 0'}
            className="TextField"
          />
          <TextField
            label='Longitude'
            type="float"
            id="Longitude"
            name="Longitude"
            // onChange={handleInputChange}
            // error={insertData.errors.distance}
            // helperText={insertData.errors.distance && 'number higher than 0'}
            className="TextField"
          />
          <div>
            <p>Site Description:</p>
            <textarea className="siteDescription" />
          </div>
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
