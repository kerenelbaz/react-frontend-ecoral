
import { useState, useCallback, useEffect } from 'react';
import Box from '@mui/material/Box';
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
  const [articleCode, setArticleCode] = useState(null)
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

  function isAppropriateDate(articleDate) {
    const today = new Date();
  
    const diveYear = articleDate.$y;
    const diveMonth = articleDate.$M;
    const diveDay = articleDate.$D;
  
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth();
    const currentDay = today.getDate();
  
    return (
      diveYear >= 2000 &&
      (
        diveYear < currentYear ||
        (diveYear === currentYear && diveMonth < currentMonth) ||
        (diveYear === currentYear && diveMonth === currentMonth && diveDay <= currentDay)
      )
    );
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let isValid = true;
    switch (name) {
      case 'name':
        isValid = value.length > 2;
        break;
      case 'doi':
        isValid = parseInt(value, 10) > 0;
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
  
  const handleTagsChange = useCallback((tags) => {
    setInsertData((prevFormData) => ({
      ...prevFormData,
      'tags': tags, // Property shorthand for tags: tags
      errors: {
        ...prevFormData.errors,
        tags: false,
      },
    }));
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/articles');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const responseData = await response.json();
        const { articles } = responseData.data;
        console.log(articles)
        const articleCodes = articles.map(article => article.articleCode).filter(code => code);

        let newArticle;
        if (articleCodes.length === 0) {
          newArticle = 0;
        } else {
          const lastArticleCode = Math.max(...articleCodes);
          newArticle = lastArticleCode + 1;
        }

        console.log('New Article code:', newArticle);
        setArticleCode(newArticle); // Set the state with the new dive code

      } catch (error) {
        console.error('Error fetching documents:', error.message);
      }
    };

    fetchData();
  }, []); // Empty dependency array to run effect only once on component mount


  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission behavior
   
    const userJsonString = localStorage.getItem('user');
    const user = JSON.parse(userJsonString.replace(/^"(.*)"$/, '$1'));
    // Extracting age from birth date
    const birthDate = new Date(user.birthDate);
    const currentDate = new Date();
    let age = currentDate.getFullYear() - birthDate.getFullYear();
    if(currentDate.getMonth()> birthDate.getMonth())
      age +=1;
    // Retrieving gender
    const {gender} = user;
    
    console.log('User Age:', age);
    console.log('User Gender:', gender);
    
    const articleData = {
      articleCode,
      name: insertData.name,
      doi: insertData.doi,
      author: insertData.author,
      dateArticle: insertData.dateArticle,
      file: insertData.file,
      link: insertData.link,
      tags: insertData.tags,
    };

    // Check if the Date Of Dive field is empty
    // if (!insertData.dateDive) {
    //   // Set error for Date Of Dive field
    //   setInsertData(prevFormData => ({
    //     ...prevFormData,
    //     errors: {
    //       ...prevFormData.errors,
    //       dateDive: true,
    //     },
    //   }));
    //   // Return to prevent further processing
    //   return;
    // }

    // Check if any errors are true
    const hasErrors = Object.values(insertData.errors).some(error => error);

    // If any error is true, return without saving the data
    if (hasErrors) {
      console.log('There are errors in the form. Data not saved.');
      return;
    }

    try {
      // Send form data to the server
      const response = await fetch('http://localhost:8000/api/articles', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
        },
        body: JSON.stringify(articleData)
      });

      console.log(response);
      if (response.ok) {
        console.log('Data saved successfully');
        setTimeout(() => {
          window.location.reload() 
        }, 2500);

        // Reset form data after successful submission
        setInsertData({
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
      } else {
        console.error('Failed to save data:', response.statusText);
      }
    } catch (error) {
      console.error('Error saving data:', error.message);
    }


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
                  handleAutocompleteChange('author', value);
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
                    color: insertData.errors.dateArticle ? 'red' : 'blue',
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
          <span className="lblButtonsGroup">Add Article PDF</span>
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
