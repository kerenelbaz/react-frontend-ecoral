import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect, useCallback } from 'react';

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import Pagination from '@mui/material/Pagination';

import { useView } from 'src/viewContexts';

import Iconify from 'src/components/iconify';

import config from 'src/sections/configServer';

import PostCard from '../post-card';
import PostSort from '../post-sort';
import PostSearch from '../post-search';

export default function AllDivesCardsView() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(12);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [searchCount, setSearchCount] = useState(0);
  const { switchToTable } = useView();
  const navigate = useNavigate();
 
  const fetchData = useCallback(async () => {
    try {
      const response = await fetch(`${config.serverUrl}/api/dives`);
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const responseData = await response.json();
      const { dives } = responseData.data;

      dives.sort((a, b) => new Date(b.logginDate) - new Date(a.logginDate));

      const fetchedPosts = dives.map((dive, index) => ({
          id: dive._id,
          cover: `/assets/images/covers/cover_${(index % 24) + 1}.jpg`,
          fileLink: dive.fileLink,
          imageLocation: dive.imageLocation || '-',
          diveCode: `${dive.diveCode || '-'}`,
          loggedBy: `${dive.loggedBy || '-'}`,
          loggingDate: dive.loggingDate,
          date: dive.date,
          ageOfDiver: `${dive.ageOfDiver === 'NA' ? '-' : dive.ageOfDiver || '-'}`,
          time: dive.time || 'No time',
          sexOfDiver: dive.sexOfDiver === 'NA' ? 'No Gender' : dive.sexOfDiver || '-',
          linkURL: dive.linkURL || '-',
          media: dive.media || '-',
          researcherComment: dive.researcherComment,
          reportReceivingDate: dive.reportReceivingDate
            ? format(new Date(dive.reportReceivingDate), 'dd MMM yyyy')
            : '-',
          idCode_photographerName: dive.idCode_photographerName || '',
          diveSite: dive.diveSite || '-',
          specie: dive.specie || '-',
          humanWildlifeInteraction: dive.humanWildlifeInteraction || '-',
          AR: dive.AR || '-',
          distance: dive.distance || '-',
          maxDepth: dive.maxDepth || '-',
          temp: dive.temp || '-',
          rankOfDive: dive.rankOfDive || '',
          userDescription: dive.userDescription || '-',
          objectGroup: dive.objectGroup || '-',
          objectCode: dive.objectCode || '-',
          reportType: dive.reportType || '-',
          typeOfDive: dive.typeOfDive || '-',
          author: {
            avatarUrl: `/assets/images/avatars/avatar_${(index % 25) + 1}.jpg`,
          },
        }));

      setPosts(fetchedPosts);
      setFilteredPosts(fetchedPosts); // Initialize filtered posts
      setSearchCount(fetchedPosts.length); // Initialize search count
      setLoading(false); // Data fetched successfully
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false); // Error occurred while fetching data
    }
  }, []);



  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
  }, [posts]);


  const deleteFromCloudinary = async (imageUrl) => {
    try {
      // Extract the public ID from the URL
      const publicId = imageUrl.split('/').pop().split('.')[0];

      // Create the request body as a JSON-like string
      const requestBody = `{"publicId": "${publicId}"}`;

      // Make a request to your server to delete the image from Cloudinary
      const response = await fetch(`${config.serverUrl}/api/dives/delete-image`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: requestBody,
      });

      // Check if the response is OK (status 200-299)
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const result = await response.json();

      if (result.result === 'ok') {
        console.log('Image deleted from Cloudinary:', publicId);
      } 
      else {
        console.error('Failed to delete image from Cloudinary:', result.message);
      }
    } catch (error) {
      console.error('Error sending delete request to server:', error);
    }
  };

  const handleDeleteClick = async (postId, fileLink) => {
    try {
      // Make a request to your server to delete the row
      const response = await fetch(`${config.serverUrl}/api/dives/${postId}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete dive');
      }
      setPosts((prevData) => prevData.filter((row) => row.id !== postId));
      setFilteredPosts((prevData) => prevData.filter((row) => row.id !== postId));
      setSearchCount((prevCount) => prevCount - 1);

      // Delete from Cloudinary
      if (fileLink) {
        await deleteFromCloudinary(fileLink);
      }
    } catch (error) {
      console.error('Error deleting dive:', error);
    }
  };

  const handleUpdatePost = (updatedPost) => {
    setPosts(prevPosts => {
      const updatedPosts = prevPosts.map(p => 
        p.id === updatedPost.id ? { ...p, ...updatedPost } : p
      );
      console.log("Updated posts array:", updatedPosts);
      return updatedPosts;
    });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  const indexOfLastPost = currentPage * itemsPerPage;
  const indexOfFirstPost = indexOfLastPost - itemsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const handleItemsPerPageChange = (event) => {
    setItemsPerPage(parseInt(event.target.value, 10));
    setCurrentPage(1); // Reset to first page
  };

  const handleSort = (event) => {
    const sortBy = event.target.value;

    const validPosts = posts.filter((post) => !Number.isNaN(Date.parse(post.loggingDate)));
    const invalidPosts = posts.filter((post) => Number.isNaN(Date.parse(post.loggingDate)));

    const sortedValidPosts = validPosts.sort((a, b) => {
      const dateA = new Date(a.loggingDate);
      const dateB = new Date(b.loggingDate);

      if (sortBy === 'latest') {
        return dateB - dateA;
      }
      if (sortBy === 'oldest') {
        return dateA - dateB;
      }
      return 0;
    });

    const sortedPosts = [...sortedValidPosts, ...invalidPosts];

    setPosts(sortedPosts);
    setFilteredPosts(sortedPosts); // Ensure filtered posts are also sorted
  };

  const handleNewDive = () => {
    window.open('/insert-data', '_blank');
  };

  const handleSwitchToTable = () => {
    switchToTable();
    navigate('/all-dives');
  };


  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Typography variant="h4">All Dives</Typography>
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="flex-end" spacing={2}>
        <PostSort
          options={[
            { value: 'sort', label: 'Sort' },
            { value: 'latest', label: 'Latest' },
            { value: 'oldest', label: 'Oldest' },
          ]}
          onSort={handleSort}
        />
        <Button
          variant="contained"
          color="inherit"
          startIcon={<Iconify icon="eva:plus-fill" />}
          onClick={handleNewDive}
        >
          Add Dive
        </Button>
        <Button
          variant="contained"
          color="inherit"
          startIcon={<Iconify icon="mdi:table" />}
          onClick={handleSwitchToTable}
        >
          As Table
        </Button>
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <PostSearch posts={posts} onFilter={setFilteredPosts} setSearchCount={setSearchCount} />
      </Stack>

      <Stack mb={5} direction="row" alignItems="center" justifyContent="center">
        <Typography variant="h6">{searchCount} dives found</Typography>
      </Stack>

      <Grid container spacing={3}>
        {currentPosts.map((post, index) => (
          <PostCard
            key={post.id}
            post={{...post}}
            index={index}
            onDelete={() => handleDeleteClick(post.id, post.fileLink)}
            onEdit={handleUpdatePost} />

        ))}
      </Grid>

      <Stack direction="row" alignItems="center" justifyContent="space-between" mt={5}>
        <Typography variant="body2">
          Items per page:
          <select value={itemsPerPage} onChange={handleItemsPerPageChange}>
            <option value={12}>12</option>
            <option value={24}>24</option>
            <option value={40}>40</option>
          </select>
        </Typography>

        <Pagination
          count={Math.ceil(filteredPosts.length / itemsPerPage)}
          page={currentPage}
          onChange={handlePageChange}
          color="primary"
        />
      </Stack>
    </Container>
  );
}
