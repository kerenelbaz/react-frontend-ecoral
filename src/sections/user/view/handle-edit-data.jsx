import { useState } from "react";
import PropTypes from 'prop-types';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import { styled } from '@mui/material/styles';
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


export default function EditData({ open, handleClose, userData }) {
    // eslint-disable-next-line no-unused-vars
    const [openImageDialog, setOpenImageDialog] = useState(false);

    const handleImageClick = () => {

      setOpenImageDialog(true);
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


// export default function EditData({ open, handleClose }) {
  return (
    <BootstrapDialog
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={open}
      
    >
      <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
        Modal title
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
        {userData && (
          <>
            <Button style={{display: 'flex', justifyContent:'center', alignItems: 'center' }} onClick={handleImageClick}>
              <div className="wrapImg" >
                <img className="imageB" src={userData.file} alt="Preview" /> 
              </div>

            </Button>
            {/* <Dialog open={openImageDialog} onClose={handleCloseImageDialog}>
            <div>

            <Zoom>
              <img src={userData.file} alt="Preview" />
            </Zoom>
            
              </div>
            </Dialog> */}
            <p>objectGroup: {console.log('userDate is', userData)}</p>

            <p>loggingDate: {userData.loggingDate}</p>
            
            <div className='container'>
                <form>
                   
                    {/* <div className="image-placeholder">
                      <img src={userData.file} alt="Preview" />
                    </div> */}

                    <div className="inLine">
                        <Autocomplete
                            options={dataLists.diveSite}
                            // specifies how to render the options in the dropdown list - returns the option itself
                            defaultValue={userData.diveSite}
                            getOptionLabel={(option) => option}
                            // onChange={(e, value) =>
                            //   handleAutocompleteChange("site", value || "")
                            // }
                            renderInput={(params) => (
                            <TextField
                                {...params}
                                required
                                label="Dive Site"
                                name="diveSite"
                                autoComplete="diveSite"
                                className="fieldInput"

                            />
                            )}
                        />

                        <Autocomplete
                            options={dataLists.objectGroupList}
                            getOptionLabel={(option) => (option)}
                            defaultValue={userData.objectGroup}
                            // onChange={(e, value) =>
                            // handleAutocompleteChange("objectGroup", value || "")
                            // }
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
                            defaultValue={userData.specie}
                            // onChange={(e, value) =>
                            //   handleAutocompleteChange("objectGroup", value || "")
                            // }
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
                            defaultValue={userData.imageLocation}
                            // onChange={(e, value) =>
                            //   handleAutocompleteChange("site", value || "")
                            // }
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
                            defaultValue={userData.reportType}
                            // onChange={(e, value) =>
                            //   handleAutocompleteChange("objectGroup", value || "")
                            // }
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
                            defaultValue={userData.typeOfDive}
                            // onChange={(e, value) =>
                            //   handleAutocompleteChange("objectGroup", value || "")
                            // }
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
                    {/* <div >

                        <label className="lblButtonsGroup">Photo Took In Artificial Reef:</label>

                        <ButtonGroup size="large" color="inherit" aria-label="Large button group">
                            {isArButtonGroup.map((button, index) => (
                            <Button key={index} onClick={() => handleButtonClick(button, 'reef')}
                                variant={selectedReef === button ? "contained" : "outlined"}

                            >
                                {button}
                            </Button>
                            ))}
                        </ButtonGroup>

                    </div> */}
                      <div className="dateContainer">
                        <div
                          // component="form"
                          // sx={{
                          //   '& > :not(style)': { m: 1, width: '25ch' },
                          // }}
                          // noValidate
                          // autoComplete="off"
                        >
                          <TextField
                            InputProps={{
                              readOnly: true,
                            }}
                            id="standard-read-only-input"
                            label="Data logged at: "
                            defaultValue={formatDateTime(userData.loggingDate)}
                            variant="standard"
                            className="dateStyle" 
                          />
                          <TextField
                            InputProps={{
                              readOnly: true,
                            }}
                            id="standard-read-only-input"
                            label="Date dive: "
                            defaultValue={formatDateTime(userData.date)} 
                            variant="standard"
                            className="dateStyle"
                          />

                          <TextField
                            // InputProps={{
                            //   readOnly: true,
                            // }}
                            id="standard-read-only-input"
                            label="Dive took place during: "
                            defaultValue={userData.time} 
                            variant="standard"
                            className="dateStyle"
                          />

                        </div>
                      </div>



                </form>
            </div>
          </>
        )}
      </DialogContent>

      <DialogActions>
        <Button autoFocus onClick={handleClose}>
          Save changes
        </Button>
      </DialogActions>
    </BootstrapDialog>
  );
}

// Prop Types validation
EditData.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  userData: PropTypes.object,
};
