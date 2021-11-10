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
import UserDetails from './UserDetails';
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
    // console.log(profile)
    const navigate = useNavigate()
    const token = localStorage.getItem('adminToken')
    const [value,setValue] = useState('')
    const [isSubmitting,setIsSunmitting] = useState(false)
    const {data:postman} = useFetch('/postMaster/postman')
    const handleAssignPostman = () => {
        // console.log(value)
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

    const {data:senderDetails} = useFetch('/postMaster/user/'+profile.senderID)
    const {data:receiverDetails} = useFetch('/postMaster/user/'+profile.receiverID)
console.log(parseInt('3'))
    const senderPlaces =[
        { id: senderDetails.addressId, location: { lat: parseInt(senderDetails.lat), lng: parseInt(senderDetails.lng) } ,title:senderDetails.address}
      ]

    const receiverPlaces = [
        { id: receiverDetails.addressId, location: { lat: parseInt(receiverDetails.lat), lng: parseInt(receiverDetails.lng) },title:receiverDetails.address },
    ]




  return (
    <Page title="View | Easy Mail">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            {title}
          </Typography>
        </Stack>
        {updatePostmanUrl ? 
        <Grid container spacing={3} sx={{mb:3}}>
            <Grid item  xs={6}> 
            <Autocomplete
                options={postman}
                onChange={(event, value) =>setValue(value.username)}
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
        : null}

        <Grid container spacing={3}>
            <UserDetails userDetails={senderDetails} title={"Sender Details"} />
            <UserDetails userDetails={receiverDetails} title={"Receiver Details"} />
            <Grid item  xs={12} md={6}>
                Sender Location
               <MapContainer
                array= {senderPlaces}
                isAdding={false}
               />
            </Grid>
            <Grid item  xs={12} md={6}>
                Receiver Location
                <MapContainer
                array= {receiverPlaces}
                isAdding={false}
                />
            </Grid>
        </Grid>
        
        
      </Container>
    </Page>
  );
}
