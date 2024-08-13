/* eslint-disable jsx-a11y/label-has-associated-control */

import dayjs from 'dayjs';
import PropTypes from 'prop-types';
import React, { useState } from 'react';

import Slide from '@mui/material/Slide';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import { styled } from '@mui/material/styles';
import Snackbar from '@mui/material/Snackbar';
import Grid from '@mui/material/Unstable_Grid2';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import DialogTitle from '@mui/material/DialogTitle';
import Autocomplete from '@mui/material/Autocomplete';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';

import config from 'src/sections/configServer';
import 'src/sections/pendingAdmin/view/style.css';

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

export default function EditCardData({ open, handleClose, postData, onUpdate }) {
  const [stateSnackbar, setStateSnackbar] = useState({
    open: false,
    Transition: Slide,
  });
  const [setOpenImageDialog] = useState(false);


  const [formData, setFormData] = useState({
    ...postData,
  });

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

  const handleTextareaChange = (e) => {
    const {value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      researcherComment: value,
    }));
  };

  const handleAutocompleteChange = (name, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // const handleClickSnack = () => {
  //   setStateSnackbar({
  //     open: true,
  //     Transition: Slide,
  //   });
  // };

  const handleCloseSnack = () => {
    setStateSnackbar({
      ...stateSnackbar,
      open: false,
    });
  };

  const handleImageClick = () => {
    setOpenImageDialog(true);
  };
  const handleSaveChanges = async () => {
    // Function to get the changes between currentFormData and originalPostData
    const getChangedFields = (currentFormData, originalPostData) => {
      const changes = {};
      Object.keys(currentFormData).forEach(key => {
        if (currentFormData[key] !== originalPostData[key]) {
          changes[key] = currentFormData[key];
        }
      });

      return changes;
    };

    const changes = getChangedFields(formData, postData);
    if (Object.keys(changes).length === 0) {// Check if there are changes to save
      console.log('No changes to save');
      return;
    }

    try {
      const response = await fetch(`${config.serverUrl}/api/dives/${postData.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(changes) // Send only the changed fields
      });

      if (response.ok) {
        onUpdate({ ...postData, ...changes });

      } else {
        console.error('Failed to save data:', response);
      }
    } catch (error) {
      console.error('Error saving data:', error.message);
    }
    // handleClickSnack();  // Show the success message
    handleClose();
  };

  return (

    <BootstrapDialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
      <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
        Dive Code: {formData.diveCode}
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
        {postData && (
          <>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <Button onClick={handleImageClick}>
                <div className="wrapImg">
                  <img className="imageB" src={postData.fileLink} alt="Preview" />
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
                        label="Data Inserted In: "
                        defaultValue={formatDateTime(dayjs(postData.loggingDate).format('DD/MM/YYYY'))}
                        variant="standard"
                        className="dateStyle"
                      />

                      <TextField
                        name="date" 
                        label="Date Of Dive: "
                        // defaultValue={formatDateTime(dayjs(postData.date).format('DD/MM/YYYY'))}
                        defaultValue={postData.date}
                        variant="standard"
                        className="dateStyle"
                        onChange={handleFormInputChange}
                      />
                    </div>
                  </div>
                  <br />
                  <div className="txtContainer">
                    <div>
                      <TextField
                        label="Logged By"
                        defaultValue={postData.loggedBy}
                        name="loggedBy"
                        variant="standard"
                        className="dateStyle"
                        onChange={handleInputChange}
                        value={formData.loggedBy}
                      />
                      <TextField
                        label="Photo took in AR: "
                        defaultValue={postData.AR}
                        name="AR"
                        variant="standard"
                        className="dateStyle"
                        onChange={handleFormInputChange}
                      />
                      <TextField
                        id="standard-read-only-input"
                        label="Dive took place during: "
                        defaultValue={postData.time}
                        name="time"
                        variant="standard"
                        className="dateStyle"
                        onChange={handleFormInputChange}
                      />
                      <TextField
                        id="standard-read-only-input"
                        label="Dive Rank: "
                        defaultValue={postData.rankOfDive}
                        name='rankOfDive'
                        type='text'
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
                      defaultValue={postData.diveSite}
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
                      defaultValue={postData.objectGroup}
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
                      defaultValue={postData.specie}
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
                      defaultValue={postData.imageLocation}
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
                      defaultValue={postData.reportType}
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
                      defaultValue={postData.typeOfDive}
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


                  <div>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6}>
                        <Autocomplete
                          options={humanWildInterList}
                          getOptionLabel={(option) => option}
                          defaultValue={postData.humanWildlifeInteraction}
                          onChange={(e, value) =>
                            handleAutocompleteChange('humanWildlifeInteraction', value || '')
                          }
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              label="Human-wildlife interaction"
                              name="humanWildlifeInteraction"
                              autoComplete="humanWildlifeInteraction"
                              className="fieldInput"
                              fullWidth
                            />
                          )}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          label="Object Code"
                          name="objectCode"
                          autoComplete="objectCode"
                          className="fieldInput"
                          onChange={handleFormInputChange}
                          defaultValue={postData.objectCode}
                          fullWidth
                        />
                      </Grid>
                    </Grid>
                  </div>
                  <div>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={4}>
                        <TextField
                          label="Max Depth (meters)"
                          type="text"
                          id="maxDepth"
                          name="maxDepth"
                          className="fieldInput"
                          defaultValue={postData.maxDepth}
                          onChange={handleFormInputChange}
                          fullWidth
                        />
                      </Grid>
                      <Grid item xs={12} sm={4}>
                        <TextField
                          label="Distance (meters)"
                          type="number"
                          id="standard-number"
                          name="distance"
                          InputLabelProps={{
                            shrink: true,
                          }}
                          className="fieldInput"
                          defaultValue={postData.distance}
                          onChange={handleInputChange}
                          fullWidth
                        />
                      </Grid>
                      <Grid item xs={12} sm={4}>
                        <TextField
                          label="Temperature (celsius)"
                          type="text"
                          name="temp"
                          id="standard-number"
                          className="fieldInput"
                          defaultValue={postData.temp}
                          onChange={handleInputChange}
                          fullWidth
                        />
                      </Grid>
                    </Grid>
                  </div>


                  <div>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={4}>
                        <TextField
                          label="Age of diver"
                          type="text"
                          name="ageOfDiver"
                          className="fieldInput"
                          defaultValue={postData.ageOfDiver}
                          onChange={handleInputChange}
                          fullWidth
                        />
                      </Grid>
                      <Grid item xs={12} sm={4}>
                        <TextField
                          label="Sex of diver"
                          type="text"
                          name="sexOfDiver"
                          className="fieldInput"
                          defaultValue={postData.sexOfDiver}
                          onChange={handleInputChange}
                          fullWidth
                        />
                      </Grid>
                      <Grid item xs={12} sm={4}>
                        <TextField
                          label="idCode / photographer namer"
                          type="text"
                          name="idCode_photographerName"
                          className="fieldInput"
                          defaultValue={postData.idCode_photographerName}
                          onChange={handleInputChange}
                          fullWidth
                        />
                      </Grid>
                    </Grid>
                  </div>
                  <div>
                    <label className="lblDesc" htmlFor="userDescription">
                    User&apos;s dives description:</label>
                    <TextField
                          type="text"
                          name="userDescription"
                          className="fieldInput"
                          defaultValue={postData.userDescription}
                          onChange={handleInputChange}
                          fullWidth
                        />

                  </div>
                  <div>
                    <label className="lblDesc" htmlFor="researcherComment">
                      Researcher Comments:
                    </label>
                    <textarea
                      id="researcherComment"
                      defaultValue={postData.researcherComment}
                      type="text"
                      name="researcherComment"
                      rows={3}
                      className="admin-textarea"
                      onChange={handleTextareaChange}
                    />
                  </div>
                </div>
              </form>
              <Snackbar
                open={stateSnackbar.open}
                onClose={handleCloseSnack}
                TransitionComponent={stateSnackbar.Transition}
                // key={stateSnackbar.Transition.name}
                // autoHideDuration={1500}
                message="Changes saved successfully"
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

EditCardData.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  postData: PropTypes.any,
  onUpdate: PropTypes.func.isRequired,
};
