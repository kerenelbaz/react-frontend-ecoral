import { useState } from 'react';
import PropTypes from 'prop-types';

import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Popover from '@mui/material/Popover';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import MenuItem from '@mui/material/MenuItem';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

// import Label from 'src/components/label';
import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

export default function AllDataTableRow({
  selected, name, avatarUrl, company, role, isVerified, status, handleClick,
  diveCode, diveDate,time, diveSite, objectGroup, specie, idCode, location, ar, humanWildInter, 
  reportType, typeOfDive, groupCode, media, fileType, reportRecivingDate, InvestDoc, diverAge, diverSex, rank,loggedBy, loggingDate,
  idSharks, distance, temp,maxDepth, userDesc, researcherDesc ,fileLink,
}) {
  const [open, setOpen] = useState(null);

  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  return (
    <>
      <TableRow hover tabIndex={-1} role="checkbox" selected={selected}>
        <TableCell padding="checkbox">
          <Checkbox disableRipple checked={selected} onChange={handleClick} />
        </TableCell>

        <TableCell component="th" scope="row" padding="none">
          <Stack direction="row" alignItems="center" spacing={2}>
            <Avatar alt={diveCode} src={avatarUrl} />
            <Typography variant="subtitle2" noWrap>
              {diveCode}
            </Typography>
          </Stack>
        </TableCell>

        <TableCell>{objectGroup}</TableCell>
        {/* <TableCell>{diveDate}</TableCell> */}

        <TableCell>{time}</TableCell>
        <TableCell>{diveSite}</TableCell>
        <TableCell>{groupCode}</TableCell>
        <TableCell>{specie}</TableCell>
        <TableCell>{idCode}</TableCell>
        <TableCell>{location}</TableCell>
        <TableCell>{ar}</TableCell>
        <TableCell>{humanWildInter}</TableCell>
        <TableCell>{reportType}</TableCell>
        <TableCell>{typeOfDive}</TableCell>
        <TableCell>{rank}</TableCell>
        <TableCell>{media}</TableCell>
        <TableCell>{fileType}</TableCell>
        <TableCell>{diverAge}</TableCell>
        <TableCell>{diverSex}</TableCell>
        <TableCell>{maxDepth}</TableCell>
        <TableCell>{distance}</TableCell>
        <TableCell>{temp}</TableCell>
        <TableCell>{userDesc}</TableCell>
        <TableCell>{researcherDesc}</TableCell>
        <TableCell>{fileLink}</TableCell>
        <TableCell>{loggedBy}</TableCell>
        {/* <TableCell>{loggingDate}</TableCell>
        <TableCell>{reportRecivingDate}</TableCell> */}
        
        {/* <TableCell align="center">{isVerified ? 'Yes' : 'No'}</TableCell> */}

        {/* <TableCell>
          <Label color={(status === 'banned' && 'error') || 'success'}>{status}</Label>
        </TableCell> */}

        <TableCell align="right">
          <IconButton onClick={handleOpenMenu}>
            <Iconify icon="eva:more-vertical-fill" />
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
        <MenuItem onClick={handleCloseMenu}>
          <Iconify icon="eva:edit-fill" sx={{ mr: 2 }} />
          Edit
        </MenuItem>

        <MenuItem onClick={handleCloseMenu} sx={{ color: 'error.main' }}>
          <Iconify icon="eva:trash-2-outline" sx={{ mr: 2 }} />
          Delete
        </MenuItem>
      </Popover>
    </>
  );
}

AllDataTableRow.propTypes = {
  avatarUrl: PropTypes.any,
  company: PropTypes.any,
  handleClick: PropTypes.func,
  isVerified: PropTypes.any,
  name: PropTypes.any,
  role: PropTypes.any,
  selected: PropTypes.any,
  status: PropTypes.string,
  diveCode:PropTypes.string,
  diveDate:PropTypes.string, 
  diveSite:PropTypes.string, 
  objectGroup:PropTypes.string, 
  specie:PropTypes.string, 
  idCode:PropTypes.string, 
  location:PropTypes.string, 
  ar:PropTypes.string, 
  humanWildInter:PropTypes.string, 
  reportType:PropTypes.string, 
  typeOfDive:PropTypes.string, 
  groupCode:PropTypes.string, 
  media:PropTypes.string, 
  fileType:PropTypes.string, 
  InvestDoc:PropTypes.string, 
  diverAge:PropTypes.string, 
  diverSex:PropTypes.string, 
  idSharks:PropTypes.string, 
  distance:PropTypes.string, 
  temp:PropTypes.string,
  maxDepth:PropTypes.string, 
  userDesc:PropTypes.string, 
  researcherDesc:PropTypes.string, 
  fileLink:PropTypes.string,
  reportRecivingDate:PropTypes.string,
  rank:PropTypes.string,
  loggedBy:PropTypes.string,
  loggingDate:PropTypes.string,
  time:PropTypes.string,
};
