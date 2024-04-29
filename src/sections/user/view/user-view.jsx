import { useState, useEffect } from 'react';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import TableBody from '@mui/material/TableBody';
import Typography from '@mui/material/Typography';
import DatasetIcon from '@mui/icons-material/Dataset';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';

import Scrollbar from 'src/components/scrollbar';

import TableNoData from '../table-no-data';
import UserTableRow from '../user-table-row';
import UserTableHead from '../user-table-head';
import TableEmptyRows from '../table-empty-rows';
import UserTableToolbar from '../user-table-toolbar';
import { emptyRows, applyFilter, getComparator } from '../utils';

export default function UserPage() {
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('name');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [usersData, setUsersData] = useState([]);

  const handleSort = (event, id) => {
    const isAsc = orderBy === id && order === 'asc';
    if (id !== '') {
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(id);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/pendings_dives');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const responseData = await response.json();
        const { pendingDives } = responseData.data;
        setUsersData(pendingDives); // Set the fetched data to state
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = usersData.map((n) => n._id); // Adjusted to use usersData
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
  


  const dataFiltered = applyFilter({
    inputData: usersData,
    comparator: getComparator(order, orderBy),
    filterName,
  });

  const notFound = !dataFiltered.length && !!filterName;

  const handleEditClick = () => {
    console.log("hello");
  };

  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">Admin Approves</Typography>
        <Button variant="contained" color="inherit" startIcon={<DatasetIcon icon="eva:plus-fill" />}>
          All Data
        </Button>
      </Stack>

      <Card>
        <UserTableToolbar
          numSelected={selected.length}
          filterName={filterName}
          onFilterName={handleFilterByName}
        />

        <Scrollbar>
          <TableContainer sx={{ overflow: 'unset' }}>
            <Table sx={{ minWidth: 800 }}>
              <UserTableHead
                order={order}
                orderBy={orderBy}
                rowCount={usersData.length}
                numSelected={selected.length}
                onRequestSort={handleSort}
                onSelectAllClick={handleSelectAllClick}
                headLabel={[
                  { id: 'loggingDate', label: 'logged Data' },
                  { id: 'dateDive', label: 'Date Dive' },
                  { id: 'timeDive', label: 'Time Dive' },
                  { id: 'site', label: 'Site' },
                  { id: 'objectGroup', label: 'Object Group' },
                  { id: 'specie', label: 'Specie' },
                  // { id: 'arReef', label: 'is AR Reef?' },
                  // { id: 'imgLocation', label: 'Img Location' },
                  { id: 'reportType', label: 'Report Type' },
                  // { id: 'typeOfDive', label: 'Type of Dive' },
                  // { id: 'rank', label: 'Rank' },
                  // { id: 'userDescription', label: 'User Description' },
                  // { id: 'maxDepth', label: 'Max Depth' },
                  // { id: 'distance', label: 'Distance' },
                  // { id: 'temp', label: 'Temp' },
                  { id: '' },
                  // { id: 'file', label: 'File' },
                ]}
              />
              <TableBody>
                {dataFiltered
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => (
                    
                    <UserTableRow
                   
                      key={row._id}
                      loggingDate={formatDateTime(row.loggingDate)}
                      dateDive={formatDateTime(row.date)}
                      timeDive={row.time}
                      site={row.diveSite}
                      objectGroup={row.objectGroup}
                      specie={row.specie}
                      // arReef={row.AR}
                      // imgLocation={row.imageLocation}
                      reportType={row.reportType}
                      // typeOfDive={row.typeOfDive}
                      // rank={row.rankOfDive}
                      // userDescription={row.userDescription}
                      // maxDepth={row.maxDepth}
                      // distance={row.distance}
                      // temp={row.temp}
                      // file={row.file}
                      handleClick={(event) => handleClick(event, row.name)}
                      onEditClick={handleEditClick} // passed as a prop
                    />
                  ))}

                <TableEmptyRows
                  height={77}
                  emptyRows={emptyRows(page, rowsPerPage, usersData.length)}
                />

                {notFound && <TableNoData query={filterName} />}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>

        <TablePagination
          page={page}
          component="div"
          count={usersData.length}
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          rowsPerPageOptions={[5, 10, 25]}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>
    </Container>
  );
}
