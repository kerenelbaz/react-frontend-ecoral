import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
// import Dialog from '@mui/material/Dialog';
import Container from '@mui/material/Container';
import TableBody from '@mui/material/TableBody';
import Typography from '@mui/material/Typography';
// import DialogTitle from '@mui/material/DialogTitle';
// import DialogActions from '@mui/material/DialogActions';
// import DialogContent from '@mui/material/DialogContent';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';

import { useView } from 'src/viewContexts';

import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';

// import DialogContentText from '@mui/material/DialogContentText';
import config from 'src/sections/configServer';
import EditData from 'src/sections/pendingAdmin/view/handle-edit-data';

import AllDataTableRow from '../allData-table-row';
import TableNoData from '../allData-table-no-data';
import AllDataTableHead from '../allData-table-head';
import TableEmptyRows from '../allData-table-empty-rows';
import { emptyRows, applyFilter, getComparator } from '../utils'; // Adjust the import path as needed

export default function AllDataView() {
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('name');
  const [filterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(500);
  const [allDataDives, setAllDataDives] = useState([]);
  const [loading, setLoading] = useState(true); // Define loading state
  const [editingRow, setEditingRow] = useState(null); // State for editing row
  const [editDialogOpen, setEditDialogOpen] = useState(false); // State for edit dialog
  const { switchToCards } = useView();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // const response = await fetch(`${config.serverUrl}/api/dives`);
        const response = await fetch('https://ecoral.vercel.app/api/dives');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const responseData = await response.json();
        const { dives } = responseData.data;
        dives.sort((a, b) => new Date(b.logginDate) - new Date(a.logginDate));
        setAllDataDives(dives);
        setLoading(false); // Data fetched successfully
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false); // Error occurred while fetching data
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Render loading indicator while data is being fetched
  }

  if (!allDataDives || allDataDives.length === 0) {
    return <div>No data available</div>; // Render message if data is empty
  }

  const handleSwitchToCards = () => {
    switchToCards();
    navigate('/all-dives');
  };

  const handleSort = (event, id) => {
    const isAsc = orderBy === id && order === 'asc';
    if (id !== '') {
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(id);
      const sortedData = allDataDives.slice().sort((a, b) => {
        if (isAsc) {
          return a[id] > b[id] ? 1 : -1;
        } 
        return a[id] < b[id] ? 1 : -1;
      });
      setAllDataDives(sortedData);
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

  const dataFiltered = applyFilter({
    inputData: allDataDives,
    comparator: getComparator(order, orderBy),
    filterName,
  });

  const formatDateTime = (dateTimeString) => {
    const dateFormatRegex1 = /^\w{3} \w{3} \d{2} \d{4} \d{2}:\d{2}:\d{2} GMT[+-]\d{4} \([\w\s]+\)$/;
    const dateFormatRegex2 = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/;
    if (!dateFormatRegex1.test(dateTimeString) && !dateFormatRegex2.test(dateTimeString)) {
      return dateTimeString; 
    }
    const dateTime = new Date(dateTimeString);
    const dateFormatter = new Intl.DateTimeFormat('en-GB', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
    const formattedDate = dateFormatter.format(dateTime);
    const timeFormatter = new Intl.DateTimeFormat('en-GB', {
      hour: '2-digit',
      minute: '2-digit',
    });
    const formattedTime = timeFormatter.format(dateTime);
    return `${formattedDate}, ${formattedTime}`;
  };

  const handleDeleteClick = async (rowClicked) => {
    try {
      const response = await fetch(`${config.serverUrl}/api/Dives/${rowClicked._id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete row');
      }
      setAllDataDives(prevData => prevData.filter(row => row._id !== rowClicked._id));
    } catch (error) {
      console.error('Error deleting row:', error);
    }
  };

  const handleEditClick = (row) => {
    setEditingRow(row);
    setEditDialogOpen(true);
  };

  const handleEditClose = () => {
    setEditDialogOpen(false);
    setEditingRow(null);
  };

  const notFound = !dataFiltered.length && !!filterName;

  return (
    <Container className="custom-container">
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">All Dives</Typography>
        <Button variant="contained" color="inherit" startIcon={<Iconify icon="mdi:table" />} onClick={handleSwitchToCards}>
          As Cards
        </Button>
      </Stack>
      <Card>
        <Scrollbar>
          <TableContainer sx={{ overflow: 'unset', maxWidth: '2500px' }}>
            <Table sx={{ minWidth: '2000px', width: '100%' }}>
              <AllDataTableHead
                order={order}
                orderBy={orderBy}
                rowCount={allDataDives.length}
                numSelected={selected.length}
                onRequestSort={handleSort}
                onSelectAllClick={handleSelectAllClick}
                headLabel={[
                  { id: 'diveCode', label: 'Dive Code' },
                  { id: 'loggingDate', label: 'Inserted In' },
                  { id: 'groupCode', label: 'Group Code' },
                  { id: 'diveDate', label: 'Date Of Dive' },
                  { id: 'time', label: 'Time' },
                  { id: 'diveSite', label: 'Dive Site' },
                  { id: 'objectGroup', label: 'Object Group' },
                  { id: 'specie', label: 'Specie' },
                  { id: 'idCode', label: 'ID Code/ Photographer Name' },
                  { id: 'Location', label: 'Location' },
                  { id: 'ar', label: 'Is AR?' },
                  { id: 'humanWildInter', label: 'Human Wild Life Interaction' },
                  { id: 'reportType', label: 'Report Type' },
                  { id: 'typeOfDive', label: 'Type Of Dive' },
                  { id: 'rank', label: 'Dive Rank' },
                  { id: 'media', label: 'Media' },
                  { id: 'fileType', label: 'Documentation' },
                  { id: 'diverAge', label: 'Age Of Diver' },
                  { id: 'diverSex', label: 'Sex Of Diver' },
                  { id: 'maxDepth', label: 'Max Depth' },
                  { id: 'distance', label: 'Distance' },
                  { id: 'temp', label: 'Temperature' },
                  { id: 'userDesc', label: 'User Description' },
                  { id: 'researcherDesc', label: 'Researcher Comments' },
                  { id: 'loggedBy', label: 'Logged By' },
                  { id: 'fileLink', label: 'Image' },
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
                      loggingDate={formatDateTime(row.loggingDate)}
                      groupCode={row.objectCode}
                      diveDate={row.date}
                      time={row.time}
                      diveSite={row.diveSite}
                      objectGroup={row.objectGroup}
                      specie={row.specie}
                      idCode={row.idCode_photographerName}
                      location={row.imageLocation}
                      ar={row.AR}
                      humanWildInter={row.humanWildlifeInteraction}
                      reportType={row.reportType}
                      typeOfDive={row.typeOfDive}
                      rank={row.rankOfDive}
                      media={row.media}
                      fileType={row.documentation}
                      diverAge={row.ageOfDiver}
                      diverSex={row.sexOfDiver}
                      maxDepth={row.maxDepth}
                      distance={row.distance}
                      temp={row.temp}
                      userDesc={row.userDescription}
                      researcherDesc={row.researcherComment}
                      loggedBy={row.loggedBy}
                      fileLink={row.linkURL}
                      handleClick={(event) => handleClick(event, row.name)}
                      onDeleteClicked={() => handleDeleteClick(row)}
                      onEditClicked={() => handleEditClick(row)}
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
          sx={{ width: '100%' }} 
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>

      <EditData
        open={editDialogOpen}
        handleClose={handleEditClose}
        pendingData={editingRow}
        onDeleteClick={() => {}}
      />
    </Container>
  );
}
