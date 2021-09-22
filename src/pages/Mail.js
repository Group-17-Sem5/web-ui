import { filter } from 'lodash';
import { Icon } from '@iconify/react';
import { sentenceCase } from 'change-case';
import { useState } from 'react';
import plusFill from '@iconify/icons-eva/plus-fill';
import { Link as RouterLink } from 'react-router-dom';
// material
import {
  Card,
  Table,
  Stack,
  Avatar,
  Button,
  Checkbox,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination
} from '@material-ui/core';
// components
import Page from '../components/Page';
import Label from '../components/Label';
import Scrollbar from '../components/Scrollbar';
import SearchNotFound from '../components/SearchNotFound';
import { UserListHead, UserListToolbar, UserMoreMenu } from '../components/_dashboard/user';
//
import USERLIST from '../_mocks_/mail';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'mailID', label: 'mailID', alignRight: false },
  { id: 'addressID', label: 'AddressID', alignRight: false },
  { id: 'amount', label: 'Amount', alignRight: false },
  { id: 'date', label: 'Date', alignRight: false },
  { id: 'assignedPostmanID', label: 'Assigned PostmanID', alignRight: false },
  { id: 'sourceBranchID', label: 'Source BranchID', alignRight: false },
  { id: 'receivingBranchID', label: 'Receiving BranchID', alignRight: false },
  { id: 'senderID', label: 'SenderID', alignRight: false },
  { id: 'receiverID', label: 'ReceiverID', alignRight: false },
  //{ id: 'isConfirmed', label: 'Confirmed', alignRight: false },
  { id: 'status', label: 'Status', alignRight: false },
  { id: '' }
];

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(array, (_user) => _user.mailID.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function User() {
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('name');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [USERLIST,setUSERLIST] = useState([])
  const [filterStatus,setFilterStatus] = useState('');
  const [delItem,setDelItem] = useState(null)
  const [modal,setModal] = useState(false)
  const [open, setOpen] = React.useState(false);
  const token = localStorage.getItem('adminToken')

  const handleClose = () => {
    setModal(false);
  };


  useEffect(()=>{
    fetch ('http://localhost:5000/postMaster/post/',{
      headers: { "Authorization": "Bearer " + token},
    })
    .then(result=>{
      return result.json()
    })
    .then(data=>{
      console.log(data)
      setUSERLIST(data)
    })
    setUSERLIST(TABLE_DATA)
  },[])
  console.log(USERLIST)

  const handleDelete = (item) => {
    // console.log(item)
    setDelItem(item)
    setModal(true)
  }

  const handleConfirmDelete = () => { 
    const delApiURL = "postMaster/post/delete"+ delItem._id;
    setDelItem(null)
    // setIsDelLoading(true)
    fetch( 'http://localhost:5000/'+delApiURL, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json', "Authorization": "Bearer " + token }
    }).then( () => {
      setUSERLIST(USERLIST.filter(i=>i!==delItem))
        // setIsDelLoading(false)
        setModal(false)
        console.log('success')
    } )
    .catch( console.log )
}

 // const {data:USERLISTT} = useFetch('http://localhost:5000/postMaster/postman/')

  // console.log(USERLISTT)

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = USERLIST.map((n) => n.name);
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
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterByName = (event) => {
    setFilterName(event.target.value);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - USERLIST.length) : 0;

  const filteredUsers = applySortFilter(USERLIST, getComparator(order, orderBy), filterName);

  const isUserNotFound = filteredUsers.length === 0;

  return (
    <Page title="Post | EASY MAIL">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            POST
          </Typography>
          <Button
            variant="contained"
            component={RouterLink}
            to="/app/addPost"
            startIcon={<Icon icon={plusFill} />}
          >
            Add Post
          </Button>
        </Stack>

        <Card>
          <UserListToolbar
            numSelected={selected.length}
            filterName={filterName}
            onFilterName={handleFilterByName}
            onFilterStatus={handleFilterByStatus}
          />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <UserListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={USERLIST.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {filteredUsers
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => {
                      const { id, mailID, addressID, amount, date, assignedPostmanID, sourceBranchID, receivingBranchID, senderID, receiverID, status } = row;
                      const isItemSelected = selected.indexOf(mailID) !== -1;

                      return (
                        <TableRow
                          hover
                          key={id}
                          tabIndex={-1}
                          addressID="checkbox"
                          selected={isItemSelected}
                          aria-checked={isItemSelected}
                        >
                          <TableCell padding="checkbox">
                            <Checkbox
                              checked={isItemSelected}
                              onChange={(event) => handleClick(event, mailID)}
                            />
                          </TableCell>
                          <TableCell component="th" scope="row" padding="none">
                            <Stack direction="row" alignItems="center" spacing={2}>
                             
                              <Typography variant="subtitle2" noWrap>
                                {mailID}
                              </Typography>
                            </Stack>
                          </TableCell>
                          <TableCell align="left">{addressID}</TableCell>
                          <TableCell align="left">{amount}</TableCell>
                          <TableCell align="left">{date}</TableCell>
                          <TableCell align="left">{assignedPostmanID}</TableCell>
                          <TableCell align="left">{sourceBranchID}</TableCell>
                          <TableCell align="left">{receivingBranchID}</TableCell>
                          <TableCell align="left">{senderID}</TableCell>
                          <TableCell align="left">{receiverID}</TableCell>
                          <TableCell align="left">
                            <Label 
                              variant="ghost"
                              color={(state === 'pending' ? 'warning' :(state === 'assigned' ? 'info' : state==='delivered' ? 'primary' : 'error' ))  }
                            >
                              {sentenceCase(status)}
                            </Label>
                          </TableCell>

                          <TableCell align="right">
                             {/* <UserMoreMenu delUrl={`postMaster/post/delete/${_id}`} handleDelete={handleDelete} item={row} 
                            editUrl={`/app/editPostman/${_id}`}
                            viewUrl={`/app/profile/${_id}`}
                            /> */}
                            <UserMoreMenu />
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>
                {isUserNotFound && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                        <SearchNotFound searchQuery={filterName} />
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}
              </Table>
            </TableContainer>
          </Scrollbar>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={USERLIST.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
        <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={modal}>
          <DialogTitle id="customized-dialog-title" onClose={handleClose} color="error">
            Confirm Delete
          </DialogTitle>
          <DialogContent dividers>
            <Typography gutterBottom>
              Are you sure? You want to delete permanantly.
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button autoFocus onClick={handleConfirmDelete} color="error">
              Delete
            </Button>
          </DialogActions>
      </Dialog>
      </Container>
    </Page>
  );
}
