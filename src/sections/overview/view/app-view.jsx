import React, { useState, useEffect } from 'react';

import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

import config from 'src/sections/configServer';

import AppCurrentVisits from '../app-current-visits';
import AppConversionRates from '../app-conversion-rates';

// ----------------------------------------------------------------------

export default function AppView() {
  const [allData, setAllData] = useState(null); // State to hold the fetched data
  const [isArReef, setIsArReef] = useState({
    yes: 0,
    no: 0,
  });
  const [gendger, setGender] = useState({
    male: 0,
    female: 0,
    na: 0,
  });

  const [topTenMostSpecies, setTopTenMostSpecies] = useState({
    specie1: {
      name: '',
      count: '',
    },
    specie2: {
      name: '',
      count: '',
    },
    specie3: {
      name: '',
      count: '',
    },
    specie4: {
      name: '',
      count: '',
    },
    specie5: {
      name: '',
      count: '',
    },
    specie6: {
      name: '',
      count: '',
    },
    specie7: {
      name: '',
      count: '',
    },
    specie8: {
      name: '',
      count: '',
    },
    specie9: {
      name: '',
      count: '',
    },
    specie10: {
      name: '',
      count: '',
    },
  });

  const [topMostSites, setTopMostSites] = useState({
    site1: {
      name: '',
      count: '',
      species: [],
    },
    site2: {
      name: '',
      count: '',
      species: [],
    },
    site3: {
      name: '',
      count: '',
      species: [],
    },
    site4: {
      name: '',
      count: '',
      species: [],
    },
    site5: {
      name: '',
      count: '',
      species: [],
    },
    site6: {
      name: '',
      count: '',
      species: [],
    },
    site7: {
      name: '',
      count: '',
      species: [],
    },
    site8: {
      name: '',
      count: '',
      species: [],
    },
    site9: {
      name: '',
      count: '',
      species: [],
    },
    site10: {
      name: '',
      count: '',
      species: [],
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${config.serverUrl}/api/dives`);

        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const responseData = await response.json();
        const { dives } = responseData.data;
        setAllData(dives);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Function to count occurrences of image locations and 'artificial reef'
  const countImageLocations = () => {
    if (!allData) return; // Ensure data is loaded before processing

    const imageLocationsCount = {};
    let artificialReefCount = 0;

    // Count occurrences of each image location
    allData.forEach((dive) => {
      // eslint-disable-next-line prefer-destructuring
      const imageLocation = dive.imageLocation;
      imageLocationsCount[imageLocation] = (imageLocationsCount[imageLocation] || 0) + 1;

      // Check if the dive is 'artificial reef'
      if (imageLocation === 'artificial reef') {
        // eslint-disable-next-line no-plusplus
        artificialReefCount += 1;
      }
    });

    setIsArReef((prevState) => ({
      ...prevState,
      yes: imageLocationsCount['Artificial Reef'],
      no:
        imageLocationsCount.Blue +
        imageLocationsCount['Coral reef'] +
        imageLocationsCount.NA +
        imageLocationsCount['Patched reef'] +
        imageLocationsCount['Sandy Buttom'] +
        imageLocationsCount['Sea Grass'],
    }));
  };


// Function to count occurrences of gender
const countGender = () => {
  if (!allData) return; // Ensure data is loaded before processing

  const femaleCounter = allData.filter(
    (dive) => typeof dive.sexOfDiver === 'string' && dive.sexOfDiver.toLowerCase() === 'female'
  ).length;

  const maleCounter = allData.filter(
    (dive) => typeof dive.sexOfDiver === 'string' && dive.sexOfDiver.toLowerCase() === 'male'
  ).length;

  const naCounter = allData.filter(
    (dive) => !dive.sexOfDiver || typeof dive.sexOfDiver !== 'string' || 
              (dive.sexOfDiver.toLowerCase() !== 'female' && dive.sexOfDiver.toLowerCase() !== 'male')
  ).length;

  setGender((prevState) => ({
    ...prevState,
    male: maleCounter,
    female: femaleCounter,
    na: naCounter,
  }));
};



  // Call the countImageLocations function when allData changes
  useEffect(() => {
    countImageLocations();
    countGender();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allData]);

  function getTopTwoSpecies(siteName) {
    if (!allData || !siteName) return []; // Ensure data and site name are provided

    const siteSpecies = [];

    allData.forEach((dive) => {
      if (
        dive.diveSite === siteName &&
        dive.specie !== undefined &&
        dive.specie !== '' &&
        dive.specie !== null
      ) {
        siteSpecies.push(dive.specie);
      }
    });

    // Filter out undefined values
    const siteSpecieswithoutNull = siteSpecies.filter((dive) => dive !== undefined);

    // Count occurrences of each species at the specified site
    const speciesCount = {};
    siteSpecieswithoutNull.forEach((species) => {
      speciesCount[species] = (speciesCount[species] || 0) + 1;
    });

    // Convert speciesCount to an array of objects
    const speciesArray = Object.entries(speciesCount);

    // Sort the speciesArray by count in descending order
    speciesArray.sort((a, b) => b[1] - a[1]);

    // Get the top two species
    const topTwoSpecies = speciesArray.slice(0, 2);

    return topTwoSpecies;
  }

  useEffect(() => {
    // Iterate over each site in the state
    getTopTwoSpecies('Almog Beach');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allData]);

  const topTenSpecies = () => {
    if (!allData) return; // Ensure data is loaded before processing
    const allSpecies = [];

    // Iterate over allData to count occurrences of each species
    allData.forEach((dive) => {
      allSpecies.push(dive.specie);
    });

    // Count occurrences of each species
    const speciesCount = {};
    allSpecies.forEach((specie) => {
      speciesCount[specie] = (speciesCount[specie] || 0) + 1;
    });

    // Convert speciesCount to an array of objects
    const speciesArray = Object.entries(speciesCount)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count); // Sort species by count in descending order

    // Get the top 10 most frequent species
    const tenSpecies = speciesArray.slice(0, 10);

    setTopTenMostSpecies((prevState) => {
      for (let i = 0; i < 10; i += 1) {
        prevState[`specie${i + 1}`] = tenSpecies[i] || { name: '', count: '' };
      }
      return { ...prevState };
    });
  };

  useEffect(() => {
    topTenSpecies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allData]);

  const topTenSites = () => {
    if (!allData) return; // Ensure data is loaded before processing
    const allSites = [];

    // Iterate over allData to count occurrences of each species
    allData.forEach((dive) => {
      allSites.push(dive.diveSite);
    });

    // Count occurrences of each species
    const sitesCount = {};
    allSites.forEach((site) => {
      sitesCount[site] = (sitesCount[site] || 0) + 1;
    });

    // Convert speciesCount to an array of objects
    const sitesArray = Object.entries(sitesCount)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count); // Sort species by count in descending order

    // Get the top 10 most frequent species
    const mostSites = sitesArray.slice(0, 11);

    setTopMostSites((prevState) => {
      for (let i = 0; i < 11; i += 1) {
        const site = mostSites[i];
        prevState[`site${i}`] = site
          ? {
              name: site.name,
              count: site.count,
              species: getTopTwoSpecies(site.name),
            }
          : { name: '', count: '', species: [] };
      }
    });
  };

  useEffect(() => {
    topTenSites();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allData]);

  return (
    <Container maxWidth="xl">
      <Typography variant="h4" sx={{ mb: 5 }}>
        Hi, Welcome 👋
      </Typography>

      <Grid container spacing={3}>
        <Grid xs={12} md={6} lg={4}>
          <AppCurrentVisits
            title="Amount of dives beside an artificial reef"
            sx={{
              // display: 'flex',
              // flexDirection: 'column',
              // justifyContent: 'stretch',
              height: '31.25em',
            }}
            chart={{
              series: [
                // object group
                { label: 'Artificial Reef', value: isArReef.yes },
                { label: 'Not Artificial Reef', value: isArReef.no },
              ],
            }}
          />
        </Grid>

        <Grid xs={12} md={6} lg={8}>
          <AppConversionRates
            title="Top frequency species:"
            subheader="top ten species"
            sx={{
              // display: 'flex',
              // flexDirection: 'column',
              // justifyContent: 'stretch',
              height: '31.25em',
            }}
            chart={{
              series: [
                { label: topTenMostSpecies.specie1.name, value: topTenMostSpecies.specie1.count },
                { label: topTenMostSpecies.specie2.name, value: topTenMostSpecies.specie2.count },
                { label: topTenMostSpecies.specie3.name, value: topTenMostSpecies.specie3.count },
                { label: topTenMostSpecies.specie4.name, value: topTenMostSpecies.specie4.count },
                { label: topTenMostSpecies.specie5.name, value: topTenMostSpecies.specie5.count },
                { label: topTenMostSpecies.specie6.name, value: topTenMostSpecies.specie6.count },
                { label: topTenMostSpecies.specie7.name, value: topTenMostSpecies.specie7.count },
                { label: topTenMostSpecies.specie8.name, value: topTenMostSpecies.specie8.count },
                { label: topTenMostSpecies.specie9.name, value: topTenMostSpecies.specie9.count },
                { label: topTenMostSpecies.specie10.name, value: topTenMostSpecies.specie10.count },
              ],
            }}
          />
        </Grid>

        <Grid xs={12} md={6} lg={4}>
          <AppCurrentVisits
            title="The dives are performed by:"
            sx={{
              // display: 'flex',
              // flexDirection: 'column',
              // justifyContent: 'stretch',
              height: '31.25em',
            }}
            chart={{
              series: [
                // object group
                { label: 'Females', value: gendger.female},
                { label: 'Males', value: gendger.male },
                { label: 'Undefined', value: gendger.na },
              ],

            }}
          />
        </Grid>
      </Grid>
    </Container>
  );
}
