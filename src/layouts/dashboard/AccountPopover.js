import { Icon } from '@iconify/react';
import { useRef, useState, useEffect } from 'react';
import homeFill from '@iconify/icons-eva/home-fill';
import personFill from '@iconify/icons-eva/person-fill';
import settings2Fill from '@iconify/icons-eva/settings-2-fill';
import { Link as RouterLink ,useNavigate} from 'react-router-dom';
// material
import { alpha } from '@material-ui/core/styles';
import { Button, Box, Divider, MenuItem, Typography, Avatar, IconButton } from '@material-ui/core';
// components
import MenuPopover from '../../components/MenuPopover';
import { useDetail } from 'src/context/DetailContext';
import useIntervalFetch from 'src/hooks/useIntervalFetch';
import account from '../../_mocks_/account';

// ----------------------------------------------------------------------

const MENU_OPTIONS = [
  {
    label: 'Home',
    icon: homeFill,
    linkTo: '/dashboard/app'
  },
  {
    label: 'Profile',
    icon: personFill,
    linkTo: '/dashboard/profile'
  },
  {
    label: 'Edit Details',
    icon: settings2Fill,
    linkTo: '/dashboard/profile/edit'
  }
];

// ----------------------------------------------------------------------

export default function AccountPopover() {
  const {user,logout} = useDetail()
  const [data,setData] = useState()
  const token = localStorage.getItem('adminToken')
  const id = (user._id)
  useEffect(()=>{
    fetch (process.env.REACT_APP_API_HOST+'/clerk/clerk/'+id,{
      headers: { "Authorization": "Bearer " + token},
    })
    .then(result=>{
      return result.json()
    })
    .then(data=>{
      console.log(data)
      setData(data)
    })
  },[id])

  const anchorRef = useRef(null);
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const navigate = useNavigate()
  const handleLogout = () => {
    const bool = logout()
    if (bool){
      navigate('/')
    }
  }

  return (
    <>
      <IconButton
        ref={anchorRef}
        onClick={handleOpen}
        sx={{
          padding: 0,
          width: 44,
          height: 44,
          ...(open && {
            '&:before': {
              zIndex: 1,
              content: "''",
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              position: 'absolute',
              bgcolor: (theme) => alpha(theme.palette.grey[900], 0.72)
            }
          })
        }}
      >
        <Avatar src={account.photoURL} alt="photoURL">{data && data.username.charAt(0).toUpperCase()}</Avatar>
      </IconButton>

      <MenuPopover
        open={open}
        onClose={handleClose}
        anchorEl={anchorRef.current}
        sx={{ width: 220 }}
      >
        <Box sx={{ my: 1.5, px: 2.5 }}>
          <Typography variant="subtitle1" noWrap>
            {data && data.username}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
            {data && data.email}
          </Typography>
        </Box>

        <Divider sx={{ my: 1 }} />

        {MENU_OPTIONS.map((option) => (
          <MenuItem
            key={option.label}
            to={option.linkTo}
            component={RouterLink}
            onClick={handleClose}
            sx={{ typography: 'body2', py: 1, px: 2.5 }}
          >
            <Box
              component={Icon}
              icon={option.icon}
              sx={{
                mr: 2,
                width: 24,
                height: 24
              }}
            />

            {option.label}
          </MenuItem>
        ))}

        <Box sx={{ p: 2, pt: 1.5 }}>
          <Button fullWidth color="inherit" variant="outlined" onClick={handleLogout}>
            Logout
          </Button>
        </Box>
      </MenuPopover>
    </>
  );
}