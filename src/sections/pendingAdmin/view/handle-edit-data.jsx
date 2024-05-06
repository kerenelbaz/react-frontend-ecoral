/* eslint-disable no-unused-vars */
import PropTypes from 'prop-types';
/* eslint-disable jsx-a11y/label-has-associated-control */
import { useState, useEffect } from "react";

import Slide from '@mui/material/Slide';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import { styled } from '@mui/material/styles';
import Snackbar from '@mui/material/Snackbar';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
// import Typography from '@mui/material/Typography';
import DialogTitle from '@mui/material/DialogTitle';
import Autocomplete from '@mui/material/Autocomplete';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';

import './style.css';
// eslint-disable-next-line import/no-unresolved
import dataLists from '../../insertData/view/dataLists.json';



const humanWildInterList = ['Between 3 to 10 M', 'Closer than 10 M', 'Forther than 10 M', 'Macro', 'NA'];

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(4),
    overflowY: 'initial',
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
  // Apply custom width to the dialog
  '& .MuiDialog-paper': {
    maxWidth: '90%', 
    width:'1400px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
}));

export default function EditData({ open, handleClose, pendingData }) {
    // eslint-disable-next-line no-unused-vars
    const [openImageDialog, setOpenImageDialog] = useState(false);
    const [stateSnackbar, setStateSnackbar] = useState({
      open: false,
      Transition: Slide,
    });
    // const [formData, setFormData] = useState({
    //   // diveCode:pendingData.diveCode,
    //   date: pendingData.dateDive,
    //   time: pendingData.timeDive,
    //   diveSite: pendingData.site,
    //   objectGroup: pendingData.objectGroup,
    //   specie: pendingData.specie,
    //   file: pendingData.file,
    //   imageLocation: pendingData.imgLocation,
    //   uploadeImage: pendingData.uploadeImage,
    //   AR: pendingData.arReef,
    //   reportType: pendingData.reportType,
    //   typeOfDive: pendingData.typeOfDive,
    //   rankOfDive: pendingData.rank,
    //   userDescription: pendingData.userDescription,
    //   maxDepth: pendingData.maxDepth,
    //   distance: pendingData.distance,
    //   temp: pendingData.temp,
    //   age: pendingData.age,
    //   gender:pendingData.gender,
    // });
    const [formData, setFormData] = useState({
      ...pendingData,
      objectCode: '',
      idCode:'',
      humanWildInter: '',
      researcherDesc: '',
      loggedBy: '',
    });

    useEffect(() => {
      // Update formData with all properties from pendingData
      setFormData(prevData => ({
        ...prevData,
        ...pendingData
      }));
    }, [pendingData]);

    const [diveCodeState, setDiveCodeState] = useState('');
    // const [editPandingData, setPandingData] = useState({...pendingData});

    useEffect(() => {
      if (pendingData && pendingData.diveCode) {
        setDiveCodeState(pendingData.diveCode);
      }
      // console.log("useddcsc", editPandingData)
    }, [pendingData]);
    
    

    // Define a function to update form data
    const handleInputChange = (e) => {
      // console.log("the copied data", editPandingData);
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
    }

    const handleImageClick = () => {

      setOpenImageDialog(true);
    };

    const handleFieldChange = (name, value) => {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    };
    
  
    // const handleCloseImageDialog = () => {
    //   setOpenImageDialog(false);
    // };

    const formatDateTime = (dateTimeString) => {
      const dateTime = new Date(dateTimeString);
      
      // Format the date
      const dateFormatter = new Intl.DateTimeFormat('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      });
      const formattedDate = dateFormatter.format(dateTime);
      
      // Format the time
      const timeFormatter = new Intl.DateTimeFormat('en-GB', {
        hour: '2-digit',
        minute: '2-digit',
      });
      const formattedTime = timeFormatter.format(dateTime);
      
      // Combine date and time
      return `${formattedDate}, ${formattedTime}`;
    };

    const handleTextareaChange = (value) => {
      // Update the state with the value of the textarea
      setFormData(prevData => ({
        ...prevData,
        researcherDesc: value
      }));
    };

    const handleAutocompleteChange = (name, value) => {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    };

    const handleClickSnack =  () => {
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

    const handleSaveChanges = async () => {
      // Log the formData obje  ct
      // console.log("editPandingData",editPandingData);
      console.log("formData",formData);
      

      const objectDiveToServer = {
        diveCode: formData.diveCode,
        objectCode: formData.objectCode,
        date: formData.dateDive,
        time: formData.timeDive,
        diveSite: formData.site,
        objectGroup: formData.objectGroup,
        specie: formData.specie,
        idCode_photographerName: formData.idCode,
        imageLocation: formData.imgLocation,
        AR: formData.arReef,
        humanWildlifeInteraction:formData.humanWildInter,
        reportType: formData.reportType,
        typeOfDive: formData.typeOfDive,
        rankOfDive: formData.rank,
        media:formData.media,
        documentation: formData.documentation,
        ageOfDiver: formData.age,
        sexOfDiver: formData.gender,
        maxDepth: formData.maxDepth,
        distance: formData.distance,
        temp: formData.temp,
        userDescription: formData.userDescription,
        researcherComment: formData.researcherComment,
        linkURL: formData.file,
        loggedBy: formData.loggedBy,
        loggingDate: formData.loggingDate,
  
      };
      console.log(JSON.stringify(objectDiveToServer))
   
      try {
        // Send form data to the server
        const response = await fetch('http://localhost:8000/api/dives', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json; charset=utf-8',
          },
          body: JSON.stringify(objectDiveToServer)
        });
  
        console.log(response);
        if (response.ok) {
          console.log('Data saved successfully');
          
          handleClickSnack()
          handleClose();
         
        } else {
          console.error('Failed to save data:', response.statusText);
        }
      } catch (error) {
        console.error('Error saving data:', error.message);
      }

    };

// export default function EditData({ open, handleClose }) {
  return (
    <BootstrapDialog
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={open}
      
    >
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
      <DialogContent dividers >
        {pendingData && (
          <>
          <div style={{display: 'flex', justifyContent:'center', alignItems: 'center' }} >
              <Button onClick={handleImageClick}>
                  <div className="wrapImg" >
                    <img className="imageB" src={pendingData.file} alt="Preview" /> 
                  </div>

              </Button>
          </div>          
            <div className='containerEd'>
              <form>
                <div>                                
                <div className="txtContainer">
                  <div>
                    <TextField
                      InputProps={{readOnly: true}}
                      id="standard-read-only-input"
                      label="Data logged at: "
                      defaultValue={formatDateTime(pendingData.loggingDate)}
                      variant="standard"
                      className="dateStyle" 
                    />
                    <TextField
                      InputProps={{readOnly: true}}
                      id="standard-read-only-input"
                      label="Date dive: "
                      defaultValue={formatDateTime(pendingData.date)} 
                      variant="standard"
                      className="dateStyle"
                    />
                    
                  </div>
                </div>

                <br />
                <div className="txtContainer">
                  <div>
                    <TextField
                        label="Logged By: "
                        variant="standard"
                        className="dateStyle"
                        onChange={handleFormInputChange}
                      />
                    <TextField
                        label="Photo took in AR: "
                        defaultValue={pendingData.AR} 
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
              <br/>
              <br/>
                <div className="inLine">
                  <Autocomplete
                    options={dataLists.diveSite}
                    defaultValue={pendingData.diveSite}
                    getOptionLabel={(option) => option}
                    onChange={(e, value) =>
                      handleAutocompleteChange("diveSite", value || "")
                    }
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
                            getOptionLabel={(option) => (option)}
                            defaultValue={pendingData.objectGroup}
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

                        <Autocomplete
                            options={dataLists.specieName}
                            getOptionLabel={(option) => (option)}
                            defaultValue={pendingData.specie}
                            onChange={(e, value) =>
                              handleAutocompleteChange("specie", value || "")
                            }
                            renderInput={(params) => (
                            <TextField
                                {...params}
                                // value={insertData.specieName}
                                label="Specie Name"
                                name="specie"
                                autoComplete='specie'
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
                              handleAutocompleteChange("imageLocation", value || "")
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
                            getOptionLabel={(option) => (option)}
                            defaultValue={pendingData.reportType}
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
                            defaultValue={pendingData.typeOfDive}
                            onChange={(e, value) =>
                              handleAutocompleteChange("typeOfDive", value || "")
                            }
                            renderInput={(params) => (
                            <TextField
                                {...params}
                                required
                                label="Type Of Dive"
                                name="typeOfDive"
                                autoComplete='typeOfDive'
                                className="fieldInput"
                            />
                            )}
                        />
                        
                    
                    </div>
                    

                    <div className="inLine">
                      
                      <Autocomplete
                        options={humanWildInterList}
                        getOptionLabel={(option) => (option)}
                        onChange={(e, value) =>
                          handleAutocompleteChange("humanWildInter", value || "")
                        }
                        renderInput={(params) => (
                        <TextField
                            {...params}
                            // value={insertData.specieName}
                            label="Human-wildlife interaction"
                            name="humanWildInter"
                            autoComplete='humanWildInter'
                            className="fieldInput"
                        />
                        )}
                        />
    
                    </div>

                    <div className="inLine">
                      <TextField
                        label='Max Depth (meters)'
                        type="text"
                        id="maxDepth"
                        name="maxDepth"
                        className="fieldInput"
                        defaultValue={pendingData.maxDepth}
                        onChange={handleFormInputChange}
x
                      />

                      <TextField
                        label='Distance (meters)'
                        type="number"
                        id="standard-number"
                        name="distance"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        className="fieldInput"
                        defaultValue={pendingData.distance}
                        onChange={handleInputChange}
                        // value={formData.distance}
                      />
                      

                      <TextField
                        label='Temperature (celsius)'
                        type="text"
                        name="temp"
                        id="standard-number"
                        className="fieldInput"
                        defaultValue={pendingData.temp}
                        onChange={handleInputChange}
                        // value={formData.temp}
                      />
                      
                      
                    </div>
                    <div className="inLine">
                    <TextField
                        label='ID Code'
                        type="text"
                        name="idCode"
                        className="fieldInput"
                        onChange={handleFormInputChange}
                        value={formData.idCode}
                      />
                      
                      
                      {/* this isnt dropdown its textbox - change the name to Object Code */}
                      <TextField
                        // value={insertData.specieName}
                        label="Object Code"
                        name="objectCode"
                        autoComplete='objectCode'
                        className="fieldInput"
                        onChange={handleFormInputChange}
                        value={formData.objectCode}
                      />

                      

                    </div>
                      
                      <div>
                        <label className="lblDesc">User dives description:</label>
                        <p className="lblDesc">{`"${pendingData.userDescription}"`}</p>
                        
                      </div>

                      <div>
                        <label className="lblDesc" htmlFor="researcherDesc">Researcher Comments:</label>
                        <textarea 
                          id="researcherDesc" name="researcherDesc" rows={3} className="admin-textarea" onChange={(e) => handleTextareaChange(e.target.value)} />
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
                    sx={{ width: '100%' , fontSize: '25px' }}
                  >🐠 Dive saved, removed from pending table 🐠</Alert>
                  
                </Snackbar>
            </div>
          </>
        )}
      </DialogContent>

      <DialogActions>
        <Button style={{fontSize:"20px"}} autoFocus onClick={handleSaveChanges}>
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
};
