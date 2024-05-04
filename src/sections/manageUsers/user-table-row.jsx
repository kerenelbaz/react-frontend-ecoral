/* eslint-disable jsx-a11y/alt-text */
import { useState } from 'react';
import PropTypes from 'prop-types';

// import Button from '@mui/material/Button'; 
import Popover from '@mui/material/Popover';
import TableRow from '@mui/material/TableRow';
// import MenuItem from '@mui/material/MenuItem';
// import Checkbox from '@mui/material/Checkbox';
import EditIcon from '@mui/icons-material/Edit';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

// import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

export default function UserTableRow({
  // selected,
  email,
  name,
  gender,
  birthDate,
  
  // handleClick,
  // onEditClick,
}) {
  const [open, setOpen] = useState(null);


  // const handleOpenMenu = (event) => {
  //   setOpen(event.currentTarget);
  // };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  // const handleEditClick = () => {
  //   onEditClick(); // Call the function passed from the parent component
  // };

  const handleDeleteBtn = (emailToDelete) => {
    // Construct the URL with the emailToDelete
    const url = `https://localhost:7215/api/User/${emailToDelete}`;
  
    // Perform the fetch request
    fetch(url, {
      method: 'DELETE', // Specify the method to use
      headers: {
        'Content-Type': 'application/json' // Set appropriate headers if needed
      }
    })
    .then(response => {
      if (!response.ok) {
        // If the response is not OK, throw an error
        throw new Error('Network response was not ok');
      }
      return response.json(); // Parse JSON response
    })
    .then(data => {
      console.log('User deleted:', data); // Handle success
    })
    .catch(error => {
      console.error('There was a problem with the fetch operation:', error); // Handle errors
    });
  };
  

  return (
    <>
      
      <TableRow>
      
        <TableCell padding="checkbox">
          <IconButton aria-label="edit" size="small" color='primary' >
            <EditIcon fontSize="small" />
          </IconButton>
        </TableCell>
        
        <TableCell>{email}</TableCell>
        <TableCell>{name}</TableCell>
        <TableCell>{gender}</TableCell>
        <TableCell>{birthDate}</TableCell>
        
        
         <TableCell>
          <IconButton aria-label="delete" size="small" color='error' onClick = {(e)=>{handleDeleteBtn(email)}}>
            <DeleteIcon fontSize="small" color='red' />
          </IconButton>
          
         </TableCell>
        
        
      </TableRow>

      <Popover
        open={!!open}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: { width: 140 },
        }}
      />
     
     
    </>
  );
}

UserTableRow.propTypes = {
  email: PropTypes.string,
  name: PropTypes.string,
  gender: PropTypes.string,
  birthDate: PropTypes.string,
  
};
