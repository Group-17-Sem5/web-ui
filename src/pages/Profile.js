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
    Avatar
 } from '@material-ui/core';
// components
import Page from '../components/Page';
import { sentenceCase } from 'change-case';
import DetailsChart from '../detailsCharts/DetailsChart'
import useFetch from 'src/hooks/useFetch';
import { useNavigate, useParams } from 'react-router';
import Label from 'src/components/Label'
import { useDetail } from 'src/context/DetailContext';
import { useState } from 'react';
// ----------------------------------------------------------------------

const SORT_OPTIONS = [
  { value: 'latest', label: 'Latest' },
  { value: 'popular', label: 'Popular' },
  { value: 'oldest', label: 'Oldest' }
];

// ----------------------------------------------------------------------

export default function Profile() {
    const {id} = useParams()
    const {user} = useDetail()
    const {data:profile} = id ? useFetch('/postMaster/postman/'+id) : useFetch('/admin/postmaster/'+user._id)
    const navigate = useNavigate()
    const token = localStorage.getItem('adminToken')
    const handleChangeStatus = () => {
        fetch(process.env.REACT_APP_API_HOST+'/postMaster/postman/updateStatus/'+id,{
            method: 'POST',
            headers: { 'Content-Type': 'application/json', "Authorization": "Bearer " + token},
            body: JSON.stringify( profile )
            // headers: { 'Content-Type': 'application/json', "Authorization": "Bearer " + token },
          })
          .then(result=>{
            if(result.status===200){
              navigate('/app/postman/', { replace: true });
            }
            console.log(result.status)
          })
    }
  return (
    <Page title="Profile | Easy Mail">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Profile
          </Typography>
        </Stack>

        <Grid container spacing={3}>
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
                            <Avatar style={{height:'100px',width:'100px'}}>{'kajanan'.charAt(0).toUpperCase()}</Avatar>
                        </Grid>
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="h2" style={{display:'flex',justifyContent:'center'}}>
                                {profile && profile.username}
                            </Typography>
                            <h4 style={{display:'flex',justifyContent:'center',marginBottom:'5px'}}>{profile && profile.email}</h4>
                            
                            <Typography variant="body2" color="textSecondary" component="p">
                                {/*<Label
                                variant="ghost"
                                color={profile.status ? !profile.status ? 'error' : 'success': ''}
                                style={{padding:'15px',display:'flex',width:'50%',marginLeft:'25%'}}
                                >
                                {sentenceCase(profile.status?"active":"removed")}
                                </Label>*/}
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                    <hr/>
                    <CardActions style={{float:'right'}}>
                        { id &&
                        <Button size="small" color={profile.status ? 'error' : 'primary'} onClick={handleChangeStatus}>
                            {sentenceCase(profile.status?"Disable":"Enable")}
                        </Button>
                        }
                        <Button size="small" component={RouterLink} to={id ? '/app/editPostman/'+id :'/app/profile/edit'} color="success">
                            {id ? 'Edit' : 'Edit my details'}
                        </Button>
                    </CardActions>
                </Card>
            </Grid>
            <Grid xs={9} item>
                <Card >
                    <CardActionArea >
                        <CardContent>

                            <Grid container spacing={3} >
                                <Grid item sm={3} md={3}>
                                    <Typography  variant="h6" component="h2" style={{fontSize:'16px'}}>
                                        Username
                                    </Typography>
                                </Grid>
                                <Grid item sm={9} md={9}>
                                    <Typography gutterBottom variant="h6" component="h2" style={{fontSize:'16px'}}>
                                        {profile && profile.username}
                                    </Typography>
                                </Grid>
                            </Grid>
                            <Grid container spacing={3}>
                                <Grid item sm={3} md={3}>
                                    <Typography gutterBottom variant="h6" component="h2" style={{fontSize:'16px'}}>
                                        Email
                                    </Typography>
                                </Grid>
                                <Grid item sm={9} md={9}>
                                    <Typography gutterBottom variant="h6" component="h2" style={{fontSize:'16px'}}>
                                        {profile && profile.email}
                                    </Typography>
                                </Grid>
                            </Grid>
                            <Grid container spacing={3}>
                                <Grid item sm={3} md={3}>
                                    <Typography gutterBottom variant="h6" component="h2" style={{fontSize:'16px'}}>
                                        Phone
                                    </Typography>
                                </Grid>
                                <Grid item sm={9} md={9}>
                                    <Typography gutterBottom variant="h6" component="h2" style={{fontSize:'16px'}}>
                                        {profile && profile.mobileNumber}
                                    </Typography>
                                </Grid>
                            </Grid>
                            { id &&
                            <Grid container spacing={3}>
                                <Grid item sm={3} md={3}>
                                    <Typography gutterBottom variant="h6" component="h2" style={{fontSize:'16px'}}>
                                        Area
                                    </Typography>
                                </Grid>
                                <Grid item sm={9} md={9}>
                                    <Typography gutterBottom variant="h6" component="h2" style={{fontSize:'16px'}}>
                                        {profile && profile.area}
                                    </Typography>
                                </Grid>
                            </Grid>
                            }
                            {/* <Typography variant="body2" color="textSecondary" component="p">
                                Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
                                across all continents except Antarctica
                            </Typography> */}
                        </CardContent>
                    </CardActionArea>
                </Card>
            </Grid>
            <Grid item  xs={6}>
                <DetailsChart 
                title="Post"
                subheader=""
                CHART_DATA = {[
                  {
                    name: 'Delivered post',
                    type: 'line',
                    // column
                    data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30]
                  },
                  {
                    name: 'Total post',
                    type: 'line',
                    // area
                    data: [53, 18, 32, 27, 58, 22, 37, 23, 45, 23, 35]
                  },
                  {
                    name: 'Cancelled post',
                    type: 'line',
                    data: [30, 7, 10, 0, 45, 0, 0, 0, 2, 1, 5]
                  }
                ]}
                labels={
                  [
                    '01/01/2003',
                    '02/01/2003',
                    '03/01/2003',
                    '04/01/2003',
                    '05/01/2003',
                    '06/01/2003',
                    '07/01/2003',
                    '08/01/2003',
                    '09/01/2003',
                    '10/01/2003',
                    '11/01/2003'
                  ]
                }
                
                />
            </Grid>
            <Grid item  xs={6}>
                <DetailsChart 
                 title="Money order"
                 subheader=""
                 CHART_DATA = {[
                   {
                     name: 'Delivered',
                     type: 'line',
                     // column
                     data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30]
                   },
                   {
                     name: 'Total',
                     type: 'line',
                     // area
                     data: [53, 18, 32, 27, 58, 22, 37, 23, 45, 23, 35]
                   },
                   {
                     name: 'Cancelled',
                     type: 'line',
                     data: [30, 7, 10, 0, 45, 0, 0, 0, 2, 1, 5]
                   }
                 ]}
                 labels={
                   [
                     '01/01/2003',
                     '02/01/2003',
                     '03/01/2003',
                     '04/01/2003',
                     '05/01/2003',
                     '06/01/2003',
                     '07/01/2003',
                     '08/01/2003',
                     '09/01/2003',
                     '10/01/2003',
                     '11/01/2003'
                   ]
                 }

                />
            </Grid>
            <Grid item  xs={6}>
                <DetailsChart 
                title="Courier"
                subheader=""
                CHART_DATA = {[
                  {
                    name: 'Delivered',
                    type: 'line',
                    // column
                    data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30]
                  },
                  {
                    name: 'Total',
                    type: 'line',
                    // area
                    data: [53, 18, 32, 27, 58, 22, 37, 23, 45, 23, 35]
                  },
                  {
                    name: 'Cancelled',
                    type: 'line',
                    data: [30, 7, 10, 0, 45, 0, 0, 0, 2, 1, 5]
                  }
                ]}
                labels={
                  [
                    '01/01/2003',
                    '02/01/2003',
                    '03/01/2003',
                    '04/01/2003',
                    '05/01/2003',
                    '06/01/2003',
                    '07/01/2003',
                    '08/01/2003',
                    '09/01/2003',
                    '10/01/2003',
                    '11/01/2003'
                  ]
                }
                
                />
            </Grid>
        </Grid>
      </Container>
    </Page>
  );
}