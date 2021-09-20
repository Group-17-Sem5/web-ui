import { Icon } from '@iconify/react';
import plusFill from '@iconify/icons-eva/plus-fill';
import { Link as RouterLink } from 'react-router-dom';
// material
import { 
    Grid, 
    Button, 
    Container, 
    Stack, 
    Typography,
    Card,
    CardActionArea,
    CardMedia,
    CardContent,
    CardActions,
    Avatar,
    TableRow,
    TableCell
 } from '@material-ui/core';
// components
import Page from 'src/components/Page';

import DetailsChart from 'src/detailsCharts/DetailsChart'

// ----------------------------------------------------------------------

const SORT_OPTIONS = [
  { value: 'latest', label: 'Latest' },
  { value: 'popular', label: 'Popular' },
  { value: 'oldest', label: 'Oldest' }
];

// ----------------------------------------------------------------------

export default function Profile() {
  return (
    <Page title="Profile">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Profile
          </Typography>
        </Stack>

        <Grid container spacing={3}>
        {/* <Grid  xs={2} item></Grid> */}
            <Grid  xs={3} item>
                <Card >
                    <CardActionArea >
                        <Grid 
                            xs={12}
                            style={{
                            textAlign:'cenetr' ,
                            margin:'15px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                            }} 
                        >
                            <Avatar style={{height:'100px',width:'100px'}}>{'Thayaruban'.charAt(0).toUpperCase()}</Avatar>
                        </Grid>
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="h2">
                                Thayaruban
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                                About content
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                    <CardActions>
                        <Button size="small" color="info">
                        Edit
                        </Button>
                        <Button size="small" color="error">
                        Delete
                        </Button>
                    </CardActions>
                </Card>
            </Grid>
            <Grid xs={8}  item>
                <Card >
                    <CardActionArea >
                        <CardContent>
                            <TableRow textAlign="center" >
                                <TableCell size="medium"><b>First Name</b></TableCell>
                                <TableCell size="medium">Thayaruban</TableCell>
                                <TableCell size="medium"><b>Last Name</b></TableCell>
                                <TableCell size="medium">Thayaruban</TableCell>
                            </TableRow>
                            <TableRow >
                                <TableCell size="medium"><b>Email</b></TableCell>
                                <TableCell size="medium">admin@gmail.com</TableCell>
                                <TableCell size="medium"><b>Mobile Number</b></TableCell>
                                <TableCell size="medium">0765655435</TableCell>
                            </TableRow>
                        </CardContent>
                    </CardActionArea>
                    {/* <CardActions>
                        <Button size="small" color="primary">
                        Share
                        </Button>
                        <Button size="small" color="primary">
                        Learn More
                        </Button>
                    </CardActions> */}
                </Card>
            </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
