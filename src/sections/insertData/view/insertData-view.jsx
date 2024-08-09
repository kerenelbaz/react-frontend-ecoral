/* eslint-disable no-nested-ternary */
/* eslint-disable jsx-a11y/label-has-associated-control */
import axios from 'axios';
import { useRef, useState, useEffect } from 'react';

import Stack from '@mui/material/Stack';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Rating from '@mui/material/Rating';
import Snackbar from '@mui/material/Snackbar';
import SendIcon from '@mui/icons-material/Send';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import ButtonGroup from '@mui/material/ButtonGroup';
import Autocomplete from '@mui/material/Autocomplete';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

import config from 'src/sections/configServer';

import './styleByMe.css';
import CameraCapture from './camera';
import dataLists from './dataLists.json';

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
      uploadeImage: false,
    },
  });

  // const [diveCode, setDiveCode] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedReef, setSelectedReef] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [capturedImage, setCapturedImage] = useState(null);  // Store the captured image
  const fileInputRef = useRef(null);
  const [currentView, setCurrentView] = useState(imagePreview ? 'image' : 'placeholder');

  const handleViewChange = () => {
    setCurrentView(currentView === 'image' ? 'camera' : 'image');
  };

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await fetch(`${config.serverUrl}/api/dives`);
  //       if (!response.ok) {
  //         throw new Error('Network response was not ok');
  //       }

  //       const responseData = await response.json();
  //       const { dives } = responseData.data;

  //       const numericDiveCodes = dives
  //         .map((dive) => dive.diveCode)
  //         .filter((code) => !Number.isNaN(parseInt(code, 10)));

  //       let newDiveCode;
  //       if (numericDiveCodes.length === 0) {
  //         newDiveCode = 0;
  //       } else {
  //         const lastDiveCode = Math.max(...numericDiveCodes);
  //         newDiveCode = lastDiveCode + 1;
  //       }

  //       // setDiveCode(newDiveCode); // Set the state with the new dive code
  //     } catch (error) {
  //       console.error('Error fetching documents:', error.message);
  //     }
  //   };

  //   fetchData();
  // }, []);

  // Update button states when selectedTime or selectedReef changes
  useEffect(() => {
    setInsertData((prevData) => ({
      ...prevData,
      timeDive: selectedTime,
      arReef: selectedReef,
    }));
  }, [selectedTime, selectedReef]);

  // Function to upload image to Cloudinary and get the URL
  const uploadToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'ecoral_preset');

    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/image/upload`,
        formData
      );
      return response.data.secure_url;
    } catch (error) {
      console.error('Error uploading to Cloudinary:', error);
      return null;
    }
  };

  const onSelectFile = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      const imageUrl = URL.createObjectURL(file);
      setImagePreview(imageUrl);
    } else {
      setImagePreview(null);
    }
  };

  // const sendImage = (image) => {
  //   setImagePreview(image);
  //   setInsertData((prevData) => ({
  //     ...prevData,
  //     file: image,
  //   }));
  // };

  const handleRankChange = (event, newValue) => {
    setInsertData((prevData) => ({
      ...prevData,
      rank: newValue,
    }));
  };

  const handleDateChange = (date) => {
    const isValidYear = isAppropriateDate(date);
    if (!isValidYear) {
      setInsertData((prevFormData) => ({
        ...prevFormData,
        errors: {
          ...prevFormData.errors,
          dateDive: true,
        },
      }));
      setSelectedDate(date);
      return;
    }
    setInsertData((prevFormData) => ({
      ...prevFormData,
      dateDive: date,
      errors: {
        ...prevFormData.errors,
        dateDive: false,
      },
    }));
  };

  function isAppropriateDate(diveDate) {
    const today = new Date();

    const diveYear = diveDate.$y;
    const diveMonth = diveDate.$M;
    const diveDay = diveDate.$D;

    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth();
    const currentDay = today.getDate();

    return (
      diveYear >= 2014 &&
      (diveYear < currentYear ||
        (diveYear === currentYear && diveMonth < currentMonth) ||
        (diveYear === currentYear && diveMonth === currentMonth && diveDay <= currentDay))
    );
  }

  const timeButtons = ['Light', 'Night'];

  const isArButtonGroup = ['Yes', 'No', 'Maybe'];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let isValid = true;

    const numericRegex = /^[0-9]*$/;

    if (!numericRegex.test(value)) {
      isValid = false;
    }

    setInsertData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
      errors: {
        ...prevFormData.errors,
        [name]: !isValid,
      },
    }));
  };

  const handleAutocompleteChange = (name, value) => {
    setInsertData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleButtonClick = (value, group) => {
    if (group === 'time') {
      setSelectedTime(value === selectedTime ? null : value);
      setInsertData((prevData) => ({
        ...prevData,
        timeDive: value,
      }));
    } else if (group === 'reef') {
      setSelectedReef(value === selectedReef ? null : value);
      setInsertData((prevData) => ({
        ...prevData,
        arReef: value,
      }));
    }
  };

  const handleTextareaChange = (value) => {
    setInsertData((prevData) => ({
      ...prevData,
      userDescription: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Check if the date is selected
    if (!insertData.dateDive) {
      setInsertData((prevFormData) => ({
        ...prevFormData,
        errors: {
          ...prevFormData.errors,
          dateDive: true, // Trigger the error for the date field
        },
      }));
      alert('Please select a date before submitting.');
      return; // Exit the function to prevent submission
    }

    // Check if an image has been uploaded
    if (!capturedImage && !selectedFile) {
      setInsertData((prevFormData) => ({
        ...prevFormData,
        errors: {
          ...prevFormData.errors,
          file: true, // Trigger the error for the file field
        },
      }));
      alert('Please upload an image before submitting.');
      return; // Exit the function to prevent submission
    }

    // Proceed with the image upload and form submission
    let imageUrl = null;

    if (capturedImage) {
      try {
        console.log("Uploading captured image...");
        imageUrl = await uploadToCloudinary(capturedImage);
        console.log("Captured image uploaded to Cloudinary:", imageUrl);
      } catch (error) {
        console.error("Error uploading captured image to Cloudinary:", error);
        return; // Exit the function if upload fails
      }
    } else if (selectedFile) {
      try {
        console.log("Uploading selected file...");
        imageUrl = await uploadToCloudinary(selectedFile);
        console.log("Selected file uploaded to Cloudinary:", imageUrl);
      } catch (error) {
        console.error("Error uploading selected file to Cloudinary:", error);
        return; // Exit the function if upload fails
      }
    }

    // Continue with form submission using the uploaded image URL
    if (imageUrl) {
      setInsertData((prevData) => {
        const updatedData = {
          ...prevData,
          file: imageUrl,
        };
        console.log("File after upload is", updatedData.file);

        // Proceed with the submission using the updated data
        submitData(updatedData);

        return updatedData;
      });
    } else {
      // Proceed with the submission using the current state
      submitData(insertData);
    }
  };




  const submitData = async (data) => {
    console.log("image url: ", selectedFile);
    console.log("fileLink: insertData.file,", data.file);

    const userJsonString = localStorage.getItem('user');
    const user = JSON.parse(userJsonString.replace(/^"(.*)"$/, '$1'));

    const birthDate = new Date(user.birthDate);
    const currentDate = new Date();
    let age = currentDate.getFullYear() - birthDate.getFullYear();
    if (currentDate.getMonth() > birthDate.getMonth()) age += 1;

    const { gender } = user;
    const { name } = user;
    console.log("name: ", name);

    const entireDivingData = {
      // diveCode,
      date: data.dateDive,
      time: data.timeDive,
      diveSite: data.site,
      objectGroup: data.objectGroup,
      specie: data.specie,
      file: data.file,
      imageLocation: data.imgLocation,
      uploadeImage: data.uploadeImage,
      AR: data.arReef,
      reportType: data.reportType,
      typeOfDive: data.typeOfDive,
      rankOfDive: data.rank,
      userDescription: data.userDescription,
      maxDepth: data.maxDepth,
      distance: data.distance,
      temp: data.temp,
      ageOfDiver: age,
      sexOfDiver: gender,
      media: 'Website',
      documentation: 'P',
      idCode_photographerName: name,
    };
    // console.log("entierlk", entireDivingData)
    // if (!data.dateDive) {
    //   setInsertData((prevFormData) => ({
    //     ...prevFormData,
    //     errors: {
    //       ...prevFormData.errors,
    //       dateDive: true,
    //     },
    //   }));
    //   return;
    // }

    const hasErrors = Object.values(data.errors).some((error) => error);

    if (hasErrors) {
      console.log('There are errors in the form. Data not saved.');
      return;
    }

    try {
      const response = await fetch(`${config.serverUrl}/api/pendings_dives`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
        },
        body: JSON.stringify(entireDivingData),
      });

      console.log(entireDivingData);

      if (response.ok) {
        setOpenSnackbar(true);
        setTimeout(() => {
          window.location.reload();
        }, 2500);

        setInsertData({
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
            uploadeImage: false,
          },
        });
      } else {
        console.error('Failed to save data:', response.statusText);
      }
    } catch (error) {
      console.error('Error saving data:', error.message);
    }
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };

  return (
    <div className="container">
      <h2>Input the details from your recents dives</h2>

      <form onSubmit={handleSubmit}>
        <br />
        <div className="twoInLine">
          <Autocomplete
            options={dataLists.diveSite}
            getOptionLabel={(option) => option}
            onChange={(e, value) => handleAutocompleteChange('site', value || '')}
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
            getOptionLabel={(option) => option}
            onChange={(e, value) => handleAutocompleteChange('objectGroup', value || '')}
            renderInput={(params) => (
              <TextField
                {...params}
                required
                label="Object Group"
                name="objectGroup"
                autoComplete="objectGroup"
                className="fieldInput"
              />
            )}
          />
        </div>
        <div className="twoInLine">
          <Autocomplete
            options={dataLists.specieName}
            getOptionLabel={(option) => option}
            onChange={(e, value) => handleAutocompleteChange('specie', value || '')}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Specie Name"
                name="specie"
                autoComplete="specie"
                className="fieldInput"
              />
            )}
          />

          <Autocomplete
            options={dataLists.imageLocation}
            getOptionLabel={(option) => option}
            onChange={(e, value) => handleAutocompleteChange('imgLocation', value || '')}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Image Location"
                name="imgLocation"
                autoComplete="imgLocation"
                className="fieldInput"
              />
            )}
          />
        </div>
        <br />
        <div>
          <label className="lblButtonsGroup">Photo Took In Artificial Reef:</label>

          <ButtonGroup size="large" color="inherit" aria-label="Large button group">
            {isArButtonGroup.map((button, index) => (
              <Button
                key={index}
                onClick={() => handleButtonClick(button, 'reef')}
                variant={selectedReef === button ? 'contained' : 'outlined'}
              >
                {button}
              </Button>
            ))}
          </ButtonGroup>
        </div>
        <br />
        <div className="twoInLine">
          <Autocomplete
            options={dataLists.ReportType}
            getOptionLabel={(option) => option}
            onChange={(e, value) => handleAutocompleteChange('reportType', value || '')}
            renderInput={(params) => (
              <TextField
                {...params}
                required
                label="Report Type"
                name="reportType"
                autoComplete="reportType"
                className="fieldInput"
              />
            )}
          />

          <Autocomplete
            options={dataLists.typeOfDive}
            getOptionLabel={(option) => option}
            onChange={(e, value) => handleAutocompleteChange('typeOfDive', value || '')}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Type Of Dive"
                name="typeOfDive"
                autoComplete="typeOfDive"
                className="fieldInput"
              />
            )}
          />
        </div>

        <div className="twoInLine">
          <div className="parentContainer" style={{ width: '70%' }}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={['DatePicker']} valueType="date">
                <div>
                  <DatePicker
                    label="Date Of Dive *"
                    id="dateDive"
                    name="dateDive"
                    onChange={handleDateChange}
                    format="DD/MM/YYYY"
                    required
                    inputStyle={{
                      color: insertData.errors.dateDive ? 'red' : selectedDate ? 'blue' : '#1675E8',
                    }}
                    slotProps={{
                      textField: {
                        error: insertData.errors.dateDive,
                        helperText: insertData.errors.dateDive && 'Invalid dive date',
                      },
                      InputProps: {
                        style: {
                          color: selectedDate ? 'blue' : '#1675E8',
                          fontWeight: selectedDate ? 'bold' : 'normal',
                        },
                      },
                    }}
                  />
                </div>
              </DemoContainer>
            </LocalizationProvider>
          </div>
          <div style={{
            width: '30%',
            display: 'flex',
            alignItems: 'center',
            paddingLeft: '10px',
            border: '1px solid #1675E8',
            borderRadius: '8px',
            padding: '10px',
            backgroundColor: '#f0f8ff',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          }}>
            <p style={{ margin: 0 }}>If you don&apos;t know the specific date, insert the first day of the month.</p>
          </div>
        </div>

        <br />
        <div>
          <label className="lblButtonsGroup">Dive Took Place During:</label>

          <ButtonGroup size="large" color="inherit" aria-label="Large button group">
            {timeButtons.map((button, index) => (
              <Button
                key={index}
                onClick={() => handleButtonClick(button, 'time')}
                variant={selectedTime === button ? 'contained' : 'outlined'}
              >
                {button}
              </Button>
            ))}
          </ButtonGroup>
        </div>
        <br />
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <label className="lblButtonsGroup">Dive Rank:</label>
          <Stack spacing={1}>
            <Rating
              name="size-large"
              defaultValue={insertData.rank}
              size="large"
              onChange={handleRankChange}
            />
          </Stack>
        </div>
        <br />
        <div>
          <TextField
            label="Max Depth (meters)"
            type="text"
            id="maxDepth"
            name="maxDepth"
            onChange={handleInputChange}
            error={insertData.errors.maxDepth}
            helperText={insertData.errors.maxDepth && 'only numbers higher than 0'}
            className="numbersField"
          />

          <TextField
            label="Distance (meters)"
            type="text"
            id="distance"
            name="distance"
            onChange={handleInputChange}
            error={insertData.errors.distance}
            helperText={insertData.errors.distance && 'number higher than 0'}
            className="numbersField"
          />

          <TextField
            label="Temperature (celsius)"
            type="text"
            id="temp"
            name="temp"
            onChange={handleInputChange}
            error={insertData.errors.temp}
            helperText={insertData.errors.temp && 'temp is a number height than 0'}
            className="numbersField"
          />
        </div>
        <div>
          <label htmlFor="uploadeImage" className="lblButtonsGroup">
            Upload an image *
          </label>
          <Button onClick={handleViewChange}>
            {currentView === 'image'
              ? 'Switch to Camera'
              : currentView === 'camera'
                ? 'Back to Files'
                : 'Add Image'}
          </Button>

          {currentView === 'camera' && (
            <CameraCapture sendImage={(imageBlob) => {
              const imageUrl = URL.createObjectURL(imageBlob);
              setImagePreview(imageUrl);
              setCapturedImage(imageBlob); // Store the Blob for later upload
            }} />
          )}

          {currentView === 'image' && (
            <Stack sx={{ alignContent: 'center' }}>
              <input
                ref={fileInputRef}
                type="file"
                onChange={onSelectFile}
                id="uploadeImage"
                name="uploadeImage"
                style={{ display: 'none' }}
              />
              <div className="image-placeholder">
                {imagePreview ? (
                  <img src={imagePreview} alt="Preview" />
                ) : (
                  <div className="placeholder-icon">
                    <IconButton size="large" onClick={() => fileInputRef.current.click()}>
                      <AddAPhotoIcon fontSize="inherit" />
                    </IconButton>
                  </div>
                )}
              </div>
            </Stack>
          )}
        </div>

        <br />
        <div>
          <label className="lblButtonsGroup" htmlFor="userDescription">
            Tell us about your diving trip:
          </label>
          <textarea
            id="userDescription"
            name="userDescription"
            rows={3}
            className="custom-textarea"
            onChange={(e) => handleTextareaChange(e.target.value)}
          />
        </div>
        <br />
        <Snackbar
          open={openSnackbar}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
          <Alert
            onClose={handleCloseSnackbar}
            severity="success"
            sx={{ width: '100%', minHeight: '64px', padding: '20px' }}
          >
            Your Diving Details Saved, Thank You
          </Alert>
        </Snackbar>
        <div className="insideContiner">
          <Button size="large" type="submit" variant="outlined" endIcon={<SendIcon />}>
            Submit
          </Button>
        </div>
        <br />
      </form>

      <h2>Thank you for your contribution!</h2>
    </div>
  );
}
