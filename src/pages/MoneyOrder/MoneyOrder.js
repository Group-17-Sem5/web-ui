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
import Page from '../../components/Page';
import Label from '../../components/Label';
import Scrollbar from '../../components/Scrollbar';
import SearchNotFound from '../../components/SearchNotFound';
import { UserListHead, UserListToolbar, UserMoreMenu } from '../../components/_dashboard/user';
import useFetch from 'src/hooks/useIntervalFetch';
//
// import USERLIST from '../_mocks_/user';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'senderID', label: 'Sender', alignRight: false },
  { id: 'receiverID', label: 'Receiver', alignRight: false },
  { id: 'sourceBranchID', label: 'Source Branch', alignRight: false },
  { id: 'receivingBranchID', label: 'Receiving Branch', alignRight: false },

  { id: 'amount', label: 'Amount', alignRight: false },
  { id: 'specialCode', label: 'Special Code', alignRight: false },
  { id: 'isCancelled', label: 'Cancelled', alignRight: false },
  { id: 'isDelivered', label: 'Delivered', alignRight: false },
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

function applySortFilter(array, comparator, query,query2) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(array, (_user) => _user.specialCode.toLowerCase().indexOf(query.toLowerCase()) !== -1);
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
  const [canItem,setCanItem] = useState(null)
  const [modal,setModal] = useState(false)
  const [canmodal,setCanModal] = useState(false)
  const [open, setOpen] = React.useState(false);
  const token = localStorage.getItem('adminToken')

  const handleClose = () => {
    setModal(false);
  };

  const handleConfirm = () => {
    setCanModal(false);
  };


  useEffect(()=>{
    fetch ('http://localhost:5000/api/clerk/moneyorder/',{
      headers: { "Authorization": "Bearer " + token},
    })
    .then(result=>{
      return result.json()
    })
    .then(data=>{
      console.log(data)
      setUSERLIST(data)
    })
    // setUSERLIST(TABLE_DATA)
  },[])
  console.log(USERLIST)

  const handleDelete = (item) => {
    // console.log(item)
    setDelItem(item)
    setModal(true)
  }

  const handleCancel = (item) => {
    // console.log(item)
    setCanItem(item)
    setCanModal(true)
  }
  const handleConfirmDelete = () => { 
    const delApiURL = "clerk/moneyorder/delete/"+ delItem._id;
    setDelItem(null)
    // setIsDelLoading(true)
    fetch( 'http://localhost:5000/api/'+delApiURL, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json', "Authorization": "Bearer " + token }
    }).then( () => {
      setUSERLIST(USERLIST.filter(i=>i!==delItem))
      window.location.reload();
        // setIsDelLoading(false)
        setModal(false)
        console.log('success')
    } )
    .catch( console.log )
}

const handleConfirmCancel = () => { 
  const conApiURL = "clerk/moneyorder/confirm/"+ canItem._id;
  setCanItem(null)
  // setIsDelLoading(true)
  fetch( 'http://localhost:5000/api/'+conApiURL, {
      method: 'post',
      headers: { 'Content-Type': 'application/json', "Authorization": "Bearer " + token }
  }).then( () => {
    window.location.reload();
    //setUSERLIST(USERLIST.filter(i=>i!==canItem))
      // setIsDelLoading(false)
      setCanModal(false)
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
      const newSelecteds = USERLIST.map((n) => n.specialCode);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, specialCode) => {
    const selectedIndex = selected.indexOf(specialCode);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, specialCode);
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
    <Page title="MoneyOrder | Easy Mail">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Money Order
          </Typography>
          <Button
            variant="contained"
            component={RouterLink}
            to="/dashboard/addmoneyorder"
            startIcon={<Icon icon={plusFill} />}
          >
           Add Money Order
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
                      const {id,senderID,receiverID,sourceBranchID,receivingBranchID,_id,amount,specialCode,isCancelled,isDelivered } = row;
                      const isItemSelected = selected.indexOf(specialCode) !== -1;

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
                              onChange={(event) => handleClick(event, specialCode)}
                            />
                          </TableCell>
                          {/*<TableCell component="th" scope="row" padding="none">
                            <Stack direction="row" alignItems="center" spacing={2}>
                               <Avatar alt={senderID} src={avatarUrl} /> 
                              <Typography variant="subtitle2" noWrap>
                                {senderID}
                              </Typography>
                            </Stack>
                          </TableCell>*/}
                          <TableCell align="left">{senderID}</TableCell>
                          <TableCell align="left">{receiverID}</TableCell>
                          <TableCell align="left">{sourceBranchID}</TableCell>
                          <TableCell align="left">{receivingBranchID}</TableCell> 
                          
                          <TableCell align="left">Rs. {amount}</TableCell>
                          <TableCell align="left">{specialCode}</TableCell>
                          <TableCell align="left">
                            { isCancelled ?
                              <Label
                              variant="ghost"
                              color='error'
                            >
                              {sentenceCase('cancelled')}
                            </Label>
                            :
                            <Label
                              variant="ghost"
                              color='warning'
                            >
                              Not Cancelled
                            </Label>
                            }
                          </TableCell>
                          
                          <TableCell align="left">
                            { isDelivered ?
                              <Label
                              variant="ghost"
                              color='success'
                            >
                              {sentenceCase('delivered')}
                            </Label>
                            :
                            <Label
                              variant="ghost"
                              color='error'
                            >
                              Not Delivered
                            </Label>
                            }
                          </TableCell>
                         
                          <TableCell align="left">
                            {/* postManID ?
                              <Label
                              variant="ghost"
                              color={(state === 'pending' ? 'warning' :(state === 'assigned' ? 'info' : state==='delivered' ? 'primary' : 'error' ))  }
                            >
                              {sentenceCase(state)}
                            </Label>
                            :
                            <Label
                              variant="ghost"
                              color='error'
                            >
                              Not assigned
                            </Label>
                            */}
                          </TableCell>
                          

                          <TableCell align="right">
                            <UserMoreMenu delUrl={`clerk/moneyorder/delete/${_id}`} handleDelete={handleDelete} item={row} 
                              editUrl={`/dashboard/editMoneyorder/${_id}`}
                              conUrl={`clerk/moneyorder/confirm/${_id}`} handleCancel={handleCancel} item={row} 
                              //viewUrl={`/dashboard/viewMoneyorder/${_id}`}
                            />
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

      <Dialog onClose={handleConfirm} aria-labelledby="customized-dialog-title" open={canmodal}>
          <DialogTitle id="customized-dialog-title" onClose={handleConfirm} color="primary">
            Confirm Money Order
          </DialogTitle>
          <DialogContent dividers>
            <Typography gutterBottom>
              Are you sure? You want to Confirm Money Order
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={handleConfirm} color="error">
              Cancel
            </Button>
            <Button autoFocus onClick={handleConfirmCancel} color="success">
              Confirm
            </Button>
          </DialogActions>
      </Dialog>
      </Container>
    </Page>
  );
}