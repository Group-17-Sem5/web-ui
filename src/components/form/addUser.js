import * as Yup from 'yup';
import { useEffect, useState } from 'react';
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
  Grid
} from '@material-ui/core';
import { LoadingButton } from '@material-ui/lab';
import { Box } from '@material-ui/system';
import { options } from 'numeral';
import { result } from 'lodash';
import useEditData from 'src/hooks/useEditData';
import { useParams } from 'react-router';
import { id } from 'date-fns/locale';


// ----------------------------------------------------------------------

export default function AddUserForm() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [val,setVal] = useState()
  const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
  const postmanSchema = Yup.object().shape({
    email: Yup.string().email('Email must be a valid email address'),
    mobileNumber: Yup.string().required('Mobile number is required').matches(phoneRegExp, 'Mobile number is not valid'),
    // branch: Yup.string().required('Branch name is required'),
    address: Yup.string().required('address is required'),
    name: Yup.string().required('First Name is required').min(2,'Too short').max(50,'Too long'),
    // lastName: Yup.string().required('Last Name is required').min(2,'Too short').max(50,'Too long')
    // password: Yup.string().required('Password is required')
  });
  const token = localStorage.getItem('adminToken')
  const {id} = useParams()
  const url = id ? '/postMaster/user/update/'+id : '/postMaster/user/add' 

  useEditData('/postMaster/user/'+id,
    data=>{
      if(data){
        setVal(data)
        setFieldValue('email',data.email)
        setFieldValue('mobileNumber',data.mobileNumber)
        setFieldValue('address',data.address)
        setFieldValue('name',data.name)
      }
    }
  )


  const formik = useFormik({
    initialValues:{
      email: '',
      mobileNumber: '',
      name: '',
      address:'',
    },
    validationSchema: postmanSchema,
    onSubmit: (values) => {
      
      fetch(process.env.REACT_APP_API_HOST+url,{
        method: 'POST',
        headers: { 'Content-Type': 'application/json', "Authorization": "Bearer " + token},
        body: JSON.stringify( values)
        // headers: { 'Content-Type': 'application/json', "Authorization": "Bearer " + token },
      })
      .then(result=>{
        if(result.status===200){
          navigate('/app/users', { replace: true });
        }
        console.log(result.status)
      })
     
    }
  });

  const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps, setFieldValue} = formik;

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
            label="name"
            {...getFieldProps('name')}
            error={Boolean(touched.name && errors.name)}
            helperText={touched.name && errors.name}
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
          <Grid item xs={12} sm={6} md={6}>
          {/* <TextField
          // component="span"
          //   style={{display:'inline'}}
          fullWidth
            select
            label="Branch Name"
            {...getFieldProps('branch')}
            error={Boolean(touched.branch && errors.branch)}
            helperText={touched.branch && errors.branch}
          >
            <MenuItem value="colombo">Colombo</MenuItem>
            <MenuItem value="Jaffna">Jaffna</MenuItem>
          </TextField> */}
          
          <TextField
          fullWidth
          // component="span"
          //   style={{display:'inline'}}
            type="address"
            label="address"
            {...getFieldProps('address')}
            error={Boolean(touched.address && errors.address)}
            helperText={touched.address && errors.address}
          />
            </Grid>
        </Grid>
      
         
        
          {/* <TextField
            fullWidth
            type="text"
            label="Last Name"
            {...getFieldProps('lastName')}
            error={Boolean(touched.lastName && errors.lastName)}
            helperText={touched.lastName && errors.lastName}
          /> */}
          
         
          
          
          
          

  
          {/* <TextField
            fullWidth
            autoComplete="current-password"
            type={showPassword ? 'text' : 'password'}
            label="Password"
            {...getFieldProps('password')}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleShowPassword} edge="end">
                    <Icon icon={showPassword ? eyeFill : eyeOffFill} />
                  </IconButton>
                </InputAdornment>
              )
            }}
            error={Boolean(touched.password && errors.password)}
            helperText={touched.password && errors.password}
          /> */}
       

        {/* <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
          <FormControlLabel
            control={<Checkbox {...getFieldProps('remember')} checked={values.remember} />}
            label="Remember me"
          />

          <Link component={RouterLink} variant="subtitle2" to="#">
            Forgot password?
          </Link>
        </Stack> */}
  
        
        

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
