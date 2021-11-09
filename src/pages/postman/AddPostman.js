import { Icon } from '@iconify/react';
import plusFill from '@iconify/icons-eva/plus-fill';
import { Link as RouterLink } from 'react-router-dom';
// material
import { Card, Button, Container, Stack, Typography, CardContent } from '@material-ui/core';
// components
import Page from '../../components/Page';
// import AddPostmanForm from '../components/postman/newPostman';
import AddPostmanForm from '../../components/form/addPostman'

//


// ----------------------------------------------------------------------

const SORT_OPTIONS = [
  { value: 'latest', label: 'Latest' },
  { value: 'popular', label: 'Popular' },
  { value: 'oldest', label: 'Oldest' }
];

// ----------------------------------------------------------------------

export default function AddPostman() {
  return (
    <Page title="Dashboard: Add Postman | MIS">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Add Postman
          </Typography>
          {/* <Button
            variant="contained"
            component={RouterLink}
            to="#"
            startIcon={<Icon icon={plusFill} />}
          >
            New Post
          </Button> */}
        </Stack>

        
        <AddPostmanForm/>
        
          {/* <Add/>
          <Profile/> */}
       
      </Container>
    </Page>
  );
}
