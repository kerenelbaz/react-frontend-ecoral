// import { faker } from '@faker-js/faker';
import { useNavigate } from 'react-router-dom';
import { parse, format, parseISO } from 'date-fns';
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

import EditData from './handle-edit-data';
// import EditData from 'src/sections/pendingAdmin/view/handle-edit-data';

import PostCard from '../post-card';
import PostSort from '../post-sort';
// import { object } from 'prop-types';
// import PostSearch from '../post-search';

export default function PendingDivesCardsView() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(12);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [searchCount, setSearchCount] = useState(0);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editPostData, setEditPostData] = useState(null);
  const { switchToTable } = useView();
  const navigate = useNavigate();

  const fetchData = useCallback(async () => {
    try {
      const response = await fetch(`${config.serverUrl}/api/pendings_Dives`);
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const responseData = await response.json();
      const { pendingDives } = responseData.data;

      pendingDives.sort((a, b) => new Date(b.logginDate) - new Date(a.logginDate));

      const fetchedPosts = pendingDives.map((dive, index) => {
        let createdAt = dive.date || new Date().toISOString(); // Set to current date if missing

        // Ensure valid date
        if (Number.isNaN(Date.parse(createdAt))) {
          createdAt = new Date().toISOString();
        }

        let formattedCreatedAt;
        try {
          if (createdAt.includes('-')) {
            formattedCreatedAt = format(parseISO(createdAt), 'dd/MM/yyyy');
          } else {
            formattedCreatedAt = format(parse(createdAt, 'dd/MM/yyyy', new Date()), 'dd/MM/yyyy');
          }
        } catch (error) {
          console.error('Error formatting date:', createdAt, error);
          formattedCreatedAt = 'Invalid date';
        }

        return {
          id: dive._id,
          file: dive.file,
          // dateDive: dive.date,
          cover: `/assets/images/covers/cover_${(index % 24) + 1}.jpg`,
          imageLocation: dive.imageLocation || 'No image location',
          loggingDate: dive.loggingDate
            ? format(new Date(dive.loggingDate), 'dd MMM yyyy')
            : 'none',
          date: dive.date,
          ageOfDiver: dive.ageOfDiver || "",
          time: dive.time || 'No time',
          sexOfDiver: dive.sexOfDiver,
          linkURL: dive.linkURL || 'No Link',
          media: dive.media || 'No media',
          idCodePhotographerName: dive.idCode_photographerName || '',
          diveSite: dive.diveSite || 'No site data',
          specie: dive.specie || 'No Specie',
          ar: dive.AR || '',
          distance: dive.distance || 'None',
          maxDepth: dive.maxDepth || 'no depth',
          temp: dive.temp || '-',
          rankOfDive: dive.rankOfDive || '-',
          userDescription: dive.userDescription || '-',
          objectGroup: dive.objectGroup || '-',
          reportType: dive.reportType || '-',
          typeOfDive: dive.typeOfDive || '-',
          author: {
            // name: faker.person.fullName(),
            avatarUrl: `/assets/images/avatars/avatar_${(index % 25) + 1}.jpg`,
          },
        };
      });

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

  const handleDeleteClick = async (postId) => {
    console.log('Pending data received for deletion:', postId);
    try {
      // Make a request to your server to delete the row
      const response = await fetch(`${config.serverUrl}/api/pendings_Dives/${postId}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete dive');
      }
      setPosts((prevData) => prevData.filter((row) => row.id !== postId));
      setFilteredPosts((prevData) => prevData.filter((row) => row.id !== postId));
      setSearchCount((prevCount) => prevCount - 1);
    } catch (error) {
      console.error('Error deleting dive:', error);
    }
  };

  const handleEditClick = (post) => {
    setEditPostData(post);
    setEditDialogOpen(true);
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

  // const handleNewDive = () => {
  //   window.open('/insert-data', '_blank');
  // };

  // const handleAllDiveTable = () => {
  //   window.open('/all-data', '_blank');
  // }
  const handleSwitchToTable = () => {
    switchToTable();
    navigate('/pending-dives');
  };

  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Typography variant="h4">{`Pending Dives For Admin's Approval`}</Typography>
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
        {/* <Button
          variant="contained"
          color="inherit"
          startIcon={<Iconify icon="eva:plus-fill" />}
          onClick={handleNewDive}
        >
          Add Dive
        </Button> */}
        <Button
          variant="contained"
          color="inherit"
          startIcon={<Iconify icon="mdi:table" />}
          onClick={handleSwitchToTable}
        >
          As Table
        </Button>
      </Stack>

      {/* <Stack direction="row" alignItems="center" justifyContent="space-between">
        <PostSearch posts={posts} onFilter={setFilteredPosts} setSearchCount={setSearchCount} />
      </Stack> */}

      <Stack mb={5} direction="row" alignItems="center" justifyContent="center">
        <Typography variant="h6">{searchCount} posts found</Typography>
      </Stack>

      <Grid container spacing={3}>
        {currentPosts.map((post, index) => (
          <PostCard
            key={post.id}
            post={post}
            index={index}
            onDelete={handleDeleteClick}
            onEdit={handleEditClick}
          />
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

      {editPostData && (
        <EditData
          open={editDialogOpen}
          handleClose={() => setEditDialogOpen(false)}
          pendingData={editPostData}
          onDeleteClick={handleDeleteClick}
        />
      )}
    </Container>
  );
}
