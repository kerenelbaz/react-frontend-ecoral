import React, { useState } from 'react';
import Button from '@mui/material/Button';
import GetAppTwoToneIcon from '@mui/icons-material/GetAppTwoTone';

import './importPostsStyle.css';

export default function ImportPostsView() {
  const [code, setCode] = useState('');

  const handleImport = async (event) => {
    event.preventDefault();
    console.log(code);

    try {
      const response = await fetch('http://kirilldevs.pythonanywhere.com/api/html-analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'text/plain'
        },
        body: code
      });

      if (!response.ok) {
        throw new Error('Failed to import data'); // Handle server errors
      }

      // If response is OK, do something, like showing a success message
      console.log('Data imported successfully');

    } catch (error) {
      console.error('Error importing data:', error.message);
      // Handle errors, like showing an error message to the user
    }
  };

  const handleChange = (event) => {
    setCode(event.target.value);
  };

  return (
    <div className="container1">
      <h1>Import Data From Social Media Posts</h1>
      <br />

      <form onSubmit={handleImport}>
        {' '}
        {/* Call handleImport function when the form is submitted */}
        <div>
          <p className="p">Paste HTML Code:</p>
          <textarea className="codeField" value={code} onChange={handleChange} />{' '}
          {/* Bind value and onChange */}
        </div>
        <div className="importButton">
          <Button size="large" type="submit" variant="outlined" endIcon={<GetAppTwoToneIcon />}>
            import
          </Button>
        </div>
        <br />
      </form>
    </div>
  );
}
