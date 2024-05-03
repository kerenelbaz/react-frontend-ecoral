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
  
  handleClick,
  onEditClick,
}) {
  const [open, setOpen] = useState(null);


  // const handleOpenMenu = (event) => {
  //   setOpen(event.currentTarget);
  // };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const handleEditClick = () => {
    onEditClick(); // Call the function passed from the parent component
  };

  

  return (
    <>
      {/* <TableRow hover tabIndex={-1} role="checkbox" selected={selected}> */}
      <TableRow>
        {/* <TableCell padding="checkbox">
          <Checkbox disableRipple checked={selected} onChange={handleClick} />
        </TableCell> */}
        {/* <IconButton aria-label="delete" size="small" color='success'>
            <DeleteIcon fontSize="small" color='red' />
          </IconButton> */}
        <TableCell padding="checkbox">
          {/* <Button onClick={handleClick} variant="outlined" startIcon={<EditIcon/>}>
            Edit
          </Button> */}
          <IconButton aria-label="edit" size="small" color='primary' onClick={handleEditClick}>
            <EditIcon fontSize="small" />
          </IconButton>
        </TableCell>
        
        <TableCell>{email}</TableCell>
        <TableCell>{name}</TableCell>
        <TableCell>{gender}</TableCell>
        <TableCell>{birthDate}</TableCell>
        
        
         <TableCell>
          <IconButton aria-label="delete" size="small" color='error'>
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
      >
     
      </Popover>
    </>
  );
}

UserTableRow.propTypes = {
  email: PropTypes.string,
  name: PropTypes.string,
  gender: PropTypes.string,
  birthDate: PropTypes.string,
  
};
