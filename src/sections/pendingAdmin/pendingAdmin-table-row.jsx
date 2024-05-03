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
  loggingDate,
  dateDive,
  timeDive,
  site,
  objectGroup,
  specie,
  file,
  imgLocation,
  uploadeImage,
  arReef,
  reportType,
  typeOfDive,
  rank,
  userDescription,
  maxDepth,
  distance,
  temp,
  status,
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
        
        <TableCell>{loggingDate}</TableCell>
        <TableCell>{dateDive}</TableCell>
        <TableCell>{timeDive}</TableCell>
        <TableCell>{site}</TableCell>
        <TableCell>{objectGroup}</TableCell>
        <TableCell>{reportType}</TableCell>
        {/* <TableCell>{file}</TableCell> */}
        {/* <TableCell>{imgLocation}</TableCell>
        <TableCell>{specie}</TableCell>
        <TableCell>{arReef}</TableCell>
        <TableCell>{typeOfDive}</TableCell>
        <TableCell>{rank}</TableCell>
        <TableCell>{userDescription}</TableCell>
        <TableCell>{maxDepth}</TableCell>
        <TableCell>{distance}</TableCell>
        <TableCell>{temp}</TableCell>
         */}
         <TableCell>
          <IconButton aria-label="delete" size="small" color='error'>
            <DeleteIcon fontSize="small" color='red' />
          </IconButton>
          
         </TableCell>
        
        {/* <TableCell align="right">
          <IconButton onClick={handleOpenMenu}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell> */}
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
        {/* <MenuItem onClick={handleEditClick}>
          <Iconify icon="eva:edit-fill" sx={{ mr: 2 }}/>
          Edit
        </MenuItem>

        <MenuItem onClick={handleCloseMenu} sx={{ color: 'error.main' }}>
          <Iconify icon="eva:trash-2-outline" sx={{ mr: 2 }} />
          Delete
        </MenuItem> */}
      </Popover>
    </>
  );
}

UserTableRow.propTypes = {
  loggingDate: PropTypes.string,
  dateDive: PropTypes.string,
  timeDive: PropTypes.string,
  site: PropTypes.string,
  objectGroup: PropTypes.string,
  specie: PropTypes.string,
  onEditClick: PropTypes.func,
  file: PropTypes.string,
  imgLocation: PropTypes.string,
  uploadeImage: PropTypes.string,
  arReef: PropTypes.string,
  reportType: PropTypes.string,
  typeOfDive: PropTypes.string,
  rank: PropTypes.string,
  userDescription: PropTypes.string,
  maxDepth: PropTypes.string,
  distance: PropTypes.string,
  temp: PropTypes.string,
  // selected: PropTypes.bool,
  handleClick: PropTypes.func,
  status: PropTypes.string,
};
