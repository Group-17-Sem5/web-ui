import { Icon } from '@iconify/react';
import user from '@iconify/icons-ant-design/usergroup-add';
// material
import { alpha, experimentalStyled as styled } from '@material-ui/core/styles';
import { Card, Typography } from '@material-ui/core';
// utils
import { fShortenNumber } from '../../../utils/formatNumber';
import React, { useState, useEffect } from 'react';

// ----------------------------------------------------------------------

const RootStyle = styled(Card)(({ theme }) => ({
  boxShadow: 'none',
  textAlign: 'center',
  padding: theme.spacing(5, 0),
  color: theme.palette.info.darker,
  backgroundColor: theme.palette.info.lighter
}));

const IconWrapperStyle = styled('div')(({ theme }) => ({
  margin: 'auto',
  display: 'flex',
  borderRadius: '50%',
  alignItems: 'center',
  width: theme.spacing(8),
  height: theme.spacing(8),
  justifyContent: 'center',
  marginBottom: theme.spacing(3),
  color: theme.palette.info.dark,
  backgroundImage: `linear-gradient(135deg, ${alpha(theme.palette.info.dark, 0)} 0%, ${alpha(
    theme.palette.info.dark,
    0.24
  )} 100%)`
}));

// ----------------------------------------------------------------------

const TOTAL = 135;

export default function AppNewUsers() {
  const [LIST,setLIST] = useState([])
  const token = localStorage.getItem('adminToken')

  useEffect(()=>{
    fetch ('https://easymailwebapp.herokuapp.com/api/clerk/user/',{
      headers: { "Authorization": "Bearer " + token},
    })
    .then(result=>{
      return result.json()
    })
    .then(data=>{
      console.log(data)
      setLIST(data)
    })
    
  },[])
  return (
    <RootStyle>
      <IconWrapperStyle>
        <Icon icon={user} width={24} height={24} />
      </IconWrapperStyle>
      <Typography variant="h3">{fShortenNumber(LIST.length)}</Typography>
      <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
        Current Users
      </Typography>
    </RootStyle>
  );
}
