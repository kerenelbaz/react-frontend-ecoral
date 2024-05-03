import { useState, useEffect } from 'react';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import TableBody from '@mui/material/TableBody';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';

// import { users } from 'src/_mock/user';


import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';

import AllDataTableRow from '../allData-table-row';
import TableNoData from '../allData-table-no-data';
import AllDataTableHead from '../allData-table-head';
import TableEmptyRows from '../allData-table-empty-rows';
import AllDataTableTollbar from '../allData-table-toolbar';
import { emptyRows, applyFilter, getComparator } from '../utils';



// ----------------------------------------------------------------------


export default function AllDataView() {
  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [allDataDives, setAllDataDives] = useState([]);
  const [loading, setLoading] = useState(true); // Define loading state


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/dives');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const responseData = await response.json();
        console.log(responseData.data);
        const { dives } = responseData.data;
        setAllDataDives(dives);
        console.log("inside useEffect the allDataDives is:", allDataDives)
        setLoading(false); // Data fetched successfully
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false); // Error occurred while fetching data
      }
    };

    fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); 

  if (loading) {
    return <div>Loading...</div>; // Render loading indicator while data is being fetched
  }

  if (!allDataDives || allDataDives.length === 0) {
    console.log("allDataDives:", allDataDives);
    return <div>No data available</div>; // Render message if data is empty
  }


  const handleSort = (event, id) => {
    const isAsc = orderBy === id && order === 'asc';
    if (id !== '') {
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(id);
    }
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = allDataDives.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleFilterByName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const dataFiltered = applyFilter({
    inputData: allDataDives,
    comparator: getComparator(order, orderBy),
    filterName,
  });

  // eslint-disable-next-line no-unused-vars
  const formatDateTime = (dateTimeString) => {
    const dateTime = new Date(dateTimeString);

    // Format the date
    const dateFormatter = new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: '2-digit',
    });
    const formattedDate = dateFormatter.format(dateTime);

    // Format the time
    const timeFormatter = new Intl.DateTimeFormat('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
    const formattedTime = timeFormatter.format(dateTime);

    // Combine date and time
    return `${formattedDate}, ${formattedTime}`;
  };


  const notFound = !dataFiltered.length && !!filterName;

  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">All Dives Data</Typography>

        <Button variant="contained" color="inherit" startIcon={<Iconify icon="eva:plus-fill" />}>
          New User
        </Button>
      </Stack>

      <Card>
        <AllDataTableTollbar
          numSelected={selected.length}
          filterName={filterName}
          onFilterName={handleFilterByName}
        />

        <Scrollbar>
          <TableContainer sx={{ overflow: 'unset', maxWidth: 2500 }}>
            <Table sx={{ minWidth: 800, width: '100%' }}>
              <AllDataTableHead
                order={order}
                orderBy={orderBy}
                rowCount={allDataDives.length}
                numSelected={selected.length}
                onRequestSort={handleSort}
                onSelectAllClick={handleSelectAllClick}
                headLabel={[
                  { id: 'diveCode', label: 'Dive Code' },
                  { id: 'objectGroup', label: 'Object Group', align: 'center' },
                  // { id: 'diveDate', label: 'Dive Date' },
                  { id: 'time', label: 'Time' },
                  { id: 'diveSite', label: 'Dive Site' },
                  { id: 'groupCode', label: 'Group Code' },
                  { id: 'specie', label: 'specie' },
                  { id: 'idCode', label: 'ID Code' },
                  { id: 'Location', label: 'location' },
                  { id: 'ar', label: 'Is AR?' },
                  { id: 'humanWildInter', label: 'Human-Wild Interaction' },
                  { id: 'reportType', label: 'Report Type' },
                  { id: 'typeOfDive', label: 'Type Of Dive' },
                  { id: 'rank', label: 'Rank' },
                  { id: 'media', label: 'Media' },
                  { id: 'fileType', label: 'Documentation' },
                  { id: 'diverAge', label: 'Age' },
                  { id: 'diverSex', label: 'Sex' },
                  { id: 'maxDepth', label: 'Max Depth' },
                  { id: 'distance', label: 'Distance' },
                  { id: 'temp', label: 'Temperature' },
                  { id: 'userDesc', label: 'User Description' },
                  { id: 'researcherDesc', label: 'Researcher Comments' },
                  { id: 'fileLink', label: 'Link' },
                  { id: 'loggedBy', label: 'Logged By' },
                  // { id: 'loggingDate', label: 'Logging Date' },
                  // { id: 'reportRecivingDate', label: 'Report reciving Date' },
                  { id: '' },


                ]}
              />
              <TableBody>
                {dataFiltered
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => (
                    <AllDataTableRow
                      key={row._id}
                      diveCode={row.diveCode}
                      objectGroup={row.objectGroup}
                      // diveDate={formatDateTime(row.diveDate)}
                      time={row.time}
                      diveSite={row.diveSite}
                      specie={row.specie}
                      idCode={row.idCode}
                      location={row.location}
                      ar={row.ar}
                      humanWildInter={row.humanWildInter}
                      reportType={row.reportType}
                      typeOfDive={row.typeOfDive}
                      rank={row.rank}
                      media={row.media}
                      fileType={row.fileType}
                      diverAge={row.diverAge}
                      diverSex={row.diverSex}
                      maxDepth={row.maxDepth}
                      distance={row.distance}
                      temp={row.temp}
                      userDesc={row.userDesc}
                      researcherDesc={row.researcherDesc}
                      fileLink={row.fileLink}
                      loggedBy={row.loggedBy}
                      // loggingDate={formatDateTime(row.loggingDate)}
                      // reportRecivingDate={formatDateTime(row.reportRecivingDate)}
                      // avatarUrl={row.avatarUrl}
                      // isVerified={row.isVerified}
                      // selected={selected.indexOf(row.name) !== -1}
                      handleClick={(event) => handleClick(event, row.name)}
                    />
                  ))}

                <TableEmptyRows
                  height={77}
                  emptyRows={emptyRows(page, rowsPerPage, allDataDives.length)}
                />

                {notFound && <TableNoData query={filterName} />}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>

        <TablePagination
          page={page}
          component="div"
          count={allDataDives.length}
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          rowsPerPageOptions={[5, 10, 25]}
          sx={{ width: '100%' }} // Adjust the width here
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>
    </Container>
  );
}
