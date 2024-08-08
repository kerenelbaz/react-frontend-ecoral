// post-card.jsx
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

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
// import SatelliteIcon from '@mui/icons-material/Satellite';
import LocationOnIcon from '@mui/icons-material/LocationOn';
// import ManRoundedIcon from '@mui/icons-material/ManRounded';
// import WomanRoundedIcon from '@mui/icons-material/WomanRounded';
import DialogContentText from '@mui/material/DialogContentText';
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import QuestionMarkRoundedIcon from '@mui/icons-material/QuestionMarkRounded';
<<<<<<< HEAD
// import EventAvailableOutlinedIcon from '@mui/icons-material/EventAvailableOutlined';
=======
import EventAvailableOutlinedIcon from '@mui/icons-material/EventAvailableOutlined';
>>>>>>> parent of 69b2553 (Merge branch 'main' of https://github.com/kerenelbaz/react-frontend-ecoral)

import Iconify from 'src/components/iconify';
import SvgColor from 'src/components/svg-color';

<<<<<<< HEAD
// import EditPostData from './view/editPostData';
<<<<<<< HEAD
import EditData from './view/handle-edit-data';
=======
import EditPostData from '../allDivesCards/view/editPostData';
>>>>>>> parent of 69b2553 (Merge branch 'main' of https://github.com/kerenelbaz/react-frontend-ecoral)
=======
import EditPostData from './view/editPostData';
>>>>>>> parent of 8aaf634 (Update post-card.jsx)

export default function PostCard({ post, onDelete }) {
  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down('sm'));
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editData, setEditData] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

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

<<<<<<< HEAD

  const handleImageOpen = () => {
    setImageDialogOpen(true);
    console.log(post);
  };

  const handleImageClose = () => {
    setImageDialogOpen(false);
  };

  const {
    humanWild,
    ar,
    maxDepth,
    idCodePhotographerName,
    reportReceivingDate,
    reportType,
    typeOfDive,
    userDescription,
    objectCode,
    objectGroup,
    diveSite,
    rankOfDive,
    specie,
    distance,
    temp,
    author,
    createdAt,
    diveCode,
    imageLocation,
    age,
    gender,
    linkURL,
    media,
    loggedBy,
    loggingDate,
    time,
    file,
    cover,
  } = post;



=======
  const { cover, humanWild, ar, maxDepth, idCodePhotographerName, reportReceivingDate, reportType, typeOfDive, userDescription, objectCode, objectGroup, diveSite, rankOfDive, specie, distance, temp, author, createdAt, diveCode, imageLocation, age, gender, linkURL, media, loggedBy, loggingDate, time } = post;
>>>>>>> parent of 69b2553 (Merge branch 'main' of https://github.com/kerenelbaz/react-frontend-ecoral)

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
        <Link
          variant="subtitle2"
          underline="none"
          sx={{
            overflow: 'visible',
            textAlign: 'center',
            display: 'inline-block',
            whiteSpace: 'normal', // Allow text to wrap
          }}
        >
          {diveCode}
        </Link>
      </Stack>
      <Stack direction="row" justifyContent="left" spacing={1}>
        <Typography
          variant="subtitle2"
          height="62px"
          sx={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          {`specie: ${specie}`}
        </Typography>
        <Typography
          variant="subtitle2"
          height="40px"
          sx={{
            display: 'flex',
            height: 30,
            alignItems: 'center',
          }}
        />
      </Stack>
    </Stack>
  );
  

<<<<<<< HEAD

<<<<<<< HEAD
  // const getGenderIcon = (gen) => {
  //   if (gen === 'Male') {
  //     return <ManRoundedIcon sx={{ fontSize: 22 }} />;
  //   }
  //   if (gen === 'Female') {
  //     return <WomanRoundedIcon sx={{ fontSize: 20 }} />;
  //   }
  //   return <QuestionMarkRoundedIcon sx={{ fontSize: 20 }} />;
  // };
=======
=======
>>>>>>> parent of ccaa923 (worked on pending dives)
  const getGenderIcon = (gen) => {
    if (gen === 'Male') {
      return <ManRoundedIcon sx={{ fontSize: 22 }} />;
    }
    if (gen === 'Female') {
      return <WomanRoundedIcon sx={{ fontSize: 20 }} />;
    }
    return <QuestionMarkRoundedIcon sx={{ fontSize: 20 }} />;
<<<<<<< HEAD

  };
>>>>>>> parent of 69b2553 (Merge branch 'main' of https://github.com/kerenelbaz/react-frontend-ecoral)
=======
  };
>>>>>>> parent of ccaa923 (worked on pending dives)

  const renderUserInfo = (
    <Typography
      color="inherit"
      variant="subtitle2"
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
    <Typography
      variant="subtitle2"
      sx={{
        ml: 1,
        overflow: 'visible',
        whiteSpace: 'normal',
        display: 'block',
      }}
    >
      {userDescription}
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

<<<<<<< HEAD
<<<<<<< HEAD
  // const renderBody = (
  //   <Stack>
  //     <Link
  //       variant="subtitle2"
  //       underline="disable"
  //       sx={{
  //         overflow: 'hidden',
  //         fontSize: '0.83rem',
  //         display: '-webkit-box',
  //         WebkitBoxOrient: 'vertical',
  //       }}
  //     >
  //       <Typography fontWeight="bold" fontSize="0.83rem" color="black">
  //         Human wild life interaction:{' '}
  //         <Link
  //           variant="subtitle2"
  //           underline="disable"
  //           sx={{
  //             overflow: 'hidden',
  //             fontSize: '0.83rem',
  //             display: 'inline',
  //             WebkitBoxOrient: 'vertical',
  //           }}
  //         >
  //           {humanWild}
  //         </Link>
  //       </Typography>
  //     </Link>
  //     <Typography fontWeight="bold" fontSize="0.83rem" color="black">
  //       Artificial Reef:{' '}
  //       <Link
  //         variant="subtitle2"
  //         underline="disable"
  //         sx={{
  //           overflow: 'hidden',
  //           fontSize: '0.83rem',
  //           display: 'inline',
  //           WebkitBoxOrient: 'vertical',
  //         }}
  //       >
  //         {ar}
  //       </Link>
  //     </Typography>
  //     <Typography fontWeight="bold" fontSize="0.83rem" color="black">
  //       Max Depth:{' '}
  //       <Link
  //         variant="subtitle2"
  //         underline="disable"
  //         sx={{
  //           overflow: 'hidden',
  //           fontSize: '0.83rem',
  //           display: 'inline',
  //           WebkitBoxOrient: 'vertical',
  //         }}
  //       >
  //         {maxDepth}
  //       </Link>
  //     </Typography>
=======
  const renderBody = (
    <Stack>
      <Link
        variant="subtitle2"
        underline="disable"
        sx={{
          overflow: 'hidden',
          fontSize: '0.83rem',
          display: '-webkit-box',
          WebkitBoxOrient: 'vertical',
        }}
      >
        <Typography fontWeight="bold" fontSize="0.83rem" color="black">
          Human wild life interaction:{' '}
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
            {humanWild}
          </Link>
        </Typography>
      </Link>
      <Typography fontWeight="bold" fontSize="0.83rem" color="black">
        Artificial Reef:{' '}
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
          {ar}
        </Link>
      </Typography>
      <Typography fontWeight="bold" fontSize="0.83rem" color="black">
        Max Depth:{' '}
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
          {maxDepth}
        </Link>
      </Typography>
>>>>>>> parent of ccaa923 (worked on pending dives)

      <Typography fontWeight="bold" fontSize="0.83rem" color="black">
        Distance:{' '}
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
          {distance}
        </Link>
      </Typography>

<<<<<<< HEAD
  //     <Stack direction="row" justifyContent="space-between" alignItems="center">
  //       <Typography fontWeight="bold" fontSize="0.83rem" color="black">
  //         Temp:{' '}
  //         <Link
  //           variant="subtitle2"
  //           underline="disable"
  //           sx={{
  //             overflow: 'hidden',
  //             fontSize: '0.83rem',
  //             display: 'inline',
  //             WebkitBoxOrient: 'vertical',
  //           }}
  //         >
  //           {temp}
  //         </Link>
  //       </Typography>
  //       <Typography fontWeight="bold" fontSize="0.83rem" color="black">
  //         Rank:{' '}
  //         <Link
  //           variant="subtitle2"
  //           underline="disable"
  //           sx={{
  //             overflow: 'hidden',
  //             fontSize: '0.83rem',
  //             display: 'inline',
  //             WebkitBoxOrient: 'vertical',
  //           }}
  //         >
  //           {rankOfDive}
  //         </Link>
  //       </Typography>
  //     </Stack>
  //   </Stack>
  // );
=======
  const renderBody = (
    <Stack>
      <Link
        variant="subtitle2"
        underline="disable"
        sx={{
          overflow: 'hidden',
          fontSize: '0.83rem',
          display: '-webkit-box',
          WebkitBoxOrient: 'vertical',
        }}
      >
        <Typography fontWeight='bold' fontSize='0.83rem' color="black">Human wild life interaction:{' '}
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
            {humanWild}
          </Link>
        </Typography>
      </Link>
      <Typography fontWeight='bold' fontSize='0.83rem' color="black">Artificial Reef:{' '}
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
          {ar}
        </Link>
      </Typography>
      <Typography fontWeight='bold' fontSize='0.83rem' color="black">Max Depth:{' '}
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
          {maxDepth}
        </Link>
      </Typography>

      <Typography fontWeight='bold' fontSize='0.83rem' color="black">Distance:{' '}
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
          {distance}
        </Link>
      </Typography>

      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography fontWeight='bold' fontSize='0.83rem' color="black">Temp:{' '}
=======
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography fontWeight="bold" fontSize="0.83rem" color="black">
          Temp:{' '}
>>>>>>> parent of ccaa923 (worked on pending dives)
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
<<<<<<< HEAD
        <Typography fontWeight='bold' fontSize='0.83rem' color="black">Rank:{' '}
=======
        <Typography fontWeight="bold" fontSize="0.83rem" color="black">
          Rank:{' '}
>>>>>>> parent of ccaa923 (worked on pending dives)
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
    </Stack>
  );
<<<<<<< HEAD
>>>>>>> parent of 69b2553 (Merge branch 'main' of https://github.com/kerenelbaz/react-frontend-ecoral)
=======
>>>>>>> parent of ccaa923 (worked on pending dives)

  const renderDataCodes = (
    <Stack>
      <Typography fontWeight="bold" fontSize="0.83rem" color="black">
        Object group:{' '}
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
        Object code:{' '}
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
          {objectCode}
        </Link>
      </Typography>

      <Typography fontWeight="bold" fontSize="0.83rem" color="black">
        Report type:{' '}
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
        Type of dive:{' '}
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
    </Stack>
  );

<<<<<<< HEAD
<<<<<<< HEAD
  // const renderInfo = (
  //   <Stack
  //     direction="row"
  //     flexWrap="wrap"
  //     justifyContent="flex-start"
  //     sx={{
  //       mt: 1,
  //     }}
  //   >
  //     <Stack direction="row" alignItems="center">
  //       <Iconify icon="eva:person-fill" width={16} sx={{ mr: 0.5, color: 'green' }} />
  //       <Typography variant="caption">{loggedBy}</Typography>
  //     </Stack>
  //     <Stack direction="row" alignItems="center">
  //       <Iconify icon="eva:calendar-outline" width={16} sx={{ mr: 0.5, color: 'green' }} />
  //       <Typography variant="caption">{loggingDate || 'Invalid Date'}</Typography>
  //     </Stack>
  //   </Stack>
  // );
=======
=======
>>>>>>> parent of ccaa923 (worked on pending dives)
  const renderInfo = (
    <Stack
      direction="row"
      flexWrap="wrap"
      justifyContent="flex-start"
      sx={{
<<<<<<< HEAD
        mt: 1
=======
        mt: 1,
>>>>>>> parent of ccaa923 (worked on pending dives)
      }}
    >
      <Stack direction="row" alignItems="center">
        <Iconify icon="eva:person-fill" width={16} sx={{ mr: 0.5, color: 'green' }} />
        <Typography variant="caption">{loggedBy}</Typography>
      </Stack>
      <Stack direction="row" alignItems="center">
        <Iconify icon="eva:calendar-outline" width={16} sx={{ mr: 0.5, color: 'green' }} />
<<<<<<< HEAD
        <Typography variant="caption">
          {loggingDate || 'Invalid Date'}
        </Typography>
      </Stack>
    </Stack>
  );
>>>>>>> parent of 69b2553 (Merge branch 'main' of https://github.com/kerenelbaz/react-frontend-ecoral)
=======
        <Typography variant="caption">{loggingDate || 'Invalid Date'}</Typography>
      </Stack>
    </Stack>
  );
>>>>>>> parent of ccaa923 (worked on pending dives)

  const renderCover = (
    <Box
      component="img"
      alt={diveSite}
      src={cover}
      sx={{
        top: 0,
        width: 1,
        height: 1,
        objectFit: 'cover',
        position: 'absolute',
      }}
    />
  );

  const getTimeIcon = (timeDive) => {
    if (timeDive === 'Light') {
      return <WbSunnyIcon sx={{ ml: 1, fontSize: 18, color: 'text.disabled' }} />;
    } if (timeDive === 'Night') {
      return <DarkModeIcon sx={{ ml: 1, fontSize: 18, color: 'text.disabled' }} />;
    }
    return <QuestionMarkRoundedIcon sx={{ ml: 1, fontSize: 18, color: 'text.disabled' }} />;

  };

  const renderUpper = (
    <Stack spacing={0.5}>
      <Stack direction="row" justifyContent="space-between">
        <Typography
          variant="caption"
          component="div"
          sx={{
            color: 'text.disabled',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <TodayIcon sx={{ mr: 0.5, fontSize: 16 }} />
          {createdAt}
        </Typography>
        <Stack direction="row" alignItems="center" sx={{ ml: 'auto' }}>
          {media === 'Website' ? (
            <LanguageIcon
              sx={{ cursor: 'pointer', fontSize: 18, color: 'text.disabled' }}
              // onClick={() => window.open(linkURL, '_blank')}
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
        component="div"
        sx={{
          height: 20,
          color: 'text.disabled',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <SatelliteIcon sx={{ mr: 0.5, fontSize: 16 }} />
        {imageLocation}
        {idCodePhotographerName && (
          <>
            &nbsp;|&nbsp;
            {idCodePhotographerName}
          </>
        )}
      </Typography>
      <Typography
        variant="caption"
        component="div"
        sx={{
          color: 'text.disabled',
          display: 'flex',
          alignItems: 'center',
          height: 40
        }}
      >
        <EventAvailableOutlinedIcon sx={{ mr: 0.5, fontSize: 16 }} />
        Report receiving date:
        <br />
        {reportReceivingDate}
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
          // Handle the update here if needed
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
    </Grid>
  );
}

PostCard.propTypes = {
  post: PropTypes.object.isRequired,
  onDelete: PropTypes.func.isRequired,
};