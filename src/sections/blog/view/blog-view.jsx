import { faker } from '@faker-js/faker';
import React, { useState, useEffect, useCallback } from 'react';

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

import Iconify from 'src/components/iconify';

import PostCard from '../post-card';
import PostSort from '../post-sort';
import PostSearch from '../post-search';


// const POST_TITLES = [
//   'Whiteboard Templates By Industry Leaders',
//   'Tesla Cybertruck-inspired camper trailer for Tesla fans who can’t just wait for the truck!',
//   'Designify Agency Landing Page Design',
//   '✨What is Done is Done ✨',
//   'Fresh Prince',
//   'Six Socks Studio',
//   'vincenzo de cotiis’ crossing over showcases a research on contamination',
//   'Simple, Great Looking Animations in Your Project | Video Tutorial',
//   '40 Free Serif Fonts for Digital Designers',
//   'Examining the Evolution of the Typical Web Design Client',
//   'Katie Griffin loves making that homey art',
//   'The American Dream retold through mid-century railroad graphics',
//   'Illustration System Design',
//   'CarZio-Delivery Driver App SignIn/SignUp',
//   'How to create a client-serverless Jamstack app using Netlify, Gatsby and Fauna',
//   'Tylko Organise effortlessly -3D & Motion Design',
//   'RAYO ?? A expanded visual arts festival identity',
//   'Anthony Burrill and Wired mag’s Andrew Diprose discuss how they made January’s Change Everything cover',
//   'Inside the Mind of Samuel Day',
//   'Portfolio Review: Is This Portfolio Too Creative?',
//   'Akkers van Margraten',
//   'Gradient Ticket icon',
//   'Here’s a Dyson motorcycle concept that doesn’t ‘suck’!',
//   'How to Animate a SVG with border-image',
// ];

export default function BlogView() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    try {
      const response = await fetch('http://localhost:8000/api/dives');
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const responseData = await response.json();
      const { dives } = responseData.data;

      dives.sort((a, b) => new Date(b.logginDate) - new Date(a.logginDate));
      // console.log(dives);

      

      const fetchedPosts = [...Array(23)].map((_, index) => ({
        id: faker.string.uuid(),
        cover: `/assets/images/covers/cover_${index + 1}.jpg`,
        imageLocation: dives[index % dives.length]?.imageLocation || 'No image location',
        diveCode: `Dive Code:  ${dives[index % dives.length]?.diveCode || 'No dive code'}`,
        loggedBy: `Logged By:  ${dives[index % dives.length]?.loggedBy || 'unknown'}`,
        logginDate: `Loggin Date:  ${dives[index % dives.length]?.logginDate || 'unknown'}`,
        createdAt: dives[index % dives.length]?.date || "no date",
        age: `Age: ${dives[index % dives.length]?.ageOfDiver === 'NA' ? '-' : (dives[index % dives.length]?.ageOfDiver || 'Unknown')}`,
        time: dives[index % dives.length]?.time || 'No time',
        gender: dives[index % dives.length]?.sexOfDiver === 'NA' ? 'No Gender' : (dives[index % dives.length]?.sexOfDiver || 'No gender'),
        linkURL: dives[index % dives.length]?.linkURL || 'No Link',
        media: dives[index % dives.length]?.media || 'No media',
        view: faker.number.int(99999),
        comment: faker.number.int(99999),
        share: faker.number.int(99999),
        favorite: faker.number.int(99999),
        diveSite: dives[index % dives.length]?.diveSite || 'No site data',
        humanWild: (
          <span>
            <span style={{ textDecoration: 'underline' }}>Human wild life interaction:</span>{' '}
            {dives[index % dives.length]?.humanWildlifeInteraction || 'No information'}
          </span>
        ),
        data: (
          <span>
            <span style={{ textDecoration: 'underline' }}>Human wild life interaction:</span>{' '}
            {dives[index % dives.length]?.humanWildlifeInteraction || 'No information'}
          </span>
        ),
        // data: `is it AR ? ${dives[index % dives.length]?.diveSite || 'No site data'}`,
        author: {
          name: faker.person.fullName(),
          avatarUrl: `/assets/images/avatars/avatar_${index + 1}.jpg`,
        },
      }));

      setPosts(fetchedPosts);
      setLoading(false); // Data fetched successfully
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false); // Error occurred while fetching data
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">Blog</Typography>

        <Button variant="contained" color="inherit" startIcon={<Iconify icon="eva:plus-fill" />}>
          New Post
        </Button>
      </Stack>

      <Stack mb={5} direction="row" alignItems="center" justifyContent="space-between">
        <PostSearch posts={posts} />
        <PostSort
          options={[
            { value: 'latest', label: 'Latest' },
            { value: 'popular', label: 'Popular' },
            { value: 'oldest', label: 'Oldest' },
          ]}
        />
      </Stack>

      <Grid container spacing={3}>
        {posts.map((post, index) => (
          <PostCard key={post.id} post={post} index={index} />
        ))}
      </Grid>
    </Container>
  );
}
