/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable radix */
/* eslint-disable no-nested-ternary */
/* eslint-disable perfectionist/sort-imports */
import { useRef,useState } from "react";

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
    uploadeImage: '',
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
      uploadeImage: false
    }
  });

  const [selectedDate, setSelectedDate] = useState(null);

  const [imagePreview, setImagePreview] = useState(null);

  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const fileInputRef = useRef(null);

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  const onSelectFile = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setInsertData(prevData => ({
          ...prevData,
          file: reader.result, 
        }));
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  };

  const handleRankChange = (event, newValue) => {
    // Update the rank value in the insertData state
    setInsertData(prevData => ({
      ...prevData,
      rank: newValue,
    }));
  };
  
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

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission behavior

    // Log form data to the console
    console.log(insertData);

    // Check if the Date Of Dive field is empty
    if (!insertData.dateDive) {
      // Set error for Date Of Dive field
      setInsertData(prevFormData => ({
        ...prevFormData,
        errors: {
          ...prevFormData.errors,
          dateDive: true,
        },
      }));
      // Return to prevent further processing
      return;
    }

    

    console.log('The form attributes are: ', insertData);
    const divingData = {
      dateDive: insertData.dateDive,
      timeDive: insertData.timeDive,
      site: insertData.site,
      objectGroup: insertData.objectGroup,
      specie: insertData.specie,
      file: insertData.file,
      imgLocation: insertData.imgLocation,
      arReef: insertData.arReef,
      reportType: insertData.reportType,
      typeOfDive: insertData.typeOfDive,
      rank: insertData.rank,
      userDescription: insertData.userDescription,
      maxDepth: insertData.maxDepth,
      distance: insertData.distance,
      temp: insertData.temp,
      uploadeImage: insertData.uploadeImage
    };

    // const jsdonDivingData = {
    //   divingData
    // };

    // const jsdonDivingDataString = JSON.stringify(jsdonDivingData, null, 2);

    // try {
    //   const response = await fetch('/api/data', {
    //     method: 'POST',
    //     Headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify(jsdonDivingDataString),
    //   });
    //   if (response.ok) {
    //     console.log('Data saved successfully');
    //     // Reset form data after successful submission
    //     setInsertData({ /* Reset your form data here */ });
    //   } else {
    //     console.error('Failed to save data:', response.statusText);
    //   }
    // } catch (e) {
    //   console.error('Error saving data:', e.message);
    // }

  }

  return (
    <div className="container">
      <h2>Input the details from your recents dives</h2>

      <form onSubmit={handleSubmit}>


        <br />
        <div className="twoInLine">

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
        <div className="twoInLine">
          <Autocomplete
            options={dataLists.specieName}
            getOptionLabel={(option) => (option)}
            onChange={(e, value) =>
              handleAutocompleteChange("specie", value || "")
            }
            renderInput={(params) => (
              <TextField
                {...params}
                label="Specie Name"
                name="specie"
                autoComplete='specie'
                className="fieldInput"
              />
            )}
          />

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

          <label className="lblButtonsGroup">Photo Took In Artificial Reef:</label>

          <ButtonGroup size="large" color="inherit" aria-label="Large button group">
            {isArButtonGroup.map((button, index) => (
              <Button key={index}>{button}</Button>
            ))}
          </ButtonGroup>

        </div>
        <br />
        <div className="twoInLine">
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

        <div className="parentContainer">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['DatePicker']} valueType="date">
              <div>
                <DatePicker

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
                      helperText: insertData.errors.dateDive && 'Invalid dive date'
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
          </LocalizationProvider>

        </div>
        <br />
        <div>

          <label className="lblButtonsGroup">Dive Took Place During:</label>

          <ButtonGroup size="large" color="inherit" aria-label="Large button group">
            {timeButtons.map((button, index) => (
              <Button key={index}>{button}</Button>
            ))}
          </ButtonGroup>

        </div>
        <br />
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <label className="lblButtonsGroup">Dive Rank:</label>
          <Stack spacing={1}>
            <Rating
              // sx={{ color: 'red' }}
              name="size-large"
              defaultValue={2}
              size="large"
              onChange={handleRankChange} // Attach the event handler here
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
          <label htmlFor="uploadeImage" className="lblButtonsGroup">
            Upload an image
          </label>
          <input
            ref={fileInputRef}
            type="file"
            onChange={onSelectFile}
            id="uploadeImage"
            name="uploadeImage"
            required
          />

          {/* Conditional rendering for image preview */}
          <div className="image-placeholder">
            {imagePreview ? (
              <img src={imagePreview} alt="Preview" />
            ) : (
              <div className="placeholder-icon">
                <IconButton size="large" onClick={() => fileInputRef.current.click()}>
                  <AddAPhotoIcon fontSize="inherit"  />
                </IconButton>
              </div>
            )}
          </div>
          {/* Popup screen */}
      {isPopupOpen && (
        <div className="popup">
          <div className="popup-inner">
            <button onClick={togglePopup}>Close</button>
            <img src={imagePreview} alt="Preview" />
          </div>
        </div>
      )}
        </div>
        <br />
        <div>
          <label className="lblButtonsGroup" htmlFor="userDescription">Tell us about your diving trip:</label>
          <textarea id="userDescription" name="userDescription" rows={3} className="custom-textarea" />
        </div>
        <br />
        <div className="insideContiner">
          <Button size="large" type="submit" variant="outlined" endIcon={<SendIcon />}>
            Submit
          </Button>

        </div>
        <br />

      </form>


      <h2>Thank you for your contribution!</h2>
    </div>


  )
}
