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
    Autocomplete,
    TextField,
 } from '@material-ui/core';
// components
import Page from '../Page';
import { sentenceCase } from 'change-case';
import DetailsChart from '../../detailsCharts/DetailsChart'
import useFetch from 'src/hooks/useFetch';
import { useNavigate, useParams } from 'react-router';
import Label from 'src/components/Label'
import { useDetail } from 'src/context/DetailContext';
import { useState } from 'react';
import { LoadingButton } from '@material-ui/lab';
import MapContainer from 'src/components/Map';

// ----------------------------------------------------------------------

const SORT_OPTIONS = [
  { value: 'latest', label: 'Latest' },
  { value: 'popular', label: 'Popular' },
  { value: 'oldest', label: 'Oldest' }
];

// ----------------------------------------------------------------------

export default function View({title,url,updatePostmanUrl,navigateUrl}) {
    const {id} = useParams()
    const {user} = useDetail()
    const {data:profile} = useFetch(url+id)
    console.log(profile)
    const navigate = useNavigate()
    const token = localStorage.getItem('adminToken')
    const [value,setValue] = useState('')
    const [isSubmitting,setIsSunmitting] = useState(false)
    const {data:postman} = useFetch('/postMaster/postman')
    const handleAssignPostman = () => {
        console.log(value)
        fetch(process.env.REACT_APP_API_HOST+updatePostmanUrl+id,{
            method: 'POST',
            headers: { 'Content-Type': 'application/json', "Authorization": "Bearer " + token},
            body: JSON.stringify( {postManID:value} )
            // headers: { 'Content-Type': 'application/json', "Authorization": "Bearer " + token },
          })
          .then(result=>{
            if(result.status===200){
              navigate(navigateUrl, { replace: true });
            }
            console.log(result.status)
          })
    }

    const places =[
        { id: "place1", location: { lat: 39.09366509575983, lng: -94.58751660204751 } ,title:'Place1'},
        { id: "place2", location: { lat: 39.10894664788252, lng: -94.57926449532226 },title:'Place2' },
        { id: "place3", location: { lat: 39.07602397235644, lng: -94.5184089401211 } ,title:'Place3'}
      ]




  return (
    <Page title="View | Easy Mail">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            {title}
          </Typography>
        </Stack>
        <Grid container spacing={3} sx={{mb:3}}>
        <Grid item  xs={6}>
            <Autocomplete
                options={postman}
                onChange={(event, value) =>setValue(value._id)}
                getOptionLabel={(option) => option.username}
                renderInput={(params) => <TextField {...params} label="Postman" variant="outlined" 
                name="postman"
                // {...getFieldProps('senderID')}
                // error={Boolean(touched.senderID && errors.senderID)}
                // helperText={touched.senderID && errors.senderID}
                value={value}
                />}
             />
            
            </Grid>
            <Grid item  xs={6}>
                <LoadingButton
                    fullWidth
                    style={{width:'100%'}}
                    size="large"
                    type="submit"
                    variant="contained"
                    loading={isSubmitting}
                    onClick={handleAssignPostman}
                >
                   Assign postman
                </LoadingButton>
            </Grid>
           
        </Grid>

        <Grid container spacing={3}>
            <Grid  xs={6} item>
                <Card >
                    <CardActionArea >
                        
                        <CardContent>
                        <h2>Sender Details</h2><br/>
                            <Grid container spacing={3} >
                                <Grid item sm={4} >
                                    <Typography  variant="h6" component="h2" style={{fontSize:'16px'}}>
                                        Name
                                    </Typography>
                                </Grid>
                                <Grid item sm={8} >
                                    <Typography gutterBottom variant="h6" component="h2" style={{fontSize:'16px'}}>
                                        {profile && profile.senderName}
                                    </Typography>
                                </Grid>
                                <Grid item sm={4} >
                                    <Typography  variant="h6" component="h2" style={{fontSize:'16px'}}>
                                        Mobile Number
                                    </Typography>
                                </Grid>
                                <Grid item sm={8} >
                                    <Typography gutterBottom variant="h6" component="h2" style={{fontSize:'16px'}}>
                                        {profile && profile.senderPhone}
                                    </Typography>
                                </Grid>
                                <Grid item sm={4} >
                                    <Typography  variant="h6" component="h2" style={{fontSize:'16px'}}>
                                        Address
                                    </Typography>
                                </Grid>
                                <Grid item sm={8} >
                                    <Typography gutterBottom variant="h6" component="h2" style={{fontSize:'16px'}}>
                                        {profile && profile.senderAddress || 'colombo'}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </CardActionArea>
                   
                </Card>
            </Grid>
            <Grid xs={6} item>
                <Card >
                    <CardActionArea >
                    <CardContent>
                        <h2>Receiver Details</h2><br/>
                            <Grid container spacing={3} >
                                <Grid item sm={4} >
                                    <Typography  variant="h6" component="h2" style={{fontSize:'16px'}}>
                                        Name
                                    </Typography>
                                </Grid>
                                <Grid item sm={8} >
                                    <Typography gutterBottom variant="h6" component="h2" style={{fontSize:'16px'}}>
                                        {profile && profile.receiverName}
                                    </Typography>
                                </Grid>
                                <Grid item sm={4} >
                                    <Typography  variant="h6" component="h2" style={{fontSize:'16px'}}>
                                        Mobile Number
                                    </Typography>
                                </Grid>
                                <Grid item sm={8} >
                                    <Typography gutterBottom variant="h6" component="h2" style={{fontSize:'16px'}}>
                                        {profile && profile.receiverPhone}
                                    </Typography>
                                </Grid>
                                <Grid item sm={4} >
                                    <Typography  variant="h6" component="h2" style={{fontSize:'16px'}}>
                                        Address
                                    </Typography>
                                </Grid>
                                <Grid item sm={8} >
                                    <Typography gutterBottom variant="h6" component="h2" style={{fontSize:'16px'}}>
                                        {profile && profile.receiverAddress || 'jaffna'}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </CardActionArea>
                </Card>
            </Grid>
            <Grid item  xs={6}>
               <MapContainer
                array= {places}
               />
            </Grid>
            <Grid item  xs={6}>
                <MapContainer/>
            </Grid>
        </Grid>
        
        
      </Container>
    </Page>
  );
}
