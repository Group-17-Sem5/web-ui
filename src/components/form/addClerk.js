import * as Yup from 'yup';
import { useState } from 'react';
import { Link as RouterLink, useNavigate, useParams } from 'react-router-dom';
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
  Box,
  MenuItem,
  Grid
} from '@material-ui/core';
import { LoadingButton } from '@material-ui/lab';

import useEditData from 'src/hooks/useEditData'
// ----------------------------------------------------------------------

export default function AddPostmanForm() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
  const clerkSchema = Yup.object().shape({
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    mobileNumber: Yup.string().required('Mobile number is required').matches(phoneRegExp, 'Mobile number is not valid'),
    username: Yup.string().required('First Name is required').min(2,'Too short').max(50,'Too long'),
    // firstName: Yup.string().required('First Name is required').min(2,'Too short').max(50,'Too long'),
    // lastName: Yup.string().required('Last Name is required').min(2,'Too short').max(50,'Too long')
    // password: Yup.string().required('Password is required')
  });

  const token = localStorage.getItem('adminToken')
  const {id} = useParams()
  const url = id ? '/postMaster/clerk/update/'+id : '/postMaster/clerk/add' 

  useEditData('/postMaster/clerk/'+id,
    data=>{
      if(data){
        setFieldValue('email',data.email)
        setFieldValue('mobileNumber',data.mobileNumber)
        setFieldValue('username',data.username)
      }
    }
  )


  const formik = useFormik({
    initialValues: {
      //id:'',
      username: '',
      mobileNumber: '',
      email:''
    },
    validationSchema: clerkSchema,
    onSubmit: (values) => {
      fetch(process.env.REACT_APP_API_HOST+url,{
        method: 'POST',
        headers: { 'Content-Type': 'application/json', "Authorization": "Bearer " + token},
        body: JSON.stringify( values)
        // headers: { 'Content-Type': 'application/json', "Authorization": "Bearer " + token },
      })
      .then(result=>{
        if(result.status===200){
          navigate('/app/clerk', { replace: true });
        }
        console.log(result.status)
      })
    }
  });

  const { errors, touched, isSubmitting, handleSubmit, getFieldProps,setFieldValue } = formik;

  const handleShowPassword = () => {
    setShowPassword((show) => !show);
  };
  

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="on"  onSubmit={handleSubmit}>
      <Box 
      sx={{
        '& > :not(style)': {mb:3},boxShadow: 3 ,p:5
      }}
      >
          
          <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={6}>
          <TextField
            fullWidth
            type="text"
            label="Username"
            {...getFieldProps('username')}
            error={Boolean(touched.username && errors.username)}
            helperText={touched.username && errors.username}
          />
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
          <TextField
            fullWidth
            // autoComplete="username"
            type="email"
            label="Email address"
            {...getFieldProps('email')}
            error={Boolean(touched.email && errors.email)}
            helperText={touched.email && errors.email}
          />
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
          <TextField
            fullWidth
            type="number"
            label="Phone Number"
            {...getFieldProps('mobileNumber')}
            error={Boolean(touched.mobileNumber && errors.mobileNumber)}
            helperText={touched.mobileNumber && errors.mobileNumber}
          />
          </Grid>
          </Grid>
        

<LoadingButton
          fullWidth
          style={{width:'100%'}}
          size="large"
          type="submit"
          variant="contained"
          loading={isSubmitting}
        >
          Save Details
        </LoadingButton></Box>
      </Form>
    </FormikProvider>
  );
}
