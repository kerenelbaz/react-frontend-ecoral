/* eslint-disable no-nested-ternary */
import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
// import { alpha } from '@mui/material/styles';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import SatelliteIcon from '@mui/icons-material/Satellite';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import TodayIcon from '@mui/icons-material/Today';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import ManRoundedIcon from '@mui/icons-material/ManRounded';
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import WomanRoundedIcon from '@mui/icons-material/WomanRounded';
import QuestionMarkRoundedIcon from '@mui/icons-material/QuestionMarkRounded';
import LanguageIcon from '@mui/icons-material/Language';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import DarkModeIcon from '@mui/icons-material/DarkMode';

import { fDate } from 'src/utils/format-time';
import { fShortenNumber } from 'src/utils/format-number';

import Iconify from 'src/components/iconify';
import SvgColor from 'src/components/svg-color';

// ----------------------------------------------------------------------

export default function PostCard({ post }) {
  const { cover, data,humanWild,ar,maxDepth,idCodePhotographerName, reportReceivingDate, reportType,typeOfDive,userDescription,objectCode,objectGroup, diveSite, view, comment, share, author, createdAt, diveCode, imageLocation, age, gender, linkURL, media, loggedBy, logginDate,time } = post;

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
    <Link
      color="inherit"
      variant="subtitle2"
      underline="hover"
      sx={{
        height: 30,
        overflow: 'hidden',
        WebkitLineClamp: 2,
        display: '-webkit-box',
        WebkitBoxOrient: 'vertical',
      }}
    >
      <LocationOnIcon sx={{ mr: 0.5, fontSize: 13 }} />
      {diveSite}
    </Link>
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
        <WomanRoundedIcon sx={{fontSize: 20 }} />
      ) : (
        <QuestionMarkRoundedIcon sx={{fontSize: 20 }} />
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
  
  const renderData = (
    <Stack
      color="inherit"
      variant="subtitle2"
      underline="hover"
      sx={{
        height: 30,
        overflow: 'hidden',
        WebkitLineClamp: 2,
        display: '-webkit-box',
        WebkitBoxOrient: 'vertical',
      }}
    >
      {data}
    </Stack>
  );
  const renderBody = (
    <Stack>
        <Stack
        color="inherit"
        variant="subtitle2"
        underline="hover"
        sx={{
          height: 75,
          overflow: 'hidden',
          WebkitLineClamp: 2,
          display: '-webkit-box',
          WebkitBoxOrient: 'vertical',
        }}
      >
        {humanWild}
      </Stack>
      <Stack
      color="inherit"
      variant="subtitle2"
      underline="hover"
      sx={{
        height: 30,
        overflow: 'hidden',
        WebkitLineClamp: 2,
        display: '-webkit-box',
        WebkitBoxOrient: 'vertical',
      }}
    >
      {`Is artificaial reef? ${ar}`}
    </Stack>
    </Stack>
    
  );

  const renderInfo = (
    <Stack
      direction="row"
      flexWrap="wrap"
      spacing={1.5}
      justifyContent="flex-start" // Align items to the left
      sx={{
        mt: 3,
        color: 'text.disabled',
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
          <TodayIcon sx={{ mr: 0.5, fontSize: 13 }} />
          {createdAt}
        </Typography>
        <Stack direction="row" alignItems="center">
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
          color: 'text.disabled',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <SatelliteIcon sx={{ mr: 0.5, fontSize: 13 }} />
        {imageLocation}
      </Typography>
      <Typography
        variant="caption"
        component="div"
        sx={{
          color: 'text.disabled',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        {diveCode}
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
    <Grid xs={12} sm={6} md={3}>
      <Card>
        <Box
          sx={{
            position: 'relative',
            pt: 'calc(100% * 3 / 4)',
          }}
        >
          {renderShape}

          {renderAvatar}

          {renderCover}
        </Box>

        <Box
          sx={{
            p: (theme) => theme.spacing(4, 3, 3, 3),
          }}
        >
          {renderUpper}
         
          {renderDiveSite}
          {renderData}
          {renderBody}
          {renderUserInfo}
          {renderInfo}
        </Box>
      </Card>
    </Grid>
  );
}

PostCard.propTypes = {
  post: PropTypes.object.isRequired,
};
