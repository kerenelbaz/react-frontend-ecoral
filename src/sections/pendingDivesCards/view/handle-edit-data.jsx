
import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';

import Slide from '@mui/material/Slide';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import { styled } from '@mui/material/styles';
import Snackbar from '@mui/material/Snackbar';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import DialogTitle from '@mui/material/DialogTitle';
import Autocomplete from '@mui/material/Autocomplete';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';

import config from 'src/sections/configServer';

import './style.css';
import dataLists from '../../insertData/view/dataLists.json';

const humanWildInterList = [
  'Between 3 to 10 M',
  'Closer than 10 M',
  'Forther than 10 M',
  'Macro',
  'NA',
];

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(4),
    overflowY: 'initial',
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
  '& .MuiDialog-paper': {
    maxWidth: '90%',
    width: '1400px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
}));

export default function EditData({ open, handleClose, pendingData, onDeleteClick }) {
  const [stateSnackbar, setStateSnackbar] = useState({
    open: false,
    Transition: Slide,
  });

  const [formData, setFormData] = useState({
    ...pendingData,
    objectCode: '',
    idCode: '',
    humanWildInter: '',
    researcherDesc: '',
    loggedBy: '',
  });

  const [diveCode, setDiveCode] = useState(null);
  const [diveCodeState, setDiveCodeState] = useState('');

  useEffect(() => {
    setFormData((prevData) => ({
      ...prevData,
      ...pendingData,
    }));

    console.log(pendingData);
  }, [pendingData]);

  useEffect(() => {
    if (pendingData && pendingData.diveCode) {
      setDiveCodeState(pendingData.diveCode);
    }
  }, [pendingData]);

  useEffect(() => {
    if (open && pendingData) {
      generateDiveCode(pendingData.linkURL).then((newDiveCode) => {
        setDiveCode(newDiveCode);
        setDiveCodeState(newDiveCode);
      });
    }
  }, [open, pendingData]);

  useEffect(() => {
    console.log('Generated diveCode:', diveCode);
  }, [diveCode]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFormInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const formatDateTime = (dateTimeString) => {
    const dateFormatRegex1 = /^\w{3} \w{3} \d{2} \d{4} \d{2}:\d{2}:\d{2} GMT[+-]\d{4} \([\w\s]+\)$/;
    const dateFormatRegex2 = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/;

    if (!dateFormatRegex1.test(dateTimeString) && !dateFormatRegex2.test(dateTimeString)) {
      return dateTimeString;
    }

    const dateTime = new Date(dateTimeString);

    const dateFormatter = new Intl.DateTimeFormat('en-GB', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
    const formattedDate = dateFormatter.format(dateTime);

    const timeFormatter = new Intl.DateTimeFormat('en-GB', {
      hour: '2-digit',
      minute: '2-digit',
    });
    const formattedTime = timeFormatter.format(dateTime);

    return `${formattedDate}, ${formattedTime}`;
  };

  const handleTextareaChange = (value) => {
    setFormData((prevData) => ({
      ...prevData,
      researcherDesc: value,
    }));
  };
  // const handleloggedby = (value) => {
  //   setFormData(prevData => ({
  //     ...prevData,
  //     loggedBy: value
  //   }));
  // };

  const handleAutocompleteChange = (name, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleClickSnack = () => {
    setStateSnackbar({
      open: true,
      Transition: Slide,
    });
  };

  const handleCloseSnack = () => {
    setStateSnackbar({
      ...stateSnackbar,
      open: false,
    });
  };

  const handleImageClick = () => {
    console.log('Image clicked'); // Add your image click handler logic here
  };

  const generateDiveCode = async (linkURL) => {
    try {
      const response = await fetch(`${config.serverUrl}/api/dives`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const responseData = await response.json();
      const { dives: fetchedDives } = responseData.data;

      // Handle cases where linkURL is undefined, null, or empty
      if (!linkURL || linkURL === 'No Link') {
        linkURL = `unique-${Math.random().toString(36).substring(2, 15)}`;
      }

      // Extract numeric part and suffix from each dive code
      const diveCodeParts = fetchedDives
        .map((dive) => {
          const match =
            dive.diveCode && typeof dive.diveCode === 'string'
              ? dive.diveCode.match(/(\d+)([A-Z]?)/)
              : null;
          return match ? { base: parseInt(match[1], 10), suffix: match[2] || 'A' } : null;
        })
        .filter((part) => part !== null);

      // Find the highest numeric base
      const highestBase =
        diveCodeParts.length === 0 ? 0 : Math.max(...diveCodeParts.map((part) => part.base));

      // Find the highest suffix for the given linkURL
      const newDiveCodeBase = highestBase + 1;
      let newDiveCode = `${newDiveCodeBase}A`;

      const existingDives = fetchedDives.filter((dive) => dive.linkURL === linkURL);
      if (existingDives.length > 0) {
        const baseCode = parseInt(existingDives[0].diveCode.match(/(\d+)/)[1], 10);
        const highestSuffix = Math.max(
          ...existingDives.map((dive) => {
            if (dive.diveCode && typeof dive.diveCode === 'string') {
              return dive.diveCode.charCodeAt(dive.diveCode.length - 1) - 65;
            }
            return -1; // Default to 'A' if no valid suffix is found
          })
        );
        newDiveCode = `${baseCode}${String.fromCharCode(65 + highestSuffix + 1)}`;
      }

      return newDiveCode;
    } catch (error) {
      console.error('Error fetching documents:', error.message);
      return 'Error';
    }
  };

  const handleSaveChanges = async () => {
    const newDiveCode = await generateDiveCode(formData.linkURL);
    setDiveCode(newDiveCode);

    const objectDiveToServer = {
      diveCode: newDiveCode,
      objectCode: formData.objectCode,
      date: formData.date,
      time: formData.time,
      diveSite: formData.diveSite,
      objectGroup: formData.objectGroup,
      specie: formData.specie,
      idCode_photographerName: formData.idCode_photographerName,
      imageLocation: formData.imageLocation,
      AR: formData.AR,
      humanWildlifeInteraction: formData.humanWildlifeInteraction,
      reportType: formData.reportType,
      typeOfDive: formData.typeOfDive,
      rankOfDive: formData.rankOfDive,
      media: formData.media,
      documentation: formData.documentation,
      ageOfDiver: formData.ageOfDiver,
      sexOfDiver: formData.sexOfDiver,
      maxDepth: formData.maxDepth,
      distance: formData.distance,
      temp: formData.temp,
      userDescription: formData.userDescription,
      researcherComment: formData.researcherComment,
      linkURL: formData.linkURL,
      loggedBy: formData.loggedBy,
      loggingDate: formData.loggingDate,
      fileLink: formData.file,
    };

    console.log('send to server: ', objectDiveToServer);

    try {
      const response = await fetch(`${config.serverUrl}/api/dives`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
        },
        body: JSON.stringify(objectDiveToServer),
      });

      if (response.ok) {
        handleClickSnack();
        onDeleteClick(formData);
        handleClose();
      } else {
        console.error('Failed to save data:', response.statusText);
      }
    } catch (error) {
      console.error('Error saving data:', error.message);
    }
  };

  return (
    
    <BootstrapDialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
      <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
        Dive Code: {diveCodeState}
      </DialogTitle>
      <IconButton
        aria-label="close"
        onClick={handleClose}
        sx={{
          position: 'absolute',
          right: 8,
          top: 8,
          color: (theme) => theme.palette.grey[500],
        }}
      >
        <CloseIcon />
      </IconButton>
      <DialogContent dividers>
        {pendingData && (
          <>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <Button onClick={handleImageClick}>
                <div className="wrapImg">
                  <img className="imageB" src={pendingData.file} alt="Preview" />
                </div>
              </Button>
            </div>
            <div className="containerEd">
              <form>
                <div>
                  <div className="txtContainer">
                    <div>
                      <TextField
                        InputProps={{ readOnly: true }}
                        id="standard-read-only-input"
                        label="Data logged at: "
                        defaultValue={formatDateTime(pendingData.loggingDate)}
                        variant="standard"
                        className="dateStyle"
                      />

                      <TextField
                        InputProps={{ readOnly: true }}
                        id="standard-read-only-input"
                        label="Date dive: "
                        defaultValue={formatDateTime(pendingData.dateDive)}
                        variant="standard"
                        className="dateStyle"
                      />
                    </div>
                  </div>
                  <br />
                  <div className="txtContainer">
                    <div>
                      <TextField
                        label="Logged By"
                        defaultValue={pendingData.loggedBy}
                        name="loggedBy"
                        variant="standard"
                        className="dateStyle"
                        onChange={handleInputChange}
                        value={formData.loggedBy}
                      />
                      <TextField
                        label="Photo took in AR: "
                        defaultValue={pendingData.ar}
                        name="arReef"
                        variant="standard"
                        className="dateStyle"
                        onChange={handleFormInputChange}
                      />
                      <TextField
                        id="standard-read-only-input"
                        label="Dive took place during: "
                        defaultValue={pendingData.time}
                        variant="standard"
                        className="dateStyle"
                        onChange={handleFormInputChange}
                      />
                      <TextField
                        id="standard-read-only-input"
                        label="Dive Rank: "
                        defaultValue={pendingData.rankOfDive}
                        variant="standard"
                        className="dateStyle"
                        onChange={handleFormInputChange}
                      />
                    </div>
                  </div>
                  <br />
                  <br />
                  <div className="inLine">
                    <Autocomplete
                      options={dataLists.diveSite}
                      defaultValue={pendingData.diveSite}
                      getOptionLabel={(option) => option}
                      onChange={(e, value) => handleAutocompleteChange('diveSite', value || '')}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          required
                          label="Dive Site"
                          name="diveSite"
                          autoComplete="diveSite"
                          className="fieldInput"
                          value={formData.diveSite}
                        />
                      )}
                    />
                    <Autocomplete
                      options={dataLists.objectGroupList}
                      getOptionLabel={(option) => option}
                      defaultValue={pendingData.objectGroup}
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
                    <Autocomplete
                      options={dataLists.specieName}
                      getOptionLabel={(option) => option}
                      defaultValue={pendingData.specie}
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
                  </div>
                  <div className="inLine">
                    <Autocomplete
                      options={dataLists.imageLocation}
                      getOptionLabel={(option) => option}
                      defaultValue={pendingData.imageLocation}
                      onChange={(e, value) =>
                        handleAutocompleteChange('imageLocation', value || '')
                      }
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          required
                          label="Image Location"
                          name="imageLocation"
                          autoComplete="imageLocation"
                          className="fieldInput"
                        />
                      )}
                    />
                    <Autocomplete
                      options={dataLists.ReportType}
                      getOptionLabel={(option) => option}
                      defaultValue={pendingData.reportType}
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
                      defaultValue={pendingData.typeOfDive}
                      onChange={(e, value) => handleAutocompleteChange('typeOfDive', value || '')}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          required
                          label="Type Of Dive"
                          name="typeOfDive"
                          autoComplete="typeOfDive"
                          className="fieldInput"
                        />
                      )}
                    />
                  </div>
                  <div className="inLine">
                    <Autocomplete
                      options={humanWildInterList}
                      getOptionLabel={(option) => option}
                      onChange={(e, value) =>
                        handleAutocompleteChange('humanWildInter', value || '')
                      }
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Human-wildlife interaction"
                          name="humanWildInter"
                          autoComplete="humanWildInter"
                          className="fieldInput"
                        />
                      )}
                    />
                  </div>
                  <div className="inLine">
                    <TextField
                      label="Max Depth (meters)"
                      type="text"
                      id="maxDepth"
                      name="maxDepth"
                      className="fieldInput"
                      defaultValue={pendingData.maxDepth}
                      onChange={handleFormInputChange}
                    />
                    <TextField
                      label="Distance (meters)"
                      type="number"
                      id="standard-number"
                      name="distance"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      className="fieldInput"
                      defaultValue={pendingData.distance}
                      onChange={handleInputChange}
                    />
                    <TextField
                      label="Temperature (celsius)"
                      type="text"
                      name="temp"
                      id="standard-number"
                      className="fieldInput"
                      defaultValue={pendingData.temp}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="inLine">
                    <TextField
                      label="ID Code"
                      type="text"
                      name="idCode"
                      className="fieldInput"
                      onChange={handleFormInputChange}
                      value={formData.idCode}
                    />
                    <TextField
                      label="Object Code"
                      name="objectCode"
                      autoComplete="objectCode"
                      className="fieldInput"
                      onChange={handleFormInputChange}
                      value={formData.objectCode}
                    />
                  </div>
                  <div>
                    <label className="lblDesc" htmlFor="userDescription">
                      User dives description:
                    </label>
                    <p
                      id="userDescription"
                      className="lblDesc"
                    >{`"${pendingData.userDescription}"`}</p>
                  </div>
                  <div>
                    <label className="lblDesc" htmlFor="researcherDesc">
                      Researcher Comments:
                    </label>
                    <textarea
                      id="researcherDesc"
                      name="researcherDesc"
                      rows={3}
                      className="admin-textarea"
                      onChange={(e) => handleTextareaChange(e.target.value)}
                    />
                  </div>
                </div>
              </form>
              <Snackbar
                open={stateSnackbar.open}
                onClose={handleCloseSnack}
                TransitionComponent={stateSnackbar.Transition}
                key={stateSnackbar.Transition.name}
                autoHideDuration={1500}
              >
                <Alert
                  onClose={handleClose}
                  severity="success"
                  variant="filled"
                  sx={{ width: '100%', fontSize: '25px' }}
                >
                  🐠 Dive saved, removed from pending table 🐠
                </Alert>
              </Snackbar>
            </div>
          </>
        )}
      </DialogContent>
      <DialogActions>
        <Button style={{ fontSize: '20px' }} autoFocus onClick={handleSaveChanges}>
          Save changes
        </Button>
      </DialogActions>
    </BootstrapDialog>
  );
}

EditData.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  pendingData: PropTypes.object,
  onDeleteClick: PropTypes.func,
};
