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
import CustomTable from 'src/components/table';
//
// import USERLIST from '../_mocks_/user';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'username', label: 'Username', alignRight: false },
  { id: 'email', label: 'Email', alignRight: false },
  // { id: 'password', label: 'Role', alignRight: false },
  { id: 'mobileNumber', label: 'Phone', alignRight: false },
  { id: 'area', label: 'Area', alignRight: false },
  { id: 'status', label: 'Status', alignRight: false },
  { id: '' }
];

// ----------------------------------------------------------------------


export default function X() {
  const code = `column.id ==="status"
  ? 
  <Label
    variant="ghost"
    color={!row[column.id] ? 'error' : 'success'}
  >
    {sentenceCase(row[column.id]?"active":"not active")}
  </Label>
  :`

  return (
    <Page title="User | EasyMail">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            User
          </Typography>
          <Button
            variant="contained"
            component={RouterLink}
            to="/app/addPostman"
            startIcon={<Icon icon={plusFill} />}
          >
           Add Postman
          </Button>
        </Stack>
        <CustomTable
              TABLE_HEAD={TABLE_HEAD}
              itemsUrl='/postMaster/postman/'
              code={code}
              editRoute={({ _id }) => `/app/actuators/${_id}`}
              delUrl={({ _id }) => `/actuatorCommands/forActuator/${_id}`}

            />
        
      </Container>
    </Page>
  );
}
