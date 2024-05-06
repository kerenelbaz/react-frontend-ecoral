import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
// import Avatar from '@mui/material/Avatar';
import Popover from '@mui/material/Popover';
import TableRow from '@mui/material/TableRow';
// import Checkbox from '@mui/material/Checkbox';
import MenuItem from '@mui/material/MenuItem';
import TableCell from '@mui/material/TableCell';
import LinkIcon from '@mui/icons-material/Link';
import {  useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
// import { styled, useTheme } from '@mui/material/styles';
import DownloadIcon from '@mui/icons-material/Download';

import Iconify from 'src/components/iconify';
// import { isOverflown } from '@mui/x-data-grid/utils/domUtils';

// ----------------------------------------------------------------------

export default function UserTableRow({ key,data, selected, handleClick }) {
  const [open, setOpen] = useState(null);
  const [formattedDate, setDateFormat] = useState(null);
  const theme = useTheme();

  useEffect(() => {
    const formatChange = () => {
      const date = new Date(data.date);

      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0'); // Add leading zero for single-digit months
      const day = String(date.getDate()).padStart(2, '0'); // Add leading zero for single-digit days

      const tempDate = `${day}/${month}/${year}`;
      setDateFormat(tempDate);
    };
    formatChange();
  }, [data.date]);

  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const handleDownloadFile = () => {
    const link = document.createElement('a');
    link.href = data.file;
    link.download = data.name;
    link.click();
  };

  const handleUrlClick = () => {
    const link = document.createElement('a');
    link.href = data.link;
    link.click();
  };

  return (
    <>
      <TableRow
        hover
        key={key}
        tabIndex={-1}
        role="checkbox"
        selected={selected}
        onDoubleClick={handleClick}
      >
        <TableCell padding="checkbox" onClick={handleClick}>
          {/* <Checkbox disableRipple checked={selected} onChange={handleClick} /> */}
        </TableCell>

        <TableCell component="th" scope="row" padding="none" onClick={handleClick}>
          <Stack direction="row" alignItems="center" spacing={2}>
            {/* <Avatar alt={name} src={avatarUrl} /> */}
            <Typography variant="subtitle2" noWrap>
              {data.name}
            </Typography>
          </Stack>
        </TableCell>

        <TableCell onClick={handleClick}>{data.doi}</TableCell>
        <TableCell onClick={handleClick}>{data.author}</TableCell>
        <TableCell onClick={handleClick}>{formattedDate}</TableCell>
        <TableCell onClick={handleClick} sx={{ display: 'flex', padding: '16px' }}>
          {data.tags.map((tag) => (
            <Box
              key={tag.name}
              sx={{
                height: '36px',
                width: '100%',
                margin: '0px 5px',
                padding: '.15em 4px',
                fontWeight: 600,
                lineHeight: '15px',
                borderRadius: '2px',
              }}
              style={{
                backgroundColor: tag.color,
                color: theme.palette.getContrastText(tag.color),
              }}
            >
              {tag.name}
            </Box>
          ))}
        </TableCell>
        {/* <TableCell onClick={handleClick}>{data.file}</TableCell> */}
        {/* <TableCell onClick={handleClick}>{data.link}</TableCell> */}

        {/* <TableCell align="center" onClick={handleClick}>{isVerified ? 'Yes' : 'No'}</TableCell> */}

        {/* <TableCell onClick={handleClick}>
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
        <MenuItem onClick={handleDownloadFile}>
          <DownloadIcon sx={{ mr: 2 }} />
          Download
        </MenuItem>

        <MenuItem onClick={handleUrlClick}>
          <LinkIcon sx={{ mr: 2 }} />
          Link
        </MenuItem>

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

UserTableRow.propTypes = {
  key: PropTypes.number,
  data: PropTypes.any,
  handleClick: PropTypes.func,
  selected: PropTypes.any,
};
