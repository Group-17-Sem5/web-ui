import { filter } from 'lodash';
import { Icon } from '@iconify/react';
import { sentenceCase } from 'change-case';
import { useEffect, useState } from 'react';
import plusFill from '@iconify/icons-eva/plus-fill';
import { Link as RouterLink } from 'react-router-dom';
import MuIDialogTitle from '@material-ui/core/DialogTitle';
import MuIDialogContent from '@material-ui/core/DialogContent';
import MuIDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import React from 'react';
import ReactDOM from 'react-dom';
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
  Dialog,
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
//
import USERLIST from '../../_mocks_/mail';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { ID: 'senderID', label: 'Sender', alignRight: false },
  { ID: 'receiverID', label: 'Receiver', alignRight: false },
  { ID: 'addressID', label: 'Address', alignRight: false },
  { ID: 'sourceBranchID', label: 'Source Branch', alignRight: false },
  { ID: 'lastAppearedBranchID', label: 'Last appeared Branch', alignRight: false },
  { ID: 'receivingBranchID', label: 'Receiving Branch', alignRight: false },
  { ID: 'postManID', label: 'Postman', alignRight: false },
  { ID: 'isAssigned', label: 'Assigned', alignRight: false },
  { ID: 'isCancelled', label: 'Cancelled', alignRight: false },
  { ID: 'isDelivered', label: 'Delivered', alignRight: false },
  { ID: '' }
  // { ID: 'state', label: 'state', alignRight: false },
  
];
const TABLE_DATA = [
  {senderID:'sender1',receiverID:'receiver1',sourceBranchID:'jaffna',lastAppearedBranchID:'colombo',state:'pending',_id:'4545556rt667'},
  {senderID:'sender2',receiverID:'receiver2',sourceBranchID:'kokuvil',lastAppearedBranchID:'colombo',state:'assigned',_id:'4545556rtggg667'},
  {senderID:'sender3',receiverID:'receiver3',sourceBranchID:'koapy',lastAppearedBranchID:'kandy',state:'cancelled',_id:'4545556rt667gh'},
  {senderID:'sender4',receiverID:'receiver4',sourceBranchID:'nallur',lastAppearedBranchID:'colombo',state:'pending',_id:'4545556566rt667'},
  {senderID:'sender5',receiverID:'receiver5',sourceBranchID:'wellawatta',lastAppearedBranchID:'jaffna',state:'delivered',_id:'4545556rt66766fg'},
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
    return filter(array, (_user) => _user.senderID.toLowerCase().indexOf(query.toLowerCase()) !== -1);
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
  const [filterstate,setFilterstate] = useState('');
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
    fetch ('http://localhost:5000/api/clerk/post/',{
      headers: { "Authorization": "Bearer " + token},
    })
    .then(result=>{
      return result.json()
    })
    .then(data=>{
      console.log(data)
      setUSERLIST(data)
    })
    //setUSERLIST(TABLE_DATA)
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

  const handleConfirmCancel = () => { 
    const conApiURL = "clerk/post/confirm/"+ canItem._id;
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

  const handleConfirmDelete = () => { 
    const delApiURL = "clerk/post/delete/"+ delItem._id;
    console.log(delItem._id)
    setDelItem(null)
    // setIsDelLoading(true)
    fetch( 'http://localhost:5000/api/'+delApiURL, {
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
      const newSelecteds = USERLIST.map((n) => n.senderID);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, senderID) => {
    const selectedIndex = selected.indexOf(senderID);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, senderID);
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

  const handleFilterBystate = (event) => {
    setFilterstate(event.target.value);
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
            to="/dashboard/addpost"
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
            onFilterstate={handleFilterBystate}
          />

          <Scrollbar>
            <TableContainer sx={{ minWIDth: 800 }}>
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
                      const { id,senderID,receiverID,addressID,sourceBranchID,lastAppearedBranchID,receivingBranchID,postManID,isAssigned,_id,isCancelled,isDelivered } = row;
                      const isItemSelected = selected.indexOf(senderID) !== -1;

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
                              onChange={(event) => handleClick(event, senderID)}
                            />
                          </TableCell>
                          {/*<TableCell component="th" scope="row" padding="none">
                            <Stack direction="row" alignItems="center" spacing={2}>
                             
                              <Typography variant="subtitle2" noWrap>
                                {senderID}
                              </Typography>
                            </Stack>
                          </TableCell>*/}
                          <TableCell align="left">{senderID}</TableCell>
                          <TableCell align="left">{receiverID}</TableCell>
                          <TableCell align="left">{addressID}</TableCell>
                          <TableCell align="left">{sourceBranchID}</TableCell>
                          <TableCell align="left">{lastAppearedBranchID}</TableCell>
                          <TableCell align="left">{receivingBranchID}</TableCell>
                          <TableCell align="left">{ postManID?postManID : 'Not assigned yet'}</TableCell>
                         
                          <TableCell align="left">
                            { postManID ?
                              <Label
                              variant="ghost"
                              color='success'
                            >
                              {sentenceCase('assinged')}
                            </Label>
                            :
                            <Label
                              variant="ghost"
                              color='error'
                            >
                              Not assigned
                            </Label>
                            }
                          </TableCell>
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
                            <UserMoreMenu delUrl={`clerk/post/delete/${_id}`} handleDelete={handleDelete} item={row} 
                            editUrl={`/dashboard/editPost/${_id}`}
                            conUrl={`clerk/post/confirm/${_id}`} handleCancel={handleCancel} item={row} 
                            //viewUrl={`/dashboard/viewpost/${_id}`}
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
            Confirm Post
          </DialogTitle>
          <DialogContent dividers>
            <Typography gutterBottom>
              Are you sure? You want to Confirm Post
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
