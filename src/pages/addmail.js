import * as Yup from 'yup';
import { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useFormik, Form, FormikProvider } from 'formik';
import axios from "axios";
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

// ----------------------------------------------------------------------

export default function AddPostForm() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const postSchema = Yup.object().shape({
    sender: Yup.string().required('Sender is required'),
    receiver: Yup.string().required('Receiver is required'),
    sourceBranch: Yup.string().required('Branch is required'),
    lastAppearedBranch: Yup.string().required('Branch is required'),
    // address: Yup.string().required('Address is required'),
    // lastName: Yup.string().required('Last Name is required').min(2,'Too short').max(50,'Too long')
    // password: Yup.string().required('Password is required')
  });
  const token = localStorage.getItem('adminToken')
  const {id} = useParams()
  const url = id ? '/postMaster/post/update/'+id : '/postMaster/post/add'

  const {data:branches} = useFetch('/admin/branch')
  const {data:users} = useFetch('/postMaster/user/')
  const {data:postman} = useFetch('/postMaster/postman')

  useEditData('/clerk/post'+id,
  data=>{
    if(data){
      console.log(data)

      setFieldValue('senderID',data.senderID)
      setFieldValue('receiver',data.receiverID)
      setFieldValue('postManID',data.sourceBranchID)
      setFieldValue('lastAppearedBranch',data.lastAppearedBranchID)
    }
  }
  )
  const formik = useFormik({
    initialValues: {
      senderID: '',
      receiverID: '',
      sourceBranchID: null,
      lastAppearedBranchID: ''
      // address:''
    },
    validationSchema: postSchema,
    onSubmit: (values) => {
      fetch(process.env.REACT_APP_API_HOST + url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer'+ token},
      body: JSON.stringify(values)
  })
      .then(result =>{
        if (result.status==200){
          navigate('/dashboard/post', {replace: true})
        }
        console.log(result.status )
          return data;
      })
      .catch(err=>{
          console.log(err)
      })
        console.log(values)
        
        navigate('/dashboard/post', { replace: true });
    }
  });

  const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps ,setFieldValue} = formik;

  const handleShowPassword = () => {
    setShowPassword((show) => !show);
  };

  function handleClick(event){
    event.preventDefault();

   /*const newPost ={
      sender: values.sender,
      receiver: values.receiver,
      sourceBranch: values.sourceBranch,
      lastAppearedBranch: values.lastAppearedBranch
    }
    axios.post('http://localhost:5000/create',newPost)*/
  }

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
          
            options={top100Films}
            onChange={(event, value) =>setFieldValue('sender',value.title)}
            getOptionLabel={(option) => option.title}
            renderInput={(params) => <TextField {...params} label="Sender" variant="outlined" 
            name="sender"
            {...getFieldProps('sender')}
            error={Boolean(touched.sender && errors.sender)}
            helperText={touched.sender && errors.sender}
            value={values.sender}
            />}
            />
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
            
            <Autocomplete
             
            
            options={top100Films}
            onChange={(event, value) =>setFieldValue('receiver',value.title)}
            getOptionLabel={(option) => option.title}
            renderInput={(params) => <TextField {...params} label="Receiver" variant="outlined" 
            {...getFieldProps('receiver')}
            name="receiver"
            error={Boolean(touched.receiver && errors.receiver)}
            helperText={touched.receiver && errors.receiver}
            />}
            />
           </Grid>
           <Grid item xs={12} sm={6} md={6}>
            <Autocomplete
           
            options={top100Films}
            onChange={(event, value) =>setFieldValue('sourceBranch',value.title)}
            getOptionLabel={(option) => option.title}
            renderInput={(params) => <TextField {...params} label="Source Branch" variant="outlined" 
            {...getFieldProps('sourceBranch')}
            name="sourceBranch"
            error={Boolean(touched.sourceBranch && errors.sourceBranch)}
            helperText={touched.sourceBranch && errors.sourceBranch}
            />}
            />
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
            <Autocomplete
            
            options={top100Films}
            getOptionLabel={(option) => option.title}
            onChange={(event, value) =>setFieldValue('lastAppearedBranch',value.title)}
            renderInput={(params) => <TextField {...params} label="LastAppeared Branch" variant="outlined" 
            {...getFieldProps('lastAppearedBranch')}
            name="lastAppearedBranch"
            error={Boolean(touched.lastAppearedBranch && errors.lastAppearedBranch)}
            helperText={touched.lastAppearedBranch && errors.lastAppearedBranch}
            />}
            />
            </Grid>
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
          //onClick={handleClick}
          // loading={isSubmitting}
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