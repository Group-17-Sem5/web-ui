import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import searchFill from '@iconify/icons-eva/search-fill';
import trash2Fill from '@iconify/icons-eva/trash-2-fill';
import roundFilterList from '@iconify/icons-ic/round-filter-list';

import { useRef,useState } from 'react';
// material
import { experimentalStyled as styled } from '@material-ui/core/styles';
import {
  Box,
  Toolbar,
  Tooltip,
  IconButton,
  Typography,
  OutlinedInput,
  InputAdornment,
  Select,
  MenuItem,
} from '@material-ui/core';

// ----------------------------------------------------------------------

const RootStyle = styled(Toolbar)(({ theme }) => ({
  height: 96,
  display: 'flex',
  justifyContent: 'space-between',
  padding: theme.spacing(0, 1, 0, 3)
}));

const SearchStyle = styled(OutlinedInput)(({ theme }) => ({
  width: 240,
  transition: theme.transitions.create(['box-shadow', 'width'], {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.shorter
  }),
  '&.Mui-focused': { width: 320, boxShadow: theme.customShadows.z8 },
  '& fieldset': {
    borderWidth: `1px !important`,
    borderColor: `${theme.palette.grey[500_32]} !important`
  }
}));


// ----------------------------------------------------------------------

UserListToolbar.propTypes = {
  numSelected: PropTypes.number,
  filterName: PropTypes.string,
  onFilterName: PropTypes.func,
  filterStatus: PropTypes.string,
  onFilterStatus: PropTypes.func
};

export default function UserListToolbar({ numSelected, filterName, onFilterName,filterStatus,onFilterStatus }) {
  const [val,setVal] = useState('')
  
  return (
    <RootStyle
      sx={{
        ...(numSelected > 0 && {
          color: 'primary.main',
          bgcolor: 'primary.lighter'
        })
      }}
    >
      {numSelected > 0 ? (
        <Typography component="div" variant="subtitle1">
          {numSelected} selected
        </Typography>
      ) : (
        <SearchStyle
          value={filterName}
          onChange={onFilterName}
          placeholder="Search user..."
          startAdornment={
            <InputAdornment position="start">
              <Box component={Icon} icon={searchFill} sx={{ color: 'text.disabled' }} />
            </InputAdornment>
          }
        />
      )}

      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton>
            <Icon icon={trash2Fill} />
          </IconButton>
        </Tooltip>
      ) : (
        <>
        
        {/* <Tooltip title="Filter list">
          <IconButton ref={ref} onClick={()=>setIsOpen(true)}>
            <Icon icon={roundFilterList} />
          </IconButton>
        </Tooltip> */}
        {/* <Menu
        open={isOpen}
        anchorEl={ref.current}
        onClose={()=>setIsOpen(false)}
        PaperProps={{
          sx: { width: 200, maxWidth: '100%' }
        }}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        value={filterStatus}
        > */}
        {/* <Select
        value={filterStatus}
        onChange={onFilterStatus}
        style={{width:'15%'}}
        value={val}
        displayEmpty
        
        >
          <MenuItem onClick={()=>setVal('')} sx={{ color: 'text.secondary' }} value=''><em>All</em></MenuItem>
          <MenuItem onClick={()=>setVal('active')} sx={{ color: 'text.secondary' }} value='active'>Delevered</MenuItem>
          <MenuItem onClick={()=>setVal('banned')} sx={{ color: 'text.secondary' }} value='banned'>Pending</MenuItem>
          <MenuItem onClick={()=>setVal('cancelled')} sx={{ color: 'text.secondary' }} value='cancelled'>Cancelled</MenuItem>
          </Select></Menu> */}
        </>
      )}
    </RootStyle>
  );
}
