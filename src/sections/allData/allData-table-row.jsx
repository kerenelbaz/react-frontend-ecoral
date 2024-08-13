import { useState } from 'react';
import PropTypes from 'prop-types';

import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete';

import ImageDialog from './imageDialog';

// ----------------------------------------------------------------------

export default function AllDataTableRow({
  selected, name, avatarUrl, company, role, isVerified, status, handleClick,
  diveCode, diveDate, time, diveSite, objectGroup, specie, idCode, location, ar, humanWildInter, 
  reportType, typeOfDive, groupCode, media, fileType, reportRecivingDate, InvestDoc, diverAge, diverSex, rank, loggedBy, loggingDate,
  idSharks, distance, temp, maxDepth, userDesc, researcherDesc, fileLink, onDeleteClicked, onEditClicked
}) {
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleDelete = () => {
    onDeleteClicked();
  }

  const handleAvatarClick = () => {
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  return (
    <>
      <TableRow>
        <TableCell padding="checkbox">
          <Stack direction="row" spacing={1}>
            <IconButton aria-label="edit" size="small" color='primary' onClick={onEditClicked}>
              <EditIcon />
            </IconButton>
            <IconButton aria-label="delete" size="small" color='error' onClick={handleDelete}>
              <DeleteIcon />
            </IconButton>
          </Stack>
        </TableCell>
        <TableCell component="th" scope="row" padding="normal">
          <Stack direction="row" alignItems="center" spacing={4}>
            <Typography variant="subtitle2" noWrap>
              {diveCode}
            </Typography>
          </Stack>
        </TableCell>
        <TableCell>{loggingDate}</TableCell>
        <TableCell>{groupCode}</TableCell>
        <TableCell>{diveDate}</TableCell>
        <TableCell>{time}</TableCell>
        <TableCell>{diveSite}</TableCell>
        <TableCell>{objectGroup}</TableCell>
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
        <TableCell>{loggedBy}</TableCell>
        {/* <TableCell>
          <Stack direction="row" alignItems="center" spacing={4}>
            <Avatar alt={diveCode} src={fileLink || ""} onClick={handleAvatarClick} sx={{ cursor: 'pointer' }} />
          </Stack>  
        </TableCell> */}
      </TableRow>
      <ImageDialog open={dialogOpen} onClose={handleCloseDialog} fileLink={fileLink} />
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
  diveCode: PropTypes.string,
  diveDate: PropTypes.string, 
  diveSite: PropTypes.string, 
  objectGroup: PropTypes.string, 
  specie: PropTypes.string, 
  idCode: PropTypes.string, 
  location: PropTypes.string, 
  ar: PropTypes.string, 
  humanWildInter: PropTypes.string, 
  reportType: PropTypes.string, 
  typeOfDive: PropTypes.string, 
  groupCode: PropTypes.string, 
  media: PropTypes.string, 
  fileType: PropTypes.string, 
  InvestDoc: PropTypes.string, 
  diverAge: PropTypes.string, 
  diverSex: PropTypes.string, 
  idSharks: PropTypes.string, 
  distance: PropTypes.number, 
  temp: PropTypes.number,
  maxDepth: PropTypes.number, 
  userDesc: PropTypes.string, 
  researcherDesc: PropTypes.string, 
  fileLink: PropTypes.string,
  reportRecivingDate: PropTypes.string,
  rank: PropTypes.string,
  loggedBy: PropTypes.string,
  loggingDate: PropTypes.string,
  time: PropTypes.string,
  onDeleteClicked: PropTypes.func,
  onEditClicked: PropTypes.func,
};