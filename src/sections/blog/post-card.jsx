/* eslint-disable no-nested-ternary */
import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import TodayIcon from '@mui/icons-material/Today';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import LanguageIcon from '@mui/icons-material/Language';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import useMediaQuery from '@mui/material/useMediaQuery';
import SatelliteIcon from '@mui/icons-material/Satellite';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ManRoundedIcon from '@mui/icons-material/ManRounded';
import WomanRoundedIcon from '@mui/icons-material/WomanRounded';
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import QuestionMarkRoundedIcon from '@mui/icons-material/QuestionMarkRounded';
// import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import EventAvailableOutlinedIcon from '@mui/icons-material/EventAvailableOutlined';

// import { fDate } from 'src/utils/format-time';
// import { fShortenNumber } from 'src/utils/format-number';

import Iconify from 'src/components/iconify';
import SvgColor from 'src/components/svg-color';

// import fishIcon from 'src/sections/blog/view/fish.png';

// ----------------------------------------------------------------------

export default function PostCard({ post }) {
  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down('sm'));
  const { cover, humanWild, ar, maxDepth, idCodePhotographerName, reportReceivingDate, reportType, typeOfDive, userDescription, objectCode, objectGroup, diveSite,rankOfDive,  specie, distance, temp, author, createdAt, diveCode, imageLocation, age, gender, linkURL, media, loggedBy, logginDate, time } = post;

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
          overflow: 'hidden',
          fontSize:'0.9rem',
          WebkitBoxOrient: 'vertical',
          textAlign: 'center',
          fontWeight: 'bold'
        }}
      >
        <LocationOnIcon sx={{ mr: 0.5, fontSize: 13 }} />
        {diveSite}
      </Link>
      <Link

        variant="subtitle2"
        underline="none"
        sx={{
          overflow: 'hidden',
          textAlign: 'center'
        }}
      >
        {diveCode}
      </Link>
    </Stack>
    <Stack direction="row" justifyContent="center" spacing={1}>
    {/* <img
      src={fishIcon}
      alt="Fish Icon"
      style={{
        width: 15, 
        height: 15, 
      }}
    /> */}
    <Typography
      variant="subtitle2"
      height="20px"
      sx={{
        display: 'flex',
        alignItems: 'center',
      }}
    >
    {specie}
    </Typography>
    <Typography
      variant="subtitle2"
      height="20px"
      sx={{
        display: 'flex',
        height: 30,
        alignItems: 'center',
      }}
    >
    {/* {specie} */}
    </Typography>
  </Stack>
  </Stack>
  );

  const renderUserInfo = (
    <Typography
      color="inherit"
      variant="subtitle2"
      sx={{
        height: 30,
        overflow: 'hidden',
        WebkitLineClamp: 2,
        display: 'flex',
        alignItems: 'center',
      }}
    >
      {gender === 'Male' ? (
        <ManRoundedIcon sx={{ fontSize: 22 }} />
      ) : gender === 'Female' ? (
        <WomanRoundedIcon sx={{ fontSize: 20 }} />
      ) : (
        <QuestionMarkRoundedIcon sx={{ fontSize: 20 }} />
      )}
      {gender}
      <Typography
        color="inherit"
        variant="subtitle2"
        sx={{
          ml: 1, // Add some margin between gender and age
          fontSize: 'inherit',
          height: 30,
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

  const renderUserDescription =(
    <Typography
        variant="subtitle2"
        sx={{
          ml: 1, 
          overflow: 'hidden',
          WebkitLineClamp: 2,
          display: 'flex',
        }}
      >
        {userDescription}
      </Typography>
  )

  // const renderData = (
  //   <Stack
  //     color="inherit"
  //     variant="subtitle2"
  //     underline="hover"
  //     sx={{
  //       height: 30,
  //       overflow: 'hidden',
  //       WebkitLineClamp: 2,
  //       display: '-webkit-box',
  //       WebkitBoxOrient: 'vertical',
  //     }}
  //   >
  //     {data}
  //   </Stack>
  // );

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
        {humanWild}
      </Link>
      <Link
        variant="subtitle2"
        underline="hover"
        sx={{
          overflow: 'hidden',
          fontSize: '0.83rem',
          display: '-webkit-box',
          WebkitBoxOrient: 'vertical',
        }}
      >
        {ar}
      </Link>
      <Link
        variant="subtitle2"
        underline="hover"
        sx={{
          overflow: 'hidden',
          fontSize: '0.83rem',
          display: '-webkit-box',
          WebkitBoxOrient: 'vertical',
        }}
      >
        {maxDepth}
      </Link>
      <Link
        variant="subtitle2"
        underline="hover"
        sx={{
          overflow: 'hidden',
          WebkitLineClamp: 2,
          fontSize: '0.83rem',
          display: '-webkit-box',
          WebkitBoxOrient: 'vertical',
        }}
      >
        {distance}
      </Link>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Link
          variant="subtitle2"
          underline="hover"
          sx={{
            overflow: 'hidden',
            WebkitLineClamp: 2,
            fontSize: '0.83rem',
            height: 30,
            display: '-webkit-box',
            WebkitBoxOrient: 'vertical',
            flexGrow: 1, // Ensure it takes up available space
          }}
        >
          {temp}
        </Link>
        <Link
          variant="subtitle2"
          underline="hover"
          sx={{
            overflow: 'hidden',
            height: 30,
            WebkitLineClamp: 2,
            fontSize: '0.83rem',
            display: '-webkit-box',
            WebkitBoxOrient: 'vertical',
            textAlign: 'right', // Align text to the right
          }}
        >
          {rankOfDive}
        </Link>
      </Stack>
    </Stack>
  );
  
  

  const renderDataCodes = (
    <Stack>
      <Link
        variant="subtitle2"
        underline="disable"
        sx={{
          overflow: 'hidden',
          display: '-webkit-box',
          fontSize: '0.83rem',
          WebkitBoxOrient: 'vertical',
        }}
      >
        {objectGroup}
      </Link>
      <Link
        variant="subtitle2"
        underline="hover"
        sx={{
          overflow: 'hidden',
          fontSize: '0.83rem',
          display: '-webkit-box',
          WebkitBoxOrient: 'vertical',
        }}
      >
        {objectCode}
      </Link>
      <Link
        variant="subtitle2"
        underline="hover"
        sx={{
          overflow: 'hidden',
          fontSize: '0.83rem',
          display: '-webkit-box',
          WebkitBoxOrient: 'vertical',
        }}
      >
        {reportType}
      </Link>
      <Link
        variant="subtitle2"
        underline="hover"
        sx={{
          fontSize: '0.83rem',
          height: 30,
          overflow: 'hidden',
          WebkitLineClamp: 2,
          display: '-webkit-box',
          WebkitBoxOrient: 'vertical',
        }}
      >
        {typeOfDive}
      </Link>
      
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
      <Stack direction="row" alignItems="center">
        <Iconify icon="eva:person-fill" width={16} sx={{ mr: 0.5, color: 'green' }} />
        <Typography variant="caption">{loggedBy}</Typography>
      </Stack>
      <Stack direction="row" alignItems="center">
        <Iconify icon="eva:calendar-outline" width={16} sx={{ mr: 0.5, color: 'green' }} />
        <Typography variant="caption">
          {logginDate || 'Invalid Date'}
        </Typography>
      </Stack>
    </Stack>
  );

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
              onClick={() => window.open(linkURL, '_blank')}
            />
          ) : (
            <FacebookOutlinedIcon
              sx={{ cursor: 'pointer', fontSize: 18, color: 'text.disabled' }}
            />
          )}
          {time === 'Light' ? (
            <WbSunnyIcon sx={{ ml: 1, fontSize: 18, color: 'text.disabled' }} />
          ) : time === 'Night' ? (
            <DarkModeIcon sx={{ ml: 1, fontSize: 18, color: 'text.disabled' }} />
          ) : (
            <QuestionMarkRoundedIcon sx={{ ml: 1, fontSize: 18, color: 'text.disabled' }} />
          )}
        </Stack>
      </Stack>
      <Typography
        variant="caption"
        component="div"
        sx={{
          height:20,
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
        <EventAvailableOutlinedIcon sx={{ mr: 0.5, fontSize: 16 }}/>
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
          height: isSmallScreen ? '70vh' : '30vh', // Adjust height for small screens
          minHeight: isSmallScreen ? 200 : 300,
          maxHeight: isSmallScreen ? 400 : 600,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Box 
          sx={{
            position: 'relative',
            pt: isSmallScreen ? 'calc(100% * 3 / 5)':'calc(100% * 3 / 4)',
          }}
        >
          {renderShape}

          {renderAvatar}

          {renderCover}
        </Box>

        <Box
          sx={{
            p: (theme) => theme.spacing(4, 1, 3, 2),
            overflowY: 'auto', // Make the inner content scrollable
            flex: 1, // Allow the Box to grow to take up available space
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
    </Grid>
  );
}

PostCard.propTypes = {
  post: PropTypes.object.isRequired,
};
