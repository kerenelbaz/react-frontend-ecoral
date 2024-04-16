/* eslint-disable radix */
/* eslint-disable no-nested-ternary */
/* eslint-disable perfectionist/sort-imports */
import { useState } from "react";
import Box from '@mui/material/Box';
// import Input from '@mui/material/Input';
import FormControl from '@mui/material/FormControl';
// import InputLabel from '@mui/material/InputLabel';
// import FormHelperText from '@mui/material/FormHelperText';
// eslint-disable-next-line import/no-extraneous-dependencies
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
// eslint-disable-next-line import/no-extraneous-dependencies
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// eslint-disable-next-line import/no-extraneous-dependencies
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// eslint-disable-next-line import/no-extraneous-dependencies
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import ButtonGroup from '@mui/material/ButtonGroup';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import IconButton from '@mui/material/IconButton';


import dataLists from './dataLists.json';
import './styleByMe.css';


export default function InsertDataView() {
  const [insertData, setInsertData] = useState({
    dateDive: '',
    timeDive: '',
    site: '',
    objectGroup: '',
    specie: '',
    file: '',
    imgLocation: '',
    arReef: '',
    reportType: '',
    typeOfDive: '',
    rank: '',
    userDescription: '',
    maxDepth: '',
    distance: '',
    temp: '',
    errors: {
      dateDive: false,
      site: false,
      objectGroup: false,
      reportType: false,
      file: false,
      rank: false,
      maxDepth: false,
      distance: false,
      temp: false,
    }
  });

  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateChange = (date) => {
    const isValidYear = isAppropriateDate(date)
    if (!isValidYear) {
      // Mark the date as invalid 
      setInsertData(prevFormData => ({
        ...prevFormData,
        errors: {
          ...prevFormData.errors,
          dateDive: true, // Corrected from birthDate to diveDate
        },
      }));
      setSelectedDate(date);
      return;
    }
    // Update the form data with the valid dive date
    setInsertData(prevFormData => ({
      ...prevFormData,
      dateDive: date, // Updated from birthDate to diveDate
      errors: {
        ...prevFormData.errors,
        dateDive: false // Corrected from birthDate to diveDate
      },
    }));
  };

  function isAppropriateDate(diveDate) {
    const today = new Date();
    return (
      diveDate.$y >= 2014 &&
      diveDate.$D <= today.getDate() &&
      diveDate.$M <= today.getMonth() &&
      diveDate.$y <= today.getFullYear()
    );
  }

  const timeButtons = ['Light', 'Night'];

  const isArButtonGroup = ['Yes', 'No', 'Maybe'];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let isValid = true;
    switch (name) {
      case 'rank':
        isValid = parseInt(value) > 0 && parseInt(value) < 6;
        break;
      case 'maxDepth':
        isValid = parseInt(value) > 0;
        break;
      case 'distance':
        isValid = parseInt(value) > 0;
        break;
      case 'temp':
        isValid = parseInt(value) > 0;
        break;

      default:
        break;
    }
    setInsertData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
      errors: {
        ...prevFormData.errors,
        [name]: !isValid,
      },
    }));
  }

  const handleAutocompleteChange = (name, value) => {
    setInsertData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };



  return (
    <div className="container">
      <h2>Input the details from your recents dives</h2>

      <FormControl>

        <div className="insideContiner">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Box >
              <DemoContainer components={['DatePicker']} valueType="date">
                <div>
                  <DatePicker
                    className="custom-date-picker"
                    label="Date Of Dive"
                    id="dateDive"
                    name="dateDive"
                    onChange={handleDateChange}
                    format="DD/MM/YYYY"
                    required
                    inputStyle={{
                      color: insertData.errors.dateDive ? 'red' : (selectedDate ? 'blue' : '#1675E8'),
                    }}
                    slotProps={{
                      textField: {
                        error: insertData.errors.dateDive,
                        helperText: insertData.errors.dateDive && 'Invalid dive date',
                        className: "fieldInput", style: { width: "100%" }
                      },
                      InputProps: {
                        style: {
                          color: selectedDate ? 'blue' : '#1675E8',
                          fontWeight: selectedDate ? 'bold' : 'normal',
                        }
                      }
                    }}

                  />

                </div>
              </DemoContainer>
            </Box>
          </LocalizationProvider>

        </div>
        <br />
        <div >

          <lable className="lblButtonsGroup">Dive Took Place During:</lable>

          <ButtonGroup size="large" color="inherit" aria-label="Large button group">
            {timeButtons.map((button, index) => (
              <Button key={index}>{button}</Button>
            ))}
          </ButtonGroup>

        </div>
        <br />
        <div>

          <Autocomplete
            options={dataLists.diveSite}
            // specifies how to render the options in the dropdown list - returns the option itself
            getOptionLabel={(option) => option}
            onChange={(e, value) =>
              handleAutocompleteChange("site", value || "")
            }
            renderInput={(params) => (
              <TextField
                {...params}
                required
                label="Dive Site"
                name="site"
                autoComplete="site"
                className="fieldInput"

              />
            )}
          />
        </div>
        <div>
          <Autocomplete
            options={dataLists.objectGroupList}
            getOptionLabel={(option) => (option)}
            onChange={(e, value) =>
              handleAutocompleteChange("objectGroup", value || "")
            }
            renderInput={(params) => (
              <TextField
                {...params}
                required
                label="Object Group"
                name="objectGroup"
                autoComplete='objectGroup'
                className="fieldInput"
              />
            )}
          />

        </div>
        <div>
          <Autocomplete
            options={dataLists.specieName}
            getOptionLabel={(option) => (option)}
            onChange={(e, value) =>
              handleAutocompleteChange("specie", value || "")
            }
            renderInput={(params) => (
              <TextField
                {...params}
                required
                label="Specie Name"
                name="specie"
                autoComplete='specie'
                className="fieldInput"
              />
            )}
          />
        </div>
        <div>
          <Autocomplete
            options={dataLists.imageLocation}
            getOptionLabel={(option) => (option)}
            onChange={(e, value) =>
              handleAutocompleteChange("imgLocation", value || "")
            }
            renderInput={(params) => (
              <TextField
                {...params}
                label="Image Location"
                name="imgLocation"
                autoComplete='imgLocation'
                className="fieldInput"
              />
            )}
          />
        </div>
        <br />
        <div >

          <lable className="lblButtonsGroup">Photo Took In Artificial Reef:</lable>

          <ButtonGroup size="large" color="inherit" aria-label="Large button group">
            {isArButtonGroup.map((button, index) => (
              <Button key={index}>{button}</Button>
            ))}
          </ButtonGroup>

        </div>
        <br />
        <div>
          <Autocomplete
            options={dataLists.ReportType}
            getOptionLabel={(option) => (option)}
            onChange={(e, value) =>
              handleAutocompleteChange("reportType", value || "")
            }
            renderInput={(params) => (
              <TextField
                {...params}
                required
                label="Report Type"
                name="reportType"
                autoComplete='reportType'
                className="fieldInput"
              />
            )}
          />

        </div>
        <div>
          <Autocomplete
            options={dataLists.typeOfDive}
            getOptionLabel={(option) => (option)}
            onChange={(e, value) =>
              handleAutocompleteChange("typeOfDive", value || "")
            }
            renderInput={(params) => (
              <TextField
                {...params}

                label="Type Of Dive"
                name="typeOfDive"
                autoComplete='typeOfDive'
                className="fieldInput"
              />
            )}
          />

        </div>
        <br />
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <lable className="lblButtonsGroup">Dive Rank:</lable>
          <Stack spacing={1}>
            <Rating
              // sx={{ color: 'red' }}
              name="size-large"
              defaultValue={2}
              size="large"
            // value={insertData.rank}
            // onChange={(event, newValue) => {
            //   setInsertData.rank(newValue);
            // }}
            />
          </Stack>

        </div>
        <br />
        <div>
          <TextField
            label='Max Depth (in meters)'
            id="maxDepth"
            name="maxDepth"
            type="number"
            onChange={handleInputChange}
            error={insertData.errors.maxDepth}
            helperText={insertData.errors.maxDepth && 'number higher than 0'}
            className="numbersField"
          />

          <TextField
            label='Distance (in meters)'
            id="distance"
            name="distance"
            type="number"
            onChange={handleInputChange}
            error={insertData.errors.distance}
            helperText={insertData.errors.distance && 'number higher than 0'}
            className="numbersField"
          />

          <TextField
            label='Temperature (in celsius)'
            id="temp"
            name="temp"
            type="number"
            onChange={handleInputChange}
            error={insertData.errors.temp}
            helperText={insertData.errors.temp && 'temp is a number height than 0'}
            className="numbersField"
          />
        </div>
        <div>
          <lable className="lblButtonsGroup">Add photo</lable>
          <IconButton aria-label="delete" size="large">
            <AddAPhotoIcon fontSize="inherit" />
          </IconButton>

        </div>
        <div className="insideContiner">
          <Button size="large" variant="outlined" endIcon={<SendIcon />}>
          Submit
        </Button>
        </div>
        <br />
      </FormControl>
      

      <h2>Thank you for your contribution!</h2>
    </div>


  )
}
