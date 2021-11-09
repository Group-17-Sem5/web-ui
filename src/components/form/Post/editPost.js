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
// ----------------------------------------------------------------------

export default function EditPostForm() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const postSchema = Yup.object().shape({
    senderID: Yup.string().required('Sender is required'),
    receiverID: Yup.string().required('Receiver is required'),
    // postManID: Yup.string(),
    lastAppearedBranchID: Yup.string().required('Branch is required'),
    // address: Yup.string().required('Address is required'),
    // lastName: Yup.string().required('Last Name is required').min(2,'Too short').max(50,'Too long')
    // password: Yup.string().required('Password is required')
  });
  const token = localStorage.getItem('adminToken')
  const {id} = useParams()
  const url = id ? '/clerk/post/update/'+id : '/clerk/post/add' 

  const {data:branches} = useFetch('/clerk/branch')
  const {data:users} = useFetch('/clerk/user/')
  const {data:postman} = useFetch('/postMaster/postman')

  useEditData('/clerk/post/'+id,
    data=>{
      if(data){
        
        
        setFieldValue('senderID',data.senderID)
        setFieldValue('receiverID',data.receiverID)
        setFieldValue('postManID',data.postManID)
        setFieldValue('lastAppearedBranchID',data.lastAppearedBranchID)
      }
    }
  )
  

  const formik = useFormik({
    initialValues: {
      senderID: '',
      receiverID: '',
      postManID: null,
      lastAppearedBranchID: '',
      // address:''
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
          navigate('/app/viewPost', { replace: true });
        }
        console.log(result.status)
      })
      
    }
  });

  const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps ,setFieldValue} = formik;
console.log(values)
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
            onChange={(event, value) =>setFieldValue('senderID',value._id)}
            getOptionLabel={(option) => option.name}
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
            onChange={(event, value) =>setFieldValue('receiverID',value._id)}
            getOptionLabel={(option) => option.name}
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
            onChange={(event, value) =>setFieldValue('postManID',value._id)}
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
            onChange={(event, value) =>setFieldValue('lastAppearedBranchID',value._id)}
            renderInput={(params) => <TextField {...params} label="LastAppeared Branch" variant="outlined" 
            {...getFieldProps('lastAppearedBranchID')}
            name="lastAppearedBranchID"
            error={Boolean(touched.lastAppearedBranchID && errors.lastAppearedBranchID)}
            helperText={touched.lastAppearedBranchID && errors.lastAppearedBranchID}
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
          loading={isSubmitting}
        >
          Save Details
        </LoadingButton>
        
        </Box>
      </Form>
    </FormikProvider>
  );
}
