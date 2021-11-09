import * as Yup from 'yup';
import { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useFormik, Form, FormikProvider } from 'formik';
import { Icon } from '@iconify/react';
import eyeFill from '@iconify/icons-eva/eye-fill';
import eyeOffFill from '@iconify/icons-eva/eye-off-fill';
// material
import {
  Link,
  Stack,
  Checkbox,
  TextField,
  IconButton,
  InputAdornment,
  FormControlLabel,
  Card,
  CardContent,
  MenuItem,
  Autocomplete,
  TableRow,
  TableCell,
  Grid
} from '@material-ui/core';
import { LoadingButton } from '@material-ui/lab';
import { Box, width } from '@material-ui/system';
import useFetch from 'src/hooks/useFetch'
import { useParams } from 'react-router';
import useEditData from 'src/hooks/useEditData'
import { useDetail } from 'src/context/DetailContext';
// ----------------------------------------------------------------------

export default function AddPostmanForm() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const postSchema = Yup.object().shape({
    senderID: Yup.string().required('Sender is required'),
    receiverID: Yup.string().required('Receiver is required'),
    postManID: Yup.string(),
    sourceBranchID: Yup.string().required('Branch is required'),
    lastAppearedBranchID: Yup.string().required('Branch is required'),
    receivingBranchID: Yup.string().required('Branch is required'),
    addressID: Yup.string().required('Address is required'),
    // isAssigned: Yup.string().required('Enter true or false'),
    // isCancelled: Yup.string().required('Enter true or false'),
    // isDelivered: Yup.string().required('Enter true or false'),
    // lastName: Yup.string().required('Last Name is required').min(2,'Too short').max(50,'Too long')
    // password: Yup.string().required('Password is required')
  });
  const token = localStorage.getItem('adminToken')
  const {id} = useParams()
  const url = id ? '/clerk/post/update/'+id : '/clerk/post/add' 

  const {data:branches} = useFetch('/admin/branch')
  const {data:users} = useFetch('/clerk/user/')
  const {data:postman} = useFetch('/clerk/postman')
  const {data: address} = useFetch('/clerk/address')
  
  useEditData('/clerk/post/'+id,
    data=>{
      if(data){
        
        setFieldValue('senderID',data.senderID)
        setFieldValue('receiverID',data.receiverID)
        setFieldValue('postManID',data.postManID)
        setFieldValue('lastAppearedBranchID',data.lastAppearedBranchID)
        setFieldValue('sourceBranchID',data.sourceBranchID)
        setFieldValue('receivingBranchID',data.receivingBranchID)
        setFieldValue('addressID',data.addressID)
        // setFieldValue('isCancelled',data.isCancelled)
        // setFieldValue('isDelivered',data.isDelivered)
        // setFieldValue('isAssigned',data.isAssigned)
      }
    }
  )
  

  const formik = useFormik({
    initialValues: {
      senderID: '',
      receiverID: '',
      addressID:'',
      postManID: '',
      lastAppearedBranchID: '',
      sourceBranchID: '',
      receivingBranchID: ''
      // isCancelled:'',
      // isDelivered:'',
      // isAssigned:'',
      
    },
    validationSchema: postSchema,
    onSubmit: (values) => {
      fetch(process.env.REACT_APP_API_HOST+url,{
        method: 'POST',
        headers: { 'Content-Type': 'application/json', "Authorization": "Bearer " + token},
        body: JSON.stringify( values)
        // headers: { 'Content-Type': 'application/json', "Authorization": "Bearer " + token },
      })
      .then(result=>{
        if(result.status===200){
          navigate('/dashboard/post', { replace: true });
        }
        console.log(result.status)
      })
      
    }
  });

  const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps ,setFieldValue} = formik;

  const handleShowPassword = () => {
    setShowPassword((show) => !show);
  };

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="on"  onSubmit={handleSubmit}>
      <Box 
      sx={{
        '& > :not(style)': { mb:3 },boxShadow: 3 ,p:5
      }}
      >
          
          <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={6}>
          <Autocomplete
          
            options={users}
            onChange={(event, value) =>setFieldValue('senderID',value.userName)}
            getOptionLabel={(option) => option.userName}
            renderInput={(params) => <TextField {...params} label="Sender" variant="outlined" 
            name="senderID"
            {...getFieldProps('senderID')}
            error={Boolean(touched.senderID && errors.senderID)}
            helperText={touched.senderID && errors.senderID}
            value={values.senderID}
            />}
            />
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
            
            <Autocomplete
            options={users}
            onChange={(event, value) =>setFieldValue('receiverID',value.userName)}
            getOptionLabel={(option) => option.userName}
            renderInput={(params) => <TextField {...params} label="Receiver" variant="outlined" 
            {...getFieldProps('receiverID')}
            name="receiverID"
            error={Boolean(touched.receiverID && errors.receiverID)}
            helperText={touched.receiverID && errors.receiverID}
            />}
            />
           </Grid>
           <Grid item xs={12} sm={6} md={6}>
            <Autocomplete
           
            options={postman}
            onChange={(event, value) =>setFieldValue('postManID',value.username)}
            getOptionLabel={(option) => option.username}
            renderInput={(params) => <TextField {...params} label="Postman" variant="outlined" 
            {...getFieldProps('postManID')}
            name="postManID"
            error={Boolean(touched.postManID && errors.postManID)}
            helperText={touched.postManID && errors.postManID}
            />}
            />
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
            <Autocomplete
            
            options={branches}
            getOptionLabel={(option) => option.branchName}
            onChange={(event, value) =>setFieldValue('lastAppearedBranchID',value.branchID)}
            renderInput={(params) => <TextField {...params} label="LastAppeared Branch" variant="outlined" 
            {...getFieldProps('lastAppearedBranchID')}
            name="lastAppearedBranchID"
            error={Boolean(touched.lastAppearedBranchID && errors.lastAppearedBranchID)}
            helperText={touched.lastAppearedBranchID && errors.lastAppearedBranchID}
            />}
            />
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
            <Autocomplete
            
            options={branches}
            getOptionLabel={(option) => option.branchName}
            onChange={(event, value) =>setFieldValue('sourceBranchID',value.branchID)}
            renderInput={(params) => <TextField {...params} label="Source Branch" variant="outlined" 
            {...getFieldProps('sourceBranchID')}
            name="sourceBranchID"
            error={Boolean(touched.sourceBranchID && errors.sourceBranchID)}
            helperText={touched.sourceBranchID && errors.sourceBranchID}
            />}
            />
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
            <Autocomplete
            
            options={branches}
            getOptionLabel={(option) => option.branchName}
            onChange={(event, value) =>setFieldValue('receivingBranchID',value.branchID)}
            renderInput={(params) => <TextField {...params} label="Receiving Branch" variant="outlined" 
            {...getFieldProps('receivingBranchID')}
            name="receivingBranchID"
            error={Boolean(touched.receivingBranchID && errors.receivingBranchID)}
            helperText={touched.receivingBranchID && errors.receivingBranchID}
            />}
            />
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
            <Autocomplete
            options={address}
            getOptionLabel={(option) => option.addressID}
            onChange={(event, value) =>setFieldValue('addressID',value.addressID)}
            //getOptionLabel={(option) => option.description}
            renderInput={(params) => <TextField {...params} label="Address (Only not receiver)" variant="outlined" 
            {...getFieldProps('addressID')}
            name="addressID"
            error={Boolean(touched.addressID && errors.addressID)}
            helperText={touched.addressID && errors.addressID}
            />}
            />
              </Grid>
           {/*<Grid item xs={12} sm={6} md={6}>
            <TextField
            fullWidth
            // autoComplete="username"
            type="isCancelled"
            label="isCancelled"
            {...getFieldProps('isCancelled')}
            error={Boolean(touched.isCancelled && errors.isCancelled)}
            helperText={touched.isCancelled && errors.isCancelled || 'true or false'}
          />
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
            <TextField
            fullWidth
            // autoComplete="username"
            type="isDelivered"
            label="isDelivered"
            {...getFieldProps('isDelivered')}
            error={Boolean(touched.isDelivered && errors.isDelivered)}
            helperText={touched.isDelivered && errors.isDelivered || 'true or false'}
          />
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
            <TextField
            fullWidth
            // autoComplete="username"
            type="isAssigned"
            label="isAssigned"
            {...getFieldProps('isAssigned')}
            error={Boolean(touched.isAssigned && errors.isAssigned)}
            helperText={touched.isAssigned && errors.isAssigned || 'true or false'}
          />
    </Grid>*/}
            </Grid>
            {/* <Autocomplete
            options={top100Films}
            onChange={(event, value) =>setFieldValue('address',value.title)}
            getOptionLabel={(option) => option.title}
            renderInput={(params) => <TextField {...params} label="Address" variant="outlined" 
            name="address"
            error={Boolean(touched.address && errors.address)}
            helperText={touched.address && errors.address}
            />}
            /> */}
     
        
     
        <LoadingButton
          fullWidth
          style={{width:'100%'}}
          size="large"
          type="submit"
          variant="contained"
          loading={isSubmitting}
        >
          Save Details
        </LoadingButton>
        
        </Box>
      </Form>
    </FormikProvider>
  );
}


const top100Films = [
    { title: 'The Shawshank Redemption', year: 1994 },
    { title: 'The Godfather', year: 1972 },
    { title: 'The Godfather: Part II', year: 1974 },
    { title: 'The Dark Knight', year: 2008 },
    { title: '12 Angry Men', year: 1957 },
    { title: "Schindler's List", year: 1993 },
    { title: 'Pulp Fiction', year: 1994 },
    { title: 'The Lord of the Rings: The Return of the King', year: 2003 },
    { title: 'The Good, the Bad and the Ugly', year: 1966 },
    { title: 'Fight Club', year: 1999 },
    { title: 'The Lord of the Rings: The Fellowship of the Ring', year: 2001 },
    { title: 'Star Wars: Episode V - The Empire Strikes Back', year: 1980 },
    { title: 'Forrest Gump', year: 1994 },
    { title: 'Inception', year: 2010 },
    { title: 'The Lord of the Rings: The Two Towers', year: 2002 },
    { title: "One Flew Over the Cuckoo's Nest", year: 1975 },
    { title: 'Goodfellas', year: 1990 },
    { title: 'The Matrix', year: 1999 },
    { title: 'Seven Samurai', year: 1954 },
    { title: 'Star Wars: Episode IV - A New Hope', year: 1977 },
    { title: 'City of God', year: 2002 },
    { title: 'Se7en', year: 1995 },
    { title: 'The Silence of the Lambs', year: 1991 },
    { title: "It's a Wonderful Life", year: 1946 },
    { title: 'Life Is Beautiful', year: 1997 },
    { title: 'The Usual Suspects', year: 1995 },
    { title: 'Léon: The Professional', year: 1994 },
    { title: 'Spirited Away', year: 2001 },
    { title: 'Saving Private Ryan', year: 1998 },
    { title: 'Once Upon a Time in the West', year: 1968 },
    { title: 'American History X', year: 1998 },
    { title: 'Interstellar', year: 2014 },
    { title: 'Casablanca', year: 1942 },
    { title: 'City Lights', year: 1931 },
    { title: 'Psycho', year: 1960 },
    { title: 'The Green Mile', year: 1999 },
    { title: 'The Intouchables', year: 2011 },
    { title: 'Modern Times', year: 1936 },
    { title: 'Raiders of the Lost Ark', year: 1981 },
    { title: 'Rear Window', year: 1954 },
    { title: 'The Pianist', year: 2002 },
    { title: 'The Departed', year: 2006 },
    { title: 'Terminator 2: Judgment Day', year: 1991 },
    { title: 'Back to the Future', year: 1985 },
    { title: 'Whiplash', year: 2014 },
    { title: 'Gladiator', year: 2000 },
    { title: 'Memento', year: 2000 },
    { title: 'The Prestige', year: 2006 },
    { title: 'The Lion King', year: 1994 },
    { title: 'Apocalypse Now', year: 1979 },
    { title: 'Alien', year: 1979 },
    { title: 'Sunset Boulevard', year: 1950 },
    { title: 'Dr. Strangelove or: How I Learned to Stop Worrying and Love the Bomb', year: 1964 },
    { title: 'The Great Dictator', year: 1940 },
    { title: 'Cinema Paradiso', year: 1988 },
    { title: 'The Lives of Others', year: 2006 },
    { title: 'Grave of the Fireflies', year: 1988 },
    { title: 'Paths of Glory', year: 1957 },
    { title: 'Django Unchained', year: 2012 },
    { title: 'The Shining', year: 1980 },
    { title: 'WALL·E', year: 2008 },
    { title: 'American Beauty', year: 1999 },
    { title: 'The Dark Knight Rises', year: 2012 },
    { title: 'Princess Mononoke', year: 1997 },
    { title: 'Aliens', year: 1986 },
    { title: 'Oldboy', year: 2003 },
    { title: 'Once Upon a Time in America', year: 1984 },
    { title: 'Witness for the Prosecution', year: 1957 },
    { title: 'Das Boot', year: 1981 },
    { title: 'Citizen Kane', year: 1941 },
    { title: 'North by Northwest', year: 1959 },
    { title: 'Vertigo', year: 1958 },
    { title: 'Star Wars: Episode VI - Return of the Jedi', year: 1983 },
    { title: 'Reservoir Dogs', year: 1992 },
    { title: 'Braveheart', year: 1995 },
    { title: 'M', year: 1931 },
    { title: 'Requiem for a Dream', year: 2000 },
    { title: 'Amélie', year: 2001 },
    { title: 'A Clockwork Orange', year: 1971 },
    { title: 'Like Stars on Earth', year: 2007 },
    { title: 'Taxi Driver', year: 1976 },
    { title: 'Lawrence of Arabia', year: 1962 },
    { title: 'Double Indemnity', year: 1944 },
    { title: 'Eternal Sunshine of the Spotless Mind', year: 2004 },
    { title: 'Amadeus', year: 1984 },
    { title: 'To Kill a Mockingbird', year: 1962 },
    { title: 'Toy Story 3', year: 2010 },
    { title: 'Logan', year: 2017 },
    { title: 'Full Metal Jacket', year: 1987 },
    { title: 'Dangal', year: 2016 },
    { title: 'The Sting', year: 1973 },
    { title: '2001: A Space Odyssey', year: 1968 },
    { title: "Singin' in the Rain", year: 1952 },
    { title: 'Toy Story', year: 1995 },
    { title: 'Bicycle Thieves', year: 1948 },
    { title: 'The Kid', year: 1921 },
    { title: 'Inglourious Basterds', year: 2009 },
    { title: 'Snatch', year: 2000 },
    { title: '3 Idiots', year: 2009 },
    { title: 'Monty Python and the Holy Grail', year: 1975 },
  ];