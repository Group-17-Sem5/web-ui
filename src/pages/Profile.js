import { Icon } from '@iconify/react';
import plusFill from '@iconify/icons-eva/plus-fill';
import LineChart from 'src/components/dashboard/LineChart';
import PieChart from 'src/components/dashboard/PieChart';
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
    const postmanID = id ? profile.username : ''
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

    const ChartData = [
      {
        name: 'Delivered',
        type: 'line',
        // column
        data: []
      },
      {
        name: 'Total',
        type: 'line',
        // area
        data: []
      },
      {
        name: 'Cancelled',
        type: 'line',
        data: []
      }
    ]
    const ChartDataPost = [
      {
        name: 'Delivered',
        type: 'line',
        // column
        data: []
      },
      {
        name: 'Total',
        type: 'line',
        // area
        data: []
      },
      {
        name: 'Cancelled',
        type: 'line',
        data: []
      }
    ]
    
    const Labels = []
    const LabelsPost = []
    
  
    const {data:courierCount} = useFetch('/postMaster/courier/count/'+postmanID)
    const {data:postCount} = useFetch('/postMaster/post/count/'+postmanID)
    
  
    courierCount.map((count,i)=>{
      ChartData[0].data.push(count.deliveredcount)
      ChartData[1].data.push(count.totalcount)
      ChartData[2].data.push(count.cancelledcount)
      Labels.push(count.date)
    })
  
    postCount.map((count,i)=>{
      ChartDataPost[0].data.push(count.deliveredcount)
      ChartDataPost[1].data.push(count.totalcount)
      ChartDataPost[2].data.push(count.cancelledcount)
      LabelsPost.push(count.date)
    })
    
    


  return (
    <Page title="Profile | Easy Mail">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Profile
          </Typography>
        </Stack>

        <Grid container spacing={3}>
            <Grid  md={3} xs={12} item>
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
                            {console.log(profile)}
                            { profile.status !=="undefined" &&
                            <Typography variant="body2" color="textSecondary" component="p">
                                <Label
                                variant="ghost"
                                color={!profile.status ? 'error' : 'success'}
                                style={{padding:'15px',display:'flex',width:'50%',marginLeft:'25%'}}
                                >
                                {sentenceCase(profile.status?"active":"removed")}
                                </Label>
                            </Typography>
                            }
                        </CardContent>
                    </CardActionArea>
                    <hr/>
                    <CardActions style={{float:'right'}}>
                        { (id && profile.status !=="undefined") &&
                        <Button size="small" color={ profile.status ? 'error' : 'primary'} onClick={handleChangeStatus}>
                            {sentenceCase(profile.status?"Disable":"Enable")}
                        </Button>
                        }
                        <Button size="small" component={RouterLink} to={id ? '/app/editPostman/'+id :'/app/profile/edit'} color="success">
                            {id ? 'Edit' : 'Edit my details'}
                        </Button>
                    </CardActions>
                </Card>
            </Grid>
            <Grid xs={12} md={9} item>
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
            { 
            postmanID ?
            <>
            <Grid item xs={12} md={6}>
            <LineChart 
            title="Post"
            url={'/postMaster/post/filter/'+postmanID}
            subheader=""
            CHART_DATA = {ChartDataPost}
            labels={LabelsPost}
            
            />
          </Grid>

          {/* <Grid item xs={12} md={6} lg={4}>
            <PieChart 
            title="Post total view"
            CHART_DATA={
              ChartPieDataPost
            }
            labels={
              ['Delivered post', 'Assigned', 'Cancelled post']
            }
            />
          </Grid> */}
            
          <Grid item xs={12} md={6}>
            <LineChart 
            title="Courier"
            url={'/postMaster/courier/filter/'+postmanID}
            subheader=""
            CHART_DATA = {ChartData}
            labels={Labels}
            
            
            />
          </Grid>

          {/* <Grid item xs={12} md={6} lg={4}>
            <PieChart 
            title="Courier total view"
            CHART_DATA={
              ChartPieDataCourier
            }
            labels={
              ['Delivered', 'Assigned', 'Cancelled']
            }
            />
          </Grid> */}

          {/* <Grid item xs={12} md={6}>
            <LineChart 
            title="Money order"
            url={'/postMaster/moneyorder/filter/'+postmanID}
            subheader=""
            CHART_DATA = {ChartDataMoneyorder}
            labels={LabelsMoneyorder}
            
            />
          </Grid> */}
          </>
        :null  
        }

          {/* <Grid item xs={12} md={6} lg={4}>
            <PieChart 
            title="Money order total view"
            CHART_DATA={
              ChartPieDataMoneyorder
            }
            labels={
              ['Delivered', 'Assigned', 'Cancelled']
            }
            />
          </Grid> */}
        </Grid>
      </Container>
    </Page>
  );
}
