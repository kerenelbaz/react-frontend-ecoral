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
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
  // Apply custom width to the dialog
  '& .MuiDialog-paper': {
    maxWidth: '90%', // Adjust the value as needed
  },
}));


export default function EditData({ open, handleClose, userData }) {
    const [openImageDialog, setOpenImageDialog] = useState(false);

    const handleImageClick = () => {
      setOpenImageDialog(true);
    };
  
    const handleCloseImageDialog = () => {
      setOpenImageDialog(false);
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
            <Button onClick={handleImageClick}>
                <img src={userData.file} alt="Preview" />
            </Button>
            <Dialog open={openImageDialog} onClose={handleCloseImageDialog}>
              {/* Add content for image dialog here */}
            </Dialog>
            <p>objectGroup: {console.log('user file is  ',userData.file)}</p>
            <p>loggingDate: {userData.loggingDate}</p>
            
            <div className='container'>
                <form>
                   
                    <div className="image-placeholder">
                        
                    
                    <img src={userData.file} alt="Preview" />
                        
                    </div>
                    <br/>
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
                            defaultValue={userData.imgLocation}
                            // onChange={(e, value) =>
                            //   handleAutocompleteChange("site", value || "")
                            // }
                            renderInput={(params) => (
                            <TextField
                                {...params}
                                required
                                label="Image Location"
                                name="imgLocation"
                                autoComplete="imgLocation"
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
  userData: PropTypes.object.isRequired,
};
