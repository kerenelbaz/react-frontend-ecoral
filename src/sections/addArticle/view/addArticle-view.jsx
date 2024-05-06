
import { useState, useEffect, useCallback } from 'react';

import Box from '@mui/material/Box';
// eslint-disable-next-line import/no-extraneous-dependencies
import Button from '@mui/material/Button';
// eslint-disable-next-line import/no-extraneous-dependencies
import SendIcon from '@mui/icons-material/Send';
import TextField from '@mui/material/TextField';
// import IconButton from '@mui/material/IconButton';
import Autocomplete from '@mui/material/Autocomplete';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// eslint-disable-next-line import/no-extraneous-dependencies
// import ButtonGroup from '@mui/material/ButtonGroup';
// import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
// import dataLists from './dataLists.json';
import './styleByMeArticle.css';
import GitHubLabel from './GitHubLabel';
// import dataLists from './dataLists.json';
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
  const [articleCode, setArticleCode] = useState(null);
  // eslint-disable-next-line no-unused-vars
  const [pdfPreview, setPDFPreview] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [allTags, setAllTags] = useState([{ name: 'temp', color: '#FFFFFF', description: 'temp' }]);
  const [allAuthor, setAuthors] = useState([]);
  // const fileInputRef = useRef(null);

  useEffect(() => {
    console.log(insertData);
  }, [insertData])
  

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

    const articleYear = articleDate.$y;
    const articleMonth = articleDate.$M;
    const articleDay = articleDate.$D;

    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth();
    const currentDay = today.getDate();

    return (
      articleYear >= 2000 &&
      (articleYear < currentYear ||
        (articleYear === currentYear && articleMonth < currentMonth) ||
        (articleYear === currentYear && articleMonth === currentMonth && articleDay <= currentDay))
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
    if (!allAuthor.includes(value) && typeof value === 'string') {
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

  const handleTagsChange = useCallback((labels) => {
    setInsertData((prevFormData) => ({
      ...prevFormData,
      tags: labels, // Property shorthand for tags: tags
      errors: {
        ...prevFormData.errors,
        tags: false,
      },
    }));
  }, []);

  const extractAllTags = (articles) => {
    const tempTags = [];
    articles.forEach((article) => {
      article.tags.forEach((tag) => {
        tempTags.push(tag);
      });
    });
    const uniqueDictionaries = [
      ...new Set(tempTags.map((tag) => JSON.stringify({ ...tag, _id: undefined }))),
    ].map((str) => JSON.parse(str));
    setAllTags(uniqueDictionaries);
  };

  const extractAllAuthors = (articles) => {
    const tempAuthors = new Set();
    articles.forEach((article) => {
      tempAuthors.add(article.author);
    });
    setAuthors(Array.from(tempAuthors));
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/articles');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const responseData = await response.json();
        const { articles } = responseData.data;
        extractAllTags(articles);
        extractAllAuthors(articles);
        const articleCodes = articles.map((article) => article.articleCode).filter((code) => code);

        let newArticle;
        if (articleCodes.length === 0) {
          newArticle = 0;
        } else {
          const lastArticleCode = Math.max(...articleCodes);
          newArticle = lastArticleCode + 1;
        }

        console.log('New Article code:', newArticle);
        setArticleCode(newArticle);
      } catch (error) {
        console.error('Error fetching documents:', error.message);
      }
    };

    fetchData();
  }, []); // Empty dependency array to run effect only once on component mount

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission behavior
    if (insertData.file == null) {
      setInsertData((prevFormData) => ({
        ...prevFormData,
        errors: {
          ...prevFormData.errors,
          dateArticle: true,
        },
      }));
    }

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

    const hasErrors = Object.values(insertData.errors).some((error) => error);

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
        body: JSON.stringify(articleData),
      });

      console.log(response);
      if (response.ok) {
        console.log('Data saved successfully');
        window.location.reload();
        // setTimeout(() => {
        //   window.location.reload();
        // }, 1500);

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
  };

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
            options={allAuthor}
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
                  // eslint-disable-next-line prefer-destructuring
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
          {/* <IconButton size="large">
            <PictureAsPdfIcon fontSize="inherit" />
          </IconButton> */}

          <input
            type="file"
            accept=".pdf"
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
          {allTags != null && <GitHubLabel onTagsChange={handleTagsChange} labels={allTags} />}
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
