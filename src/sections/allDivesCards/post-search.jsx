/* eslint-disable eqeqeq */
import { useState } from 'react';
import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabList from '@mui/lab/TabList';
import Stack from '@mui/material/Stack';
import TabPanel from '@mui/lab/TabPanel';
import Button from '@mui/material/Button';
import TabContext from '@mui/lab/TabContext';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';

import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

PostSearch.propTypes = {
  posts: PropTypes.array.isRequired,
  onFilter: PropTypes.func.isRequired,
  setSearchCount: PropTypes.func.isRequired,
};

export default function PostSearch({ posts, onFilter, setSearchCount }) {
  const [value, setValue] = useState('1');
  const [queries, setQueries] = useState({
    diveCode: '',
    diveSite: '',
    specie: '',
    objectGroup: '',
    loggedBy: '',
    logginDate: '',
    createdAt: '',
    age: '',
    time: '',
    gender: '',
    linkURL: '',
    media: '',
    reportReceivingDate: '',
    idCodePhotographerName: '',
    humanWild: '',
    ar: '',
    distance: '',
    maxDepth: '',
    temp: '',
    rankOfDive: '',
    userDescription: '',
    objectCode: '',
    reportType: '',
    typeOfDive: '',
    authorName: '',
  });

  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleInputChange = (field) => (event) => {
    const newQueries = { ...queries, [field]: event.target.value };
    setQueries(newQueries);

    const filteredPosts = posts.filter(post => {
    // console.log('post.temp:', post.temp);

      const isDiveCodeMatch = newQueries.diveCode ? post.diveCode.toLowerCase().includes(newQueries.diveCode.toLowerCase()) : true;
      const isDiveSiteMatch = newQueries.diveSite ? post.diveSite.toLowerCase().includes(newQueries.diveSite.toLowerCase()) : true;
      const isSpecieMatch = newQueries.specie ? post.specie.toLowerCase().includes(newQueries.specie.toLowerCase()) : true;
      const isObjectGroupMatch = newQueries.objectGroup ? post.objectGroup.toLowerCase().includes(newQueries.objectGroup.toLowerCase()) : true;
      const isLoggedByMatch = newQueries.loggedBy ? post.loggedBy.toLowerCase().includes(newQueries.loggedBy.toLowerCase()) : true;
      const isLogginDateMatch = newQueries.logginDate ? post.logginDate.toLowerCase().includes(newQueries.logginDate.toLowerCase()) : true;
      const isCreatedAtMatch = newQueries.createdAt ? post.createdAt.toLowerCase().includes(newQueries.createdAt.toLowerCase()) : true;
      const isAgeMatch = newQueries.age ? post.age.toLowerCase().includes(newQueries.age.toLowerCase()) : true;
      const isTimeMatch = newQueries.time ? post.time.toLowerCase().includes(newQueries.time.toLowerCase()) : true;
      const isGenderMatch = newQueries.gender ? post.gender.toLowerCase().includes(newQueries.gender.toLowerCase()) : true;
      const isLinkURLMatch = newQueries.linkURL ? post.linkURL.toLowerCase().includes(newQueries.linkURL.toLowerCase()) : true;
      const isMediaMatch = newQueries.media ? post.media.toLowerCase().includes(newQueries.media.toLowerCase()) : true;
      const isReportReceivingDateMatch = newQueries.reportReceivingDate ? post.reportReceivingDate.toLowerCase().includes(newQueries.reportReceivingDate.toLowerCase()) : true;
      const isIdCodePhotographerNameMatch = newQueries.idCodePhotographerName ? post.idCodePhotographerName.toLowerCase().includes(newQueries.idCodePhotographerName.toLowerCase()) : true;
      const isHumanWildMatch = newQueries.humanWild ? post.humanWild.toLowerCase().includes(newQueries.humanWild.toLowerCase()) : true;
      const isArMatch = newQueries.ar ? post.ar.toLowerCase().includes(newQueries.ar.toLowerCase()) : true;
      const isDistanceMatch = newQueries.distance ? post.distance == newQueries.distance : true;
      const isMaxDepthMatch = newQueries.maxDepth ? post.maxDepth == newQueries.maxDepth : true;
      const isTempMatch = newQueries.temp ? post.temp == newQueries.temp : true;
      const isRankOfDiveMatch = newQueries.rankOfDive ? post.rankOfDive == newQueries.rankOfDive : true;
      const isUserDescriptionMatch = newQueries.userDescription ? post.userDescription.toLowerCase().includes(newQueries.userDescription.toLowerCase()) : true;
      const isObjectCodeMatch = newQueries.objectCode ? post.objectCode.toLowerCase().includes(newQueries.objectCode.toLowerCase()) : true;
      const isReportTypeMatch = newQueries.reportType ? post.reportType.toLowerCase().includes(newQueries.reportType.toLowerCase()) : true;
      const isTypeOfDiveMatch = newQueries.typeOfDive ? post.typeOfDive.toLowerCase().includes(newQueries.typeOfDive.toLowerCase()) : true;
      const isAuthorNameMatch = newQueries.authorName ? post.author.name.toLowerCase().includes(newQueries.authorName.toLowerCase()) : true;

      return isDiveCodeMatch && isDiveSiteMatch && isSpecieMatch && isObjectGroupMatch &&
        isLoggedByMatch && isLogginDateMatch && isCreatedAtMatch && isAgeMatch &&
        isTimeMatch && isGenderMatch && isLinkURLMatch && isMediaMatch &&
        isReportReceivingDateMatch && isIdCodePhotographerNameMatch && isHumanWildMatch &&
        isArMatch && isDistanceMatch && isMaxDepthMatch && isTempMatch &&
        isRankOfDiveMatch && isUserDescriptionMatch && isObjectCodeMatch &&
        isReportTypeMatch && isTypeOfDiveMatch && isAuthorNameMatch;
    });

    onFilter(filteredPosts);
    setSearchCount(filteredPosts.length);
  };

   const handleClearAll = () => {
    setQueries({
      diveCode: '',
      diveSite: '',
      specie: '',
      objectGroup: '',
      loggedBy: '',
      logginDate: '',
      createdAt: '',
      age: '',
      time: '',
      gender: '',
      linkURL: '',
      media: '',
      reportReceivingDate: '',
      idCodePhotographerName: '',
      humanWild: '',
      ar: '',
      distance: '',
      maxDepth: '',
      temp: '',
      rankOfDive: '',
      userDescription: '',
      objectCode: '',
      reportType: '',
      typeOfDive: '',
      authorName: '',
    });

    onFilter(posts);
    setSearchCount(posts.length);
  };


  return (
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider', overflowX: 'auto' }}>
          <TabList onChange={handleTabChange} aria-label="search tabs" scrollButtons="auto" variant="scrollable">
            <Tab label="Dive Code" value="1" />
            <Tab label="Dive Site" value="2" />
            <Tab label="Specie" value="3" />
            <Tab label="Object Group" value="4" />
            <Tab label="Logged By" value="5" />
            <Tab label="Loggin Date" value="6" />
            <Tab label="Created At" value="7" />
            <Tab label="Age" value="8" />
            <Tab label="Time" value="9" />
            <Tab label="Gender" value="10" />
            <Tab label="Link URL" value="11" />
            <Tab label="Media" value="12" />
            <Tab label="Report Receiving Date" value="13" />
            <Tab label="Photographer Name" value="14" />
            <Tab label="Human Wild" value="15" />
            <Tab label="AR" value="16" />
            <Tab label="Distance" value="17" />
            <Tab label="Max Depth" value="18" />
            <Tab label="Temp" value="19" />
            <Tab label="Rank Of Dive" value="20" />
            <Tab label="User Description" value="21" />
            <Tab label="Object Code" value="22" />
            <Tab label="Report Type" value="23" />
            <Tab label="Type Of Dive" value="24" />
            <Tab label="Author Name" value="25" />
          </TabList>
        </Box>
        <Stack direction="row" alignItems="center" spacing={2} mt={2}>
          <Box sx={{ flexGrow: 1 }}>
            {Object.keys(queries).map((field, index) => (
              <TabPanel key={field} value={(index + 1).toString()} sx={{ p: 0 }}>
                <TextField
                  label={field.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                  value={queries[field]}
                  onChange={handleInputChange(field)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Iconify
                          icon="eva:search-fill"
                          sx={{ ml: 1, width: 20, height: 20, color: 'text.disabled' }}
                        />
                      </InputAdornment>
                    ),
                  }}
                />
              </TabPanel>
            ))}
          </Box>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleClearAll}
            size="small"
            sx={{
              height: 'fit-content',
              alignSelf: 'flex-start',
              mt: 1.5, // Adjust margin to align vertically with the TextField
            }}
          >
            Clear All
          </Button>
        </Stack>


      </TabContext>
      
    </Box>
  );
}
