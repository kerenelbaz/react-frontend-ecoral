/* eslint-disable no-unused-vars */
/* eslint-disable no-useless-return */
// import { faker } from '@faker-js/faker';
import React, { useState, useEffect } from 'react';

import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
// import Autocomplete from '@mui/material/Autocomplete';

// import Iconify from 'src/components/iconify';

// import AppTasks from '../app-tasks';
// import AppNewsUpdate from '../app-news-update';
// import AppOrderTimeline from '../app-order-timeline';
import config from 'src/sections/configServer';

import AppCurrentVisits from '../app-current-visits';
// import AppWebsiteVisits from '../app-website-visits';
// import AppWidgetSummary from '../app-widget-summary';
// import AppTrafficBySite from '../app-traffic-by-site';

// import AppCurrentSubject from '../app-current-subject';
import AppConversionRates from '../app-conversion-rates';

// ----------------------------------------------------------------------

export default function AppView() {
  const [allData, setAllData] = useState(null); // State to hold the fetched data
  const [isArReef, setIsArReef] = useState({
    yes:0,
    no:0,
  }); 

  const [topTenMostSpecies, setTopTenMostSpecies] = useState({
    specie1:{
      name: '',
      count: '',
    },
    specie2:{
      name: '',
      count: '',
    },
    specie3:{
      name: '',
      count: '',
    },
    specie4:{
      name: '',
      count: '',
    },
    specie5:{
      name: '',
      count: '',
    }, 
    specie6:{
      name: '',
      count: '',
    },
    specie7:{
      name: '',
      count: '',
    }, 
    specie8:{
      name: '',
      count: '',
    }, 
    specie9:{
      name: '',
      count: '',
    }, 
    specie10:{
      name: '',
      count: '',
    },
  })

  const [topMostSites, setTopMostSites] = useState({
    site1:{
      name: '',
      count: '',
      species:[],
    },
    site2:{
      name: '',
      count: '',
      species:[],
    },
    site3:{
      name: '',
      count: '',
      species:[],
    },
    site4:{
      name: '',
      count: '',
      species:[],
    },
    site5:{
      name: '',
      count: '',
      species:[],
    }, 
    site6:{
      name: '',
      count: '',
      species:[],
    },
    site7:{
      name: '',
      count: '',
      species:[],
    }, 
    site8:{
      name: '',
      count: '',
      species:[],
    }, 
    site9:{
      name: '',
      count: '',
      species:[],
    }, 
    site10:{
      name: '',
      count: '',
      species:[],
    },
  })

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${config.serverUrl}/api/dives`);
        
        console.log("fff");
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
    allData.forEach(dive => {
      // eslint-disable-next-line prefer-destructuring
      const imageLocation = dive.imageLocation;
      imageLocationsCount[imageLocation] = (imageLocationsCount[imageLocation] || 0) + 1;

      // Check if the dive is 'artificial reef'
      if (imageLocation === 'artificial reef') {
        // eslint-disable-next-line no-plusplus
        artificialReefCount+= 1;;
      }
    });
    // console.log(imageLocationsCount['Artificial Reef']);
    // // Log counts
    // console.log('Image Locations Count:', imageLocationsCount);
    // console.log('Artificial Reef Count:', artificialReefCount);

    setIsArReef(prevState => ({
      ...prevState, 
      yes: imageLocationsCount['Artificial Reef'] , 
      no: (imageLocationsCount.Blue+imageLocationsCount['Coral reef']+imageLocationsCount.NA+imageLocationsCount['Patched reef']+imageLocationsCount['Sandy Buttom']+imageLocationsCount['Sea Grass'])
    }));

  };

  // Call the countImageLocations function when allData changes
  useEffect(() => {
    countImageLocations();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allData]);


  function getTopTwoSpecies(siteName) {
    if (!allData || !siteName) return []; // Ensure data and site name are provided
  
    const siteSpecies = [];

    allData.forEach(dive => {
        if (dive.diveSite === siteName && dive.specie !== "undefined"  && dive.specie !== "" && dive.specie !== null) {
          siteSpecies.push(dive.specie);
        }
    });

    // Filter out undefined values
    const siteSpecieswithoutNull = siteSpecies.filter(dive => dive !== undefined);

    // Count occurrences of each species at the specified site
    const speciesCount = {};
    siteSpecieswithoutNull.forEach(species => {
        speciesCount[species] = (speciesCount[species] || 0) + 1;
    });

  
    // Convert speciesCount to an array of objects
    const speciesArray = Object.entries(speciesCount);

    // Sort the speciesArray by count in descending order
    speciesArray.sort((a, b) => b[1] - a[1]);

    // Get the top two species
    const topTwoSpecies = speciesArray.slice(0, 2);

    return topTwoSpecies
  }

  useEffect(() => {
    // Iterate over each site in the state
    getTopTwoSpecies("Almog Beach");
// eslint-disable-next-line react-hooks/exhaustive-deps
}, [allData]);


  const topTenSpecies = () => {
    if (!allData) return; // Ensure data is loaded before processing
    const allSpecies = [];
  
    // Iterate over allData to count occurrences of each species
    allData.forEach(dive => {
      // console.log("spec",dive.specie)
      allSpecies.push(dive.specie); 
      // console.log("the one to push", dive.specie);
    });
    
    // Count occurrences of each species
    const speciesCount = {};
    allSpecies.forEach(specie => {
      speciesCount[specie] = (speciesCount[specie] || 0) + 1;
    });
  
    // Convert speciesCount to an array of objects
    const speciesArray = Object.entries(speciesCount)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count); // Sort species by count in descending order
  
    // Get the top 10 most frequent species
    const tenSpecies = speciesArray.slice(0, 10);

    setTopTenMostSpecies(prevState => {
      for (let i = 0; i < 10; i+=1) {
        prevState[`specie${i + 1}`] = tenSpecies[i] || { name: '', count: '' };
      }
      return { ...prevState };
    });

  }
  
  useEffect(() => {
    topTenSpecies();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allData]);

  const topTenSites = () => {
    if (!allData) return; // Ensure data is loaded before processing
    const allSites = [];
  
    // Iterate over allData to count occurrences of each species
    allData.forEach(dive => {
      allSites.push(dive.diveSite); 
    });

    // Count occurrences of each species
    const sitesCount = {};
    allSites.forEach(site => {
      sitesCount[site] = (sitesCount[site] || 0) + 1;
    });

    // Convert speciesCount to an array of objects
    const sitesArray = Object.entries(sitesCount)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count); // Sort species by count in descending order


    // Get the top 10 most frequent species
    const mostSites = sitesArray.slice(0, 11);

    setTopMostSites(prevState => {
      for (let i = 0; i < 11; i+=1) {
        const site = mostSites[i];
        prevState[`site${i}`] = site ? {
            name: site.name,
            count: site.count,
            species: getTopTwoSpecies(site.name)
        } : { name: '', count: '', species: [] };
    }
    });

    // console.log('Most Frequent sites:', topMostSites)
    // console.log(' sites:', topMostSites[0])

  }
  
  
  useEffect(() => {
    topTenSites();


  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allData]);
  


 


  return (
    <Container maxWidth="xl">
      <Typography variant="h4" sx={{ mb: 5 }}>
        Hi, Welcome back 👋
      </Typography>
      {/* <Autocomplete
      disablePortal
      id="combo-box-demo"

      sx={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label="Movie" />}
    /> */}

      <Grid container spacing={3}>
        {/* <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="Weekly Sales"
            total={714000}
            color="success"
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_bag.png" />}
          />
        </Grid> */}
       

        {/* <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="New Users"
            total={1352831}
            color="info"
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_users.png" />}
          />
        </Grid> */}

        {/* <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="Item Orders"
            total={1723315}
            color="warning"
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_buy.png" />}
          />
        </Grid> */}

        {/* <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="Bug Reports"
            total={234}
            color="error"
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_message.png" />}
          />
        </Grid> */}
        {/* <Grid xs={12} md={6} lg={8}>
          <AppConversionRates
            title="Top frequency species"
            subheader="top ten species"
            chart={{
              series: [
                { label: topMostSites.specie1.name, 
                  value: topTenMostSpecies.specie1.count },
                { label: topTenMostSpecies.specie2.name, 
                  value: topTenMostSpecies.specie2.count },
                { label: topTenMostSpecies.specie3.name, 
                  value: topTenMostSpecies.specie3.count },
                { label: topTenMostSpecies.specie4.name, 
                  value: topTenMostSpecies.specie4.count },
                { label: topTenMostSpecies.specie5.name, 
                  value: topTenMostSpecies.specie5.count },
                { label: topTenMostSpecies.specie6.name, 
                  value: topTenMostSpecies.specie6.count },
                { label: topTenMostSpecies.specie7.name, 
                  value: topTenMostSpecies.specie7.count },
                { label: topTenMostSpecies.specie8.name, 
                  value: topTenMostSpecies.specie8.count },
                { label: topTenMostSpecies.specie9.name, 
                  value: topTenMostSpecies.specie9.count },
                { label: topTenMostSpecies.specie10.name, 
                  value: topTenMostSpecies.specie10.count },
                  
              ],
            }}
          />
        </Grid> */}

        {/* <Grid xs={12} md={6} lg={8}>
          <AppWebsiteVisits
            title="Website Visits"
            subheader="(+43%) than last year"
            chart={{
              labels: [
                '01/01/2003',
                '02/01/2003',
                '03/01/2003',
                // '04/01/2003',
                // '05/01/2003',
                // '06/01/2003',
                // '07/01/2003',
                // '08/01/2003',
                // '09/01/2003',
                // '10/01/2003',
                // '11/01/2003',
              ],
              // series: [
              //   {
              //     name: 'Team A',
              //     type: 'column',
              //     fill: 'solid',
              //     data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30],
              //   },
              //   {
              //     name: 'Team B',
              //     type: 'area',
              //     fill: 'gradient',
              //     data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43],
              //   },
              //   {
              //     name: 'Team C',
              //     type: 'line',
              //     fill: 'solid',
              //     data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39],
              //   },
              // ],
              series: [
                {
                  name: 'Team A',
                  type: 'column',
                  fill: 'solid',
                  data: [23, 11, 22 ],
                },
                {
                  name: 'Team B',
                  type: 'area',
                  fill: 'gradient',
                  data: [44, 55, 41],
                },
                // {
                //   name: 'Team C',
                //   type: 'line',
                //   fill: 'solid',
                //   data: [30, 25, 36],
                // },
              ],
            }}
          />
        </Grid> */}
{/* ----------------------------------------------------pai */}
  
       
      

        <Grid xs={12} md={6} lg={4}>

          <AppCurrentVisits
            title="Data by image location"
            chart={{
              series: [ 
                // object group
                { label: 'Artifical Reef', value: isArReef.yes },
                { label: 'Not Artificial Reef', value: isArReef.no },
              ],
            }}
          />
        </Grid>
    
      

        <Grid xs={12} md={6} lg={8}>
          <AppConversionRates
            title="Top frequency species"
            subheader="top ten species"
            chart={{
              series: [
                { label: topTenMostSpecies.specie1.name, 
                  value: topTenMostSpecies.specie1.count },
                { label: topTenMostSpecies.specie2.name, 
                  value: topTenMostSpecies.specie2.count },
                { label: topTenMostSpecies.specie3.name, 
                  value: topTenMostSpecies.specie3.count },
                { label: topTenMostSpecies.specie4.name, 
                  value: topTenMostSpecies.specie4.count },
                { label: topTenMostSpecies.specie5.name, 
                  value: topTenMostSpecies.specie5.count },
                { label: topTenMostSpecies.specie6.name, 
                  value: topTenMostSpecies.specie6.count },
                { label: topTenMostSpecies.specie7.name, 
                  value: topTenMostSpecies.specie7.count },
                { label: topTenMostSpecies.specie8.name, 
                  value: topTenMostSpecies.specie8.count },
                { label: topTenMostSpecies.specie9.name, 
                  value: topTenMostSpecies.specie9.count },
                { label: topTenMostSpecies.specie10.name, 
                  value: topTenMostSpecies.specie10.count },
                  
              ],
            }}
          />
        </Grid>

        {/* <Grid xs={12} md={6} lg={4}>
          <AppCurrentSubject
            title="Current Subject"
            chart={{
              categories: ['English', 'History', 'Physics', 'Geography', 'Chinese', 'Math'],
              series: [
                { name: 'Series 1', data: [80, 50, 30, 40, 100, 20] },
                { name: 'Series 2', data: [20, 30, 40, 80, 20, 80] },
                { name: 'Series 3', data: [44, 76, 78, 13, 43, 10] },
              ],
            }}
          />
        </Grid> */}

        {/* <Grid xs={12} md={6} lg={8}>
          <AppNewsUpdate
            title="News Update"
            list={[...Array(5)].map((_, index) => ({
              id: faker.string.uuid(),
              title: faker.person.jobTitle(),
              description: faker.commerce.productDescription(),
              image: `/assets/images/covers/cover_${index + 1}.jpg`,
              postedAt: faker.date.recent(),
            }))}
          />
        </Grid> */}

        {/* <Grid xs={12} md={6} lg={4}>
          <AppOrderTimeline
            title="Order Timeline"
            list={[...Array(5)].map((_, index) => ({
              id: faker.string.uuid(),
              title: [
                '1983, orders, $4220',
                '12 Invoices have been paid',
                'Order #37745 from September',
                'New order placed #XF-2356',
                'New order placed #XF-2346',
              ][index],
              type: `order${index + 1}`,
              time: faker.date.past(),
            }))}
          />
        </Grid> */}

        {/* <Grid xs={12} md={6} lg={4}>
          <AppTrafficBySite
            title="Traffic by Site"
            list={[
              {
                name: 'FaceBook',
                value: 323234,
                icon: <Iconify icon="eva:facebook-fill" color="#1877F2" width={32} />,
              },
              {
                name: 'Google',
                value: 341212,
                icon: <Iconify icon="eva:google-fill" color="#DF3E30" width={32} />,
              },
              {
                name: 'Linkedin',
                value: 411213,
                icon: <Iconify icon="eva:linkedin-fill" color="#006097" width={32} />,
              },
              {
                name: 'Twitter',
                value: 443232,
                icon: <Iconify icon="eva:twitter-fill" color="#1C9CEA" width={32} />,
              },
            ]}
          />
        </Grid> */}

        {/* <Grid xs={12} md={6} lg={8}>
          <AppTasks
            title="Tasks"
            list={[
              { id: '1', name: 'Create FireStone Logo' },
              { id: '2', name: 'Add SCSS and JS files if required' },
              { id: '3', name: 'Stakeholder Meeting' },
              { id: '4', name: 'Scoping & Estimations' },
              { id: '5', name: 'Sprint Showcase' },
            ]}
          />
        </Grid> */}
      </Grid>
    </Container>
  );
}
