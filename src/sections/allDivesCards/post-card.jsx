import PropTypes from 'prop-types';
import React, { useState } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import dayjs from 'dayjs';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import TodayIcon from '@mui/icons-material/Today';
import IconButton from '@mui/material/IconButton';
import DialogTitle from '@mui/material/DialogTitle';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import LanguageIcon from '@mui/icons-material/Language';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import useMediaQuery from '@mui/material/useMediaQuery';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import SatelliteIcon from '@mui/icons-material/Satellite';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ManRoundedIcon from '@mui/icons-material/ManRounded';
import WomanRoundedIcon from '@mui/icons-material/WomanRounded';
import DialogContentText from '@mui/material/DialogContentText';
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import QuestionMarkRoundedIcon from '@mui/icons-material/QuestionMarkRounded';
import EventAvailableOutlinedIcon from '@mui/icons-material/EventAvailableOutlined';

import Iconify from 'src/components/iconify';
import SvgColor from 'src/components/svg-color';

import EditPostData from './view/editPostData';

export default function PostCard({ post, onDelete, onEdit }) {
  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down('sm'));
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editData, setEditData] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [imageDialogOpen, setImageDialogOpen] = useState(false);

  const handleEditOpen = (data) => {
    setEditData(data);
    setEditDialogOpen(true);
  };

  const handleEditClose = () => {
    setEditDialogOpen(false);
    setEditData(null);
  };

  const handleDeleteOpen = () => {
    setDeleteDialogOpen(true);
  };

  const handleDeleteClose = () => {
    setDeleteDialogOpen(false);
  };

  const handleDeleteClick = () => {
    onDelete(post.id);
    setDeleteDialogOpen(false);
  };
  const handleImageOpen = () => {
    setImageDialogOpen(true);
  };

  const handleImageClose = () => {
    setImageDialogOpen(false);
  };

  const { cover, humanWildlifeInteraction, AR, maxDepth, idCode_photographerName, reportReceivingDate, reportType, typeOfDive, userDescription, objectCode, objectGroup, diveSite, rankOfDive, specie, distance, temp, author, date, diveCode, imageLocation, age, gender, linkURL, media, loggedBy, loggingDate, time, fileLink, researcherComment } = post;

  const renderAvatar = (
    <Avatar
      alt={author.name}
      src={author.avatarUrl}
      sx={{
        zIndex: 9,
        width: 32,
        height: 32,
        position: 'absolute',
        left: (theme) => theme.spacing(3),
        bottom: (theme) => theme.spacing(-2),
      }}
    />
  );

  const renderDiveSite = (
    <Stack>
      <Stack direction="row" alignItems="center" justifyContent="center" spacing={1}>
        <Link
          variant="subtitle2"
          underline="hover"
          sx={{
            overflow: 'visible',
            fontSize: '0.9rem',
            textAlign: 'center',
            fontWeight: 'bold',
            display: 'inline-block',
            whiteSpace: 'normal', // Allow text to wrap
          }}
        >
          <LocationOnIcon sx={{ mr: 0.5, fontSize: 13 }} />
          {diveSite}
        </Link>

      </Stack>

        <Typography fontWeight="bold" fontSize="0.83rem" color="black">
        Specie:{' '}
        <Link
          variant="subtitle2"
          underline="disable"
          sx={{
            overflow: 'hidden',
            fontSize: '0.83rem',
            display: 'inline',
            WebkitBoxOrient: 'vertical',
          }}
        >
          {specie}
        </Link>
      </Typography>
      
    </Stack>
  );
  const getGenderIcon = (gen) => {
    if (gen === 'Male') {
      return <ManRoundedIcon sx={{ fontSize: 22 }} />;
    }
    if (gen === 'Female') {
      return <WomanRoundedIcon sx={{ fontSize: 20 }} />;
    }
    return <QuestionMarkRoundedIcon sx={{ fontSize: 20 }} />;
  };

  const renderUserInfo = (
    <Typography
      color="inherit"
      variant="subtitle2"
      component="div"  // Prevents nesting <h6> within another <h6>
      sx={{
        height: 50,
        overflow: 'hidden',
        WebkitLineClamp: 2,
        display: 'flex',
        alignItems: 'center',
      }}
    >
      {getGenderIcon(gender)}
      {gender}
      <Typography
        color="inherit"
        variant="subtitle2"
        component="span"  // Prevents nesting <h6> within another <h6>
        sx={{
          ml: 1,
          fontSize: 'inherit',
          height: 50,
          overflow: 'hidden',
          WebkitLineClamp: 2,
          display: 'flex',
          alignItems: 'center',
        }}
      >
        {age}
      </Typography>
    </Typography>
  );

  const renderUserDescription = (
    <Typography fontWeight="bold" fontSize="0.83rem" color="black">
      User description: {' '}
      <Link
        variant="subtitle2"
        underline="disable"
        sx={{
          overflow: 'hidden',
          fontSize: '0.83rem',
          display: 'inline',
          WebkitBoxOrient: 'vertical',
        }}
      >
        {userDescription}
      </Link>
    </Typography>
  );

  const renderDeleteEdit = (
    <>
      <Tooltip title="Delete">
        <IconButton
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            color: 'white',
            background: 'linear-gradient(to right, red, yellow)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
          onClick={handleDeleteOpen}
        >
          <Iconify icon="eva:trash-2-fill" />
        </IconButton>
      </Tooltip>
      <Tooltip title="Edit">
        <IconButton
          sx={{
            position: 'absolute',
            top: 0,
            right: 0,
            color: 'white',
            background: 'linear-gradient(to right, green, blue)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
          onClick={() => handleEditOpen(post)}
        >
          <Iconify icon="eva:edit-fill" />
        </IconButton>
      </Tooltip>
    </>
  );

  const renderBody = (
    <Stack>
      <Typography fontWeight='bold' fontSize='0.83rem' color="black">
      Dive Code:
        <Link
          variant="subtitle2"
          underline="none"
          component="span"  // Prevents nesting <h6> within another <h6>
          sx={{
            overflow: 'hidden',
            fontSize: '0.83rem',
            display: 'inline',
            WebkitBoxOrient: 'vertical',
          }}
        > {diveCode}
        </Link>
      </Typography>
      <Typography fontWeight='bold' fontSize='0.83rem' color="black">
        Human wild life interaction:{' '}
        <Link
          variant="subtitle2"
          underline="none"
          component="span"  // Prevents nesting <h6> within another <h6>
          sx={{
            overflow: 'hidden',
            fontSize: '0.83rem',
            display: 'inline',
            WebkitBoxOrient: 'vertical',
          }}
        >
          {humanWildlifeInteraction}
        </Link>
      </Typography>

      <Typography fontWeight='bold' fontSize='0.83rem' color="black">Artificial Reef:{' '}
        <Link
          variant="subtitle2"
          underline="none"
          component="span"  // Prevents nesting <h6> within another <h6>
          sx={{
            overflow: 'hidden',
            fontSize: '0.83rem',
            display: 'inline',
            WebkitBoxOrient: 'vertical',
          }}
        >
          {AR}
        </Link>
      </Typography>
      <Typography fontWeight='bold' fontSize='0.83rem' color="black">Max Depth:{' '}
        <Link
          variant="subtitle2"
          underline="none"
          component="span"  // Prevents nesting <h6> within another <h6>
          sx={{
            overflow: 'hidden',
            fontSize: '0.83rem',
            display: 'inline',
            WebkitBoxOrient: 'vertical',
          }}
        >
          {maxDepth}
        </Link>
      </Typography>

      <Typography fontWeight='bold' fontSize='0.83rem' color="black">Distance:{' '}
        <Link
          variant="subtitle2"
          underline="none"
          component="span"  // Prevents nesting <h6> within another <h6>
          sx={{
            overflow: 'hidden',
            fontSize: '0.83rem',
            display: 'inline',
            WebkitBoxOrient: 'vertical',
          }}
        >
          {distance}
        </Link>
      </Typography>

      <Typography fontWeight="bold" fontSize="0.83rem" color="black">
          Temp:{' '}
          <Link
            variant="subtitle2"
            underline="disable"
            sx={{
              overflow: 'hidden',
              fontSize: '0.83rem',
              display: 'inline',
              WebkitBoxOrient: 'vertical',
            }}
          >
            {temp}
          </Link>
        </Typography>
        <Typography fontWeight="bold" fontSize="0.83rem" color="black">
          Rank:{' '}
          <Link
            variant="subtitle2"
            underline="disable"
            sx={{
              overflow: 'hidden',
              fontSize: '0.83rem',
              display: 'inline',
              WebkitBoxOrient: 'vertical',
            }}
          >
            {rankOfDive}
          </Link>
        </Typography>
    </Stack>
  );

  const renderDataCodes = (
    <Stack>
      <Typography fontWeight="bold" fontSize="0.83rem" color="black">
        Object Group:{' '}
        <Link
          variant="subtitle2"
          underline="disable"
          sx={{
            overflow: 'hidden',
            fontSize: '0.83rem',
            display: 'inline',
            WebkitBoxOrient: 'vertical',
          }}
        >
          {objectGroup}
        </Link>
      </Typography>

      <Typography fontWeight="bold" fontSize="0.83rem" color="black">
        Report Type:{' '}
        <Link
          variant="subtitle2"
          underline="disable"
          sx={{
            overflow: 'hidden',
            fontSize: '0.83rem',
            display: 'inline',
            WebkitBoxOrient: 'vertical',
          }}
        >
          {reportType}
        </Link>
      </Typography>
      <Typography fontWeight="bold" fontSize="0.83rem" color="black">
        Type Of Dive:{' '}
        <Link
          variant="subtitle2"
          underline="disable"
          sx={{
            overflow: 'hidden',
            fontSize: '0.83rem',
            display: 'inline',
            WebkitBoxOrient: 'vertical',
          }}
        >
          {typeOfDive}
        </Link>
      </Typography>
    
      <Typography fontWeight="bold" fontSize="0.83rem" color="black">
        Name Of Diver:{' '}
        <Link
          variant="subtitle2"
          underline="disable"
          sx={{
            overflow: 'hidden',
            fontSize: '0.83rem',
            display: 'inline',
            WebkitBoxOrient: 'vertical',
          }}
        >
          {idCode_photographerName}
        </Link>
      </Typography>
      
    </Stack>
  );

  const renderInfo = (
    <Stack
      direction="row"
      flexWrap="wrap"
      justifyContent="flex-start"
      sx={{
        mt: 1
      }}
    >
      <Iconify icon="eva:person-fill" width={16} sx={{ color: 'green' }} />
      <Typography fontWeight="bold" fontSize="0.83rem" color="black" spacing={1}>
        Dive approved by:
      </Typography>
      <Typography variant="caption"> {loggedBy}</Typography>
  
      <Box sx={{ width: '100%' }} /> {/* Line break after loggedBy */}
  
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Iconify icon="eva:calendar-outline" width={16} sx={{ color: 'green' }} />
        <Typography fontWeight="bold" fontSize="0.83rem" color="black" sx={{ ml: 0 }}>
In: 
        </Typography>
      </Box>
      <Typography variant="caption">
        {dayjs(reportReceivingDate).format('DD/MM/YYYY')}
      </Typography>
  
      <Box sx={{ width: '100%' }} /> 

      <Typography fontWeight="bold" fontSize="0.83rem" color="black" spacing={1}>Researcher comment: 
      </Typography>
      <Typography variant="caption">{researcherComment} </Typography>


    </Stack>
  );
  
  
  const renderCover = (
    <Box
      component="img"
      alt={diveSite}
      src={fileLink || cover}
      sx={{
        top: 0,
        width: 1,
        height: 1,
        objectFit: 'cover',
        position: 'absolute',
      }}
      onClick={handleImageOpen}

    />
  );

  const getTimeIcon = (timeDive) => {
    if (timeDive === 'Light' || timeDive === 'light') {
      return <WbSunnyIcon sx={{ ml: 1, fontSize: 18, color: 'text.disabled' }} />;
    } if (timeDive === 'Night' || timeDive === 'night') {
      return <DarkModeIcon sx={{ ml: 1, fontSize: 18, color: 'text.disabled' }} />;
    }
    return <QuestionMarkRoundedIcon sx={{ ml: 1, fontSize: 18, color: 'text.disabled' }} />;

  };

  const renderUpper = (
    <Stack spacing={0.5}>
      <Stack direction="row" justifyContent="space-between">
        <Typography
          variant="caption"
          component="div"  // Prevents nesting <h6> within another <h6>
          sx={{
            color: 'text.disabled',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <TodayIcon sx={{ mr: 0.5, fontSize: 16 }} />
          Date Of Dive: {dayjs(date).format('DD/MM/YYYY')}
        </Typography>
        <Stack direction="row" alignItems="center" sx={{ ml: 'auto' }}>
          {media === 'Website' ? (
            <LanguageIcon
              sx={{ cursor: 'pointer', fontSize: 18, color: 'text.disabled' }}
            />
          ) : (
            <FacebookOutlinedIcon
              sx={{ cursor: 'pointer', fontSize: 18, color: 'text.disabled' }}
              onClick={() => window.open(linkURL, '_blank')}
            />
          )}
          {getTimeIcon(time)}
        </Stack>
      </Stack>
      <Typography
        variant="caption"
        component="div"  // Prevents nesting <h6> within another <h6>
        sx={{
          height: 20,
          color: 'text.disabled',
          display: 'flex',
          alignItems: 'center',
        }}
      >

        <SatelliteIcon sx={{ mr: 0.5, fontSize: 16 }} />
        {imageLocation}
        {idCode_photographerName && (
          <>
            &nbsp;|&nbsp;
            {idCode_photographerName}
          </>
        )}
      </Typography>
      <Typography
        variant="caption"
        component="div"  // Prevents nesting <h6> within another <h6>
        sx={{
          color: 'text.disabled',
          display: 'flex',
          alignItems: 'center',
          height: 40
        }}
      >
        <EventAvailableOutlinedIcon sx={{ mr: 0.5, fontSize: 16 }} />
       Inserted In: {dayjs(loggingDate).format('DD/MM/YYYY')}
      </Typography>
    </Stack>
  );

  const renderShape = (
    <SvgColor
      color="paper"
      src="/assets/icons/shape-avatar.svg"
      sx={{
        width: 80,
        height: 36,
        zIndex: 9,
        bottom: -15,
        position: 'absolute',
        color: 'background.paper',
      }}
    />
  );

  return (
    <Grid xs={12} sm={4} md={3}>
      <Card
        sx={{
          height: isSmallScreen ? '70vh' : '30vh',
          minHeight: isSmallScreen ? 200 : 300,
          maxHeight: isSmallScreen ? 400 : 600,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Box
          sx={{
            position: 'relative',
            pt: isSmallScreen ? 'calc(100% * 3 / 5)' : 'calc(100% * 3 / 4)',
          }}
        >
          {renderShape}
          {renderAvatar}
          {renderCover}
          {renderDeleteEdit}
        </Box>

        <Box
          sx={{
            p: (theme) => theme.spacing(4, 1, 3, 2),
            overflowY: 'auto',
            flex: 1,
          }}
        >
          {renderUpper}
          {renderDiveSite}
          {renderBody}
          {renderDataCodes}
          {renderUserInfo}
          {renderUserDescription}
          {renderInfo}
        </Box>
      </Card>

      <EditPostData
        open={editDialogOpen}
        handleClose={handleEditClose}
        postData={editData}
        onUpdate={(updatedData) => {
          onEdit(updatedData);  // Ensure onEdit is called when data is updated
          handleEditClose();  // Close the dialog after updating
        }}
      />

      <Dialog
        open={deleteDialogOpen}
        onClose={handleDeleteClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Are you sure you want to delete this item?</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDeleteClick} color="primary" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={imageDialogOpen}
        onClose={handleImageClose}
        fullWidth
        maxWidth="lg"
      >
        <DialogTitle>Image Viewer</DialogTitle>
        <DialogContent>
          <TransformWrapper
            initialScale={1}
            initialPositionX={0}
            initialPositionY={0}
          >
            {({ zoomIn, zoomOut, resetTransform }) => (
              <>
                <Box sx={{ mb: 2, display: 'flex', justifyContent: 'center' }}>
                  <Button onClick={zoomIn} sx={{ mx: 1 }} />
                  <Button onClick={zoomOut} sx={{ mx: 1 }} />
                  <Button onClick={resetTransform} sx={{ mx: 1 }} />
                </Box>
                <TransformComponent>
                  <Box
                    component="img"
                    alt={diveSite}
                    src={fileLink || cover}
                    sx={{
                      width: '100%',
                      maxHeight: '80vh',
                      objectFit: 'contain',
                    }}
                  />
                </TransformComponent>
              </>
            )}
          </TransformWrapper>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleImageClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>

    </Grid>
  );
}

PostCard.propTypes = {
  post: PropTypes.object.isRequired,
  onDelete: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
};
