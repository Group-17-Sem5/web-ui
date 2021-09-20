import { filter } from 'lodash';
import { Icon } from '@iconify/react';
import { sentenceCase } from 'change-case';
import { useEffect, useState } from 'react';
import plusFill from '@iconify/icons-eva/plus-fill';
import { Link as RouterLink } from 'react-router-dom';
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
// import CloseIcon from '@material-ui/icons/Close';
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
  TablePagination,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@material-ui/core';
// components
import Page from '../components/Page';
import Label from '../components/Label';
import Scrollbar from '../components/Scrollbar';
import SearchNotFound from '../components/SearchNotFound';
import { UserListHead, UserListToolbar, UserMoreMenu } from '../components/_dashboard/user';
import useFetch from 'src/hooks/useIntervalFetch';
//
// import USERLIST from '../_mocks_/user';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'senderID', label: 'Sender', alignRight: false },
  { id: 'receiverID', label: 'Receiver', alignRight: false },
//   { id: 'addressID', label: 'Address', alignRight: false },
  { id: 'sourceBranchID', label: 'Source Branch', alignRight: false },
  { id: 'lastAppearedBranchID', label: 'Last appeared Branch', alignRight: false },
  { id: 'state', label: 'Status', alignRight: false },
  { id: 'weight', label: 'Weight', alignRight: false },
  { id: '' }

  
];
const TABLE_DATA = [
  {senderId:'sender1',receiverId:'receiver1',sourceBranchID:'jaffna',lastAppearedBranchID:'colombo',state:'pending',_id:'4545556rt667',weight:'200'},
  {senderId:'sender2',receiverId:'receiver2',sourceBranchID:'kokuvil',lastAppearedBranchID:'colombo',state:'assigned',_id:'4545556rtggg667',weight:'350'},
  {senderId:'sender3',receiverId:'receiver3',sourceBranchID:'koapy',lastAppearedBranchID:'kandy',state:'cancelled',_id:'4545556rt667gh',weight:'2000'},
  {senderId:'sender4',receiverId:'receiver4',sourceBranchID:'nallur',lastAppearedBranchID:'colombo',state:'pending',_id:'4545556566rt667',weight:'120'},
  {senderId:'sender5',receiverId:'receiver5',sourceBranchID:'wellawatta',lastAppearedBranchID:'jaffna',state:'delivered',_id:'4545556rt66766fg',weight:'130'},
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

function applySortFilter(array, comparator, query,query2) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(array, (_user) => _user.senderId.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  // if (query2) {
  //   return filter(array, (_user) => (_user.status)===query2);
  // }
  return stabilizedThis.map((el) => el[0]);
}

export default function MoneyOrder() {
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
      const newSelecteds = USERLIST.map((n) => n.senderId);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, senderId) => {
    const selectedIndex = selected.indexOf(senderId);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, senderId);
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
  const handleFilterByStatus = (event) => {
    setFilterStatus(event.target.value);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - USERLIST.length) : 0;

  const filteredUsers = applySortFilter(USERLIST, getComparator(order, orderBy), filterName,filterStatus);

  const isUserNotFound = filteredUsers.length === 0;

  return (
    <Page title="Courier | Easy Mail">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Courier
          </Typography>
          <Button
            variant="contained"
            component={RouterLink}
            to="/app/addCourier"
            startIcon={<Icon icon={plusFill} />}
          >
           Add Courier
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
                      const { id,senderId,receiverId,lastAppearedBranchID,sourceBranchID,state,_id,weight } = row;
                      const isItemSelected = selected.indexOf(senderId) !== -1;

                      return (
                        <TableRow
                          hover
                          key={id}
                          tabIndex={-1}
                          role="checkbox"
                          selected={isItemSelected}
                          aria-checked={isItemSelected}
                        >
                          <TableCell padding="checkbox">
                            <Checkbox
                              checked={isItemSelected}
                              onChange={(event) => handleClick(event, senderId)}
                            />
                          </TableCell>
                          <TableCell component="th" scope="row" padding="none">
                            <Stack direction="row" alignItems="center" spacing={2}>
                              {/* <Avatar alt={senderId} src={avatarUrl} /> */}
                              <Typography variant="subtitle2" noWrap>
                                {senderId}
                              </Typography>
                            </Stack>
                          </TableCell>
                          <TableCell align="left">{receiverId}</TableCell>
                          <TableCell align="left">{lastAppearedBranchID}</TableCell>
                          <TableCell align="left">{sourceBranchID}</TableCell>
                          <TableCell align="left">
                            <Label
                              variant="ghost"
                              color={(state === 'pending' ? 'warning' :(state === 'assigned' ? 'info' : state==='delivered' ? 'primary' : 'error' ))  }
                            >
                              {sentenceCase(state)}
                            </Label>
                          </TableCell>
                          <TableCell align="left">{weight} g</TableCell>

                          <TableCell align="right">
                            {/* <UserMoreMenu delUrl={`postMaster/post/delete/${_id}`} handleDelete={handleDelete} item={row} 
                            editUrl={`/app/editPostman/${_id}`}
                            viewUrl={`/app/profile/${_id}`}
                            /> */}
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
