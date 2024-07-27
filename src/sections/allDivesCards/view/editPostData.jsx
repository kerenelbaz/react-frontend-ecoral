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

import config from 'src/sections/configServer';
import 'src/sections/pendingAdmin/view/style.css';

// eslint-disable-next-line import/no-unresolved
import dataLists from '../../insertData/view/dataLists.json';

const humanWildInterList = ['Between 3 to 10 M', 'Closer than 10 M', 'Further than 10 M', 'Macro', 'NA'];

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

export default function EditPostData({ open, handleClose, postData, onUpdate }) {
  const [openImageDialog, setOpenImageDialog] = useState(false);
  const [stateSnackbar, setStateSnackbar] = useState({
    open: false,
    Transition: Slide,
  });

  const [formData, setFormData] = useState({
    ...postData,
    humanWildInter: '',
    researcherDesc: '',
    loggedBy: '',
  });

  useEffect(() => {
    setFormData(prevData => ({
      ...prevData,
      ...postData
    }));
  }, [postData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageClick = () => {
    setOpenImageDialog(true);
  };

  const handleFieldChange = (name, value) => {
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

  const handleSaveChanges = async () => {
    try {
      const response = await fetch(`${config.serverUrl}/api/posts`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        handleClickSnack();
        onUpdate(formData);
        handleClose();
      } else {
        console.error('Failed to save data:', response.statusText);
      }
    } catch (error) {
      console.error('Error saving data:', error.message);
    }
  };

  return (
    <BootstrapDialog
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={open}
    >
      <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
        Edit Post: {formData.title}
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
                  <img className="imageB" src={postData.file} alt="Preview" />
                </div>
              </Button>
            </div>
            <div className='containerEd'>
              <form>
                <div>
                  <div className="txtContainer">
                    <div>
                      <TextField
                        InputProps={{ readOnly: true }}
                        id="standard-read-only-input"
                        label="Date Logged"
                        defaultValue={formatDateTime(postData.loggingDate)}
                        variant="standard"
                        className="dateStyle"
                      />
                      <TextField
                        InputProps={{ readOnly: true }}
                        id="standard-read-only-input"
                        label="Post Date"
                        defaultValue={formatDateTime(postData.date)}
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
                        variant="standard"
                        className="dateStyle"
                        onChange={handleInputChange}
                        name="loggedBy"
                        value={formData.loggedBy}
                      />
                      <TextField
                        label="Photo in AR"
                        defaultValue={postData.AR}
                        name="AR"
                        variant="standard"
                        className="dateStyle"
                        onChange={handleInputChange}
                        value={formData.AR}
                      />
                      <TextField
                        label="Post Time"
                        defaultValue={postData.time}
                        name="time"
                        variant="standard"
                        className="dateStyle"
                        onChange={handleInputChange}
                        value={formData.time}
                      />
                      <TextField
                        label="Post Rank"
                        defaultValue={postData.rankOfPost}
                        name="rankOfPost"
                        variant="standard"
                        className="dateStyle"
                        onChange={handleInputChange}
                        value={formData.rankOfPost}
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
                      getOptionLabel={(option) => option}
                      defaultValue={postData.objectGroup}
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
                      getOptionLabel={(option) => option}
                      defaultValue={postData.specie}
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
                  </div>

                  <div className="inLine">
                    <Autocomplete
                      options={dataLists.imageLocation}
                      getOptionLabel={(option) => option}
                      defaultValue={postData.imageLocation}
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
                      getOptionLabel={(option) => option}
                      defaultValue={postData.reportType}
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
                      getOptionLabel={(option) => option}
                      defaultValue={postData.typeOfDive}
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
                      getOptionLabel={(option) => option}
                      onChange={(e, value) =>
                        handleAutocompleteChange("humanWildInter", value || "")
                      }
                      renderInput={(params) => (
                        <TextField
                          {...params}
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
                      defaultValue={postData.maxDepth}
                      onChange={handleInputChange}
                      value={formData.maxDepth}
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
                      defaultValue={postData.distance}
                      onChange={handleInputChange}
                      value={formData.distance}
                    />

                    <TextField
                      label='Temperature (celsius)'
                      type="text"
                      name="temp"
                      id="standard-number"
                      className="fieldInput"
                      defaultValue={postData.temp}
                      onChange={handleInputChange}
                      value={formData.temp}
                    />
                  </div>

                  <div>
                    <label className="lblDesc">User Post Description:</label>
                    <p className="lblDesc">{`"${postData.userDescription}"`}</p>
                  </div>

                  <div>
                    <label className="lblDesc" htmlFor="researcherDesc">Researcher Comments:</label>
                    <textarea
                      id="researcherDesc" name="researcherDesc" rows={3} className="admin-textarea" onChange={(e) => handleTextareaChange(e.target.value)} value={formData.researcherDesc} />
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
                >🐠 Post updated successfully 🐠</Alert>
              </Snackbar>
            </div>
          </>
        )}
      </DialogContent>
      <DialogActions>
        <Button style={{ fontSize: "20px" }} autoFocus onClick={handleSaveChanges}>
          Save changes
        </Button>
      </DialogActions>
    </BootstrapDialog>
  );
}

EditPostData.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  postData: PropTypes.object,
  onUpdate: PropTypes.func,
};
