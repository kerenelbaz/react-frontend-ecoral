/* eslint-disable radix */
/* eslint-disable no-nested-ternary */
/* eslint-disable perfectionist/sort-imports */
import { useState } from 'react';
import Box from '@mui/material/Box';
// import Input from '@mui/material/Input';
// import FormControl from '@mui/material/FormControl';
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
// import ButtonGroup from '@mui/material/ButtonGroup';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
// import Rating from '@mui/material/Rating';
// import Stack from '@mui/material/Stack';
// import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import IconButton from '@mui/material/IconButton';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import dataLists from './dataLists.json';
import './styleByMe.css';

import GitHubLabel from './GitHubLabel';
// import { string } from 'prop-types';
// import PDFViewer from './PDFViewer';

export default function AddArticleView() {
  const [insertData, setInsertData] = useState({
    name: '',
    doi: '',
    author: '',
    dateArticle: '',
    file: '',
    link: '',
    tags: '',
    errors: {
      name: false,
      doi: false,
      author: false,
      dateArticle: false,
      file: false,
      link: false,
      tags: false,
    },
  });
  const [pdfPreview, setPDFPreview] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  // const fileInputRef = useRef(null);

  const handleDateChange = (date) => {
    const isValidYear = isAppropriateDate(date);
    if (!isValidYear) {
      // Mark the date as invalid
      setInsertData((prevFormData) => ({
        ...prevFormData,
        errors: {
          ...prevFormData.errors,
          dateArticle: true,
        },
      }));
      setSelectedDate(date);
      return;
    }
    setInsertData((prevFormData) => ({
      ...prevFormData,
      dateArticle: date,
      errors: {
        ...prevFormData.errors,
        dateArticle: false, 
      },
    }));
  };

  function isAppropriateDate(date) {
    const today = new Date();
    return (
      date.$y >= 2014 &&
      date.$D <= today.getDate() &&
      date.$M <= today.getMonth() &&
      date.$y <= today.getFullYear()
    );
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let isValid = true;
    switch (name) {
      case 'name':
        isValid = value.length() > 2;
        break;
      case 'doi':
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
  };

  const handleAutocompleteChange = (name, value) => {
    if (!dataLists.imageLocation.includes(value) && typeof value === 'string') {
      // Handle the case where the user entered a new value
      console.log('New value:', value);
    } else {
      // Handle the case where the user selected an option from the list
      console.log('Selected option:', value);
    }
    setInsertData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    console.log('Hello');
    return;
  };

  const onSelectFile = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPDFPreview(reader.result);
        console.log('previwe is: ', reader.result);
        setInsertData((prevData) => ({
          ...prevData,
          file: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    } else {
      setPDFPreview(null);
    }
  };
  
  const handleTagsChange = (tags) => {
    console.log(tags);
    setInsertData((prevFormData) => ({
      ...prevFormData,
      tags: tags,
      errors: {
        ...prevFormData.errors,
        tags: false,
      },
    }));
  }

  return (
    <div className="container">
      <h2>Insert New Article</h2>
      <form onSubmit={handleSubmit}>
        <div className="insideContiner">
          <TextField
            label="Name Of The Article"
            id="name"
            name="name"
            type="text"
            onChange={handleInputChange}
            error={insertData.errors.name}
            helperText={insertData.errors.name && 'enter name longer than 2'}
            className="numbersField"
          />
          <TextField
            label="DOI (Digital Object Identifier)"
            id="doi"
            name="doi"
            type="number"
            onChange={handleInputChange}
            error={insertData.errors.doi}
            helperText={insertData.errors.doi && 'number higher than 0'}
            className="numbersField"
          />
        </div>
        <div className="insideContiner">
          <Autocomplete
            className="autocomplete"
            options={dataLists.imageLocation}
            getOptionLabel={(option) => option}
            onChange={(e, value) => handleAutocompleteChange('author', value)}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Author"
                name="author"
                autoComplete="author"
                className="fieldInput"
                onBlur={(e) => {
                  const value = e.target.value;
                  handleAutocompleteChange('author', value); // Call the onChange handler with the input value
                }}
              />
            )}
            freeSolo
          />
          <LocalizationProvider dateAdapter={AdapterDayjs} className="baseLine">
            <Box className="baseLine">
              <DemoContainer components={['DatePicker']} valueType="date">
                <DatePicker
                  className="custom-date-picker"
                  label="Date Of Article"
                  id="dateArticle"
                  name="dateArticle"
                  onChange={handleDateChange}
                  format="DD/MM/YYYY"
                  required
                  inputStyle={{
                    color: insertData.errors.dateArticle ? 'red' : selectedDate ? 'blue' : '#1675E8',
                  }}
                  slotProps={{
                    textField: {
                      error: insertData.errors.dateArticle,
                      helperText: insertData.errors.dateArticle && 'Invalid Article date',
                      className: 'fieldInput',
                      style: { width: '100%' },
                    },
                    InputProps: {
                      style: {
                        color: selectedDate ? 'blue' : '#1675E8',
                        fontWeight: selectedDate ? 'bold' : 'normal',
                      },
                    },
                  }}
                />
              </DemoContainer>
            </Box>
          </LocalizationProvider>
        </div>
        <div>
          <lable className="lblButtonsGroup">Add Article PDF</lable>
          <IconButton size="large">
            <PictureAsPdfIcon fontSize="inherit" />
          </IconButton>

          <input
            type="file"
            onChange={onSelectFile}
            id="uploadePDF"
            name="uploadePDF"
            required
          />
        </div>
        <TextField
          label="Link (optional)"
          id="link"
          name="link"
          type="text"
          onChange={handleInputChange}
          error={insertData.errors.link}
          helperText={insertData.errors.link && 'enter name longer than 2'}
          className="fieldInput"
        />
        {/* <PDFViewer/> */}
        <br />

        <div className="insideContiner">
          <GitHubLabel onTagsChange={handleTagsChange}/>
        </div>
        <br />
        <div className="insideContiner">
          <Button size="large" type="submit" variant="outlined" endIcon={<SendIcon />}>
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
}
